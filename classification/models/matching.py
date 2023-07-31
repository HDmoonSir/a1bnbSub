import sys
sys.path.append('models')
from LightGlue.lightglue import LightGlue, SuperPoint
from LightGlue.lightglue.utils import load_web_image, rbd
import torch
import cv2
import numpy as np
import itertools

def group_connected_nodes(connections):
    # 노드와 연결된 노드들을 저장할 딕셔너리 생성
    graph = {}
    for node_pair in connections:
        node1, node2 = node_pair
        if node1 not in graph:
            graph[node1] = []
        if node2 not in graph:
            graph[node2] = []
        graph[node1].append(node2)
        graph[node2].append(node1)

    # 연결된 노드들을 순차적으로 한 줄로 묶어주는 함수
    def dfs(node, visited, result):
        visited[node] = True
        result.append(node)
        for neighbor in graph[node]:
            if not visited[neighbor]:
                dfs(neighbor, visited, result)

    # 결과 리스트 초기화
    grouped_nodes = []
    # 방문 여부를 저장할 딕셔너리 생성
    visited = {node: False for node in graph}

    for node in graph:
        if not visited[node]:
            result = []
            dfs(node, visited, result)
            grouped_nodes.append(result)

    return grouped_nodes

def label_rooms(filename_image_pairs, room_type, label_dict):
    filenames = [filename_image_pair[0] for filename_image_pair in filename_image_pairs]
    images = [filename_image_pair[1] for filename_image_pair in filename_image_pairs]
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu') 
    extractor = SuperPoint(max_num_keypoints=1024).eval().to(device)  # load the extractor
    matcher = LightGlue(features='superpoint').eval().to(device)

    k = 30
    threshold = 30
    def calculate_distance(image0, image1, top_k = k):
        image0 = load_web_image(image0)
        image1 = load_web_image(image1)

        feats0 = extractor.extract(image0.to(device))
        feats1 = extractor.extract(image1.to(device))
        matches01 = matcher({'image0': feats0, 'image1': feats1})

        feats0, feats1, matches01 = [rbd(x) for x in [feats0, feats1, matches01]]  # remove batch dimension

        kpts0, kpts1, matches = feats0['keypoints'], feats1['keypoints'], matches01['matches']

        if len(matches) < 50: 
            return 100, 0 
        m_kpts0, m_kpts1 = kpts0[matches[..., 0]], kpts1[matches[..., 1]]

        scores = matches01['scores']
        top_k = min(top_k, len(scores))
        top_k = torch.topk(scores, top_k).indices
        m_kpts0_top_k, m_kpts1_top_k = m_kpts0[top_k], m_kpts1[top_k]

        H, _ = cv2.findHomography(m_kpts0_top_k.numpy(), m_kpts1_top_k.numpy(), cv2.USAC_MAGSAC)

        correct = 0
        projected_m_kpts1 = []
        projection_errors = []
        for i in range(len(matches)):
            projected_m_kpts0 = H @ np.append(m_kpts0[i].numpy(), 1)
            projected_m_kpts0 /= projected_m_kpts0[2]
            projected_m_kpts0 = projected_m_kpts0[:2]
            projected_m_kpts1.append(projected_m_kpts0)
            projection_error = np.linalg.norm(projected_m_kpts0 - m_kpts1[i].numpy())
            projection_errors.append(projection_error)
            if projection_error < 30:
                correct += 1

        median_error = round(np.median(np.array(projection_errors)), 2)
        precision = round(correct / len(matches), 2)

        return median_error, precision

    pair_distance_dict = {}
        
    image_pairs = list(itertools.combinations(range(len(images)), 2))
    
    for image_pair in image_pairs:
        median_error, precision = calculate_distance(images[image_pair[0]], images[image_pair[1]], k)
        pair_distance_dict[image_pair] = {"median_error": median_error,
                                          "precision" : precision}
        
    connections = []
    for image_pair in image_pairs:
        if pair_distance_dict[image_pair]["median_error"] < threshold:
            connections.append(image_pair)

    result = group_connected_nodes(connections)
    matched_images = sum(result, [])

    current_result_num = 0
    not_matched_count = 0
    current_connection_number = 0
    in_connection = False

    for i in range(len(images)):
        if i in matched_images:
            if not in_connection:
                current_connection_number += (not_matched_count + 1)
                in_connection = True
                next_count = 1
            else:
                next_count += 1
                if len(result[current_result_num]) == next_count:
                    not_matched_count = 0
                    in_connection = False
                    current_result_num += 1
            label_dict[filenames[i]] = f'{room_type} {current_connection_number}'         
            
        else:
            if in_connection:
                not_matched_count += 1
            else:
                current_connection_number += 1

            label_dict[filenames[i]] = f'{room_type} {current_connection_number + not_matched_count}'

    return label_dict

