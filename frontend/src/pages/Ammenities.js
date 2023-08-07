import Button from 'react-bootstrap/Button';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation } from "react-router-dom";

import { back_ip_port } from './back_ip_port'

const serverUrl = `${back_ip_port}user/regist/result`;

const othersImageView = (roomInfo) => {
    // list로 만들어서 출력한다? ㄴㄴ
    // 리빙룸1
    // 사진 사이즈로 열거 (브라우저 넓이 / 사진갯수로 줄여서)
    // 어메니티 출력
    let showRoomsByClassification = JSON.stringify(roomInfo);
    showRoomsByClassification = JSON.parse(showRoomsByClassification);
    // Object.values(showRoomsByClassification).map
    return (
      <div>
        
        {Object.entries(showRoomsByClassification).map(([classifiedRoomType, roomData]) => (
          <div>
            <h3>{classifiedRoomType}</h3>
            {/* <p>{roomData.img_path}</p> */}
            {/* <p>{imageView(roomData.img_path)}</p> */}
            <p>{Object.values(roomData.list_amenities).map((options)=> (
              // <div><img src = {path}/></div>
              <p>{options}</p>
            ))}</p>
          </div>
        ))}
      </div>
    );
  };
//
const Ammenities = () => {
    // /become-host 에서 navigate 으로 데이터 전달 받음
    const location = useLocation();
    const result_detection= location.state.result_detection;
    const result_classification= location.state.result_classification;
    const result_textgeneration= location.state.result_textgeneration;
    const bbox_result = location.state.result_bboxing;

    const [data, setData] = useState([]);
    
    console.log(result_detection)
    console.log(result_classification)

    const mergeData = {result_detection, result_classification}
    
    console.log(mergeData)
    //
    // POST 요청
    useEffect(() => {
      // 서버에 GET 요청 보내기
      axios.post(serverUrl, mergeData)
        .then((response) => {
          // data 설정
          setData(response.data)
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    //
    return (
        <div>
            
            <h1 style={{textAlign:'center'}}>등록 전에 결과를 확인하세요.</h1>
            {Object.entries(data).map(([item, value]) => (
            <div>
            {othersImageView(value)}
            </div>
            ))}
            {/* {mergeData} */}
            {result_textgeneration}
            {/* detecion 결과 화면 보기 */}
            {/* {getDetectImg(detection_result)} */}
            {/* classification 결과 화면 보기 */}
            {/* {getClassiImg(classification_result)} */}
            {/* textgeneration 결과 화면 보기 */}
            {/* {getGenerateText(textgeneration_result)} */}

            {/* <p style={{textAlign:'center'}}>숙소 어메니티 확인 화면입니다.</p> */}
            <Button variant="primary" type="submit" href="/user/regist">이전</Button>
            <Button variant="primary" type="submit" href="">완료</Button>
            
        </div>
    );
}
export default Ammenities;
