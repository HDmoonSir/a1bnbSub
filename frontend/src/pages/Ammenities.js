import Button from 'react-bootstrap/Button';
import React, { Component, useState } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation } from "react-router-dom";

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
    const detection_result= location.state.detection_result;
    const classification_result= location.state.classification_result;
    const textgeneration_result= location.state.textgeneration_result;
    const bbox_result = location.state.bboxing_result;

    const [data, setData] = useState([]);

    async function uploadData() {
        // const uploadData = () => {
        const mergeData = {detection_result, classification_result}
        
        console.log("숙소 업로드"); // test 
        console.log(previewImg); // test 

        // POST 요청 
        axios({
            method: "POST",
            url: serverUrl,
            mode: "cors",
            // data: previewImg,
            data: mergeData,
            // headers: {'content-type': 'multipart/form-data'}
        })
            .then(response => {
                setData(response.data)
                console.log(response.data);
            })
            .catch((err) => { console.log(err) })
        alert("성공!") // test 
        
    }

    console.log(detection_result)
    console.log(classification_result)
    console.log(textgeneration_result)
    return (
        <div>
            {/* {onLoading} */}
            {uploadData}
            <h1 style={{textAlign:'center'}}>등록 전에 결과를 확인하세요.</h1>
            {Object.entries(data).map(([item, value]) => (
            <div>
            {othersImageView(value.dlInfo)}
            </div>
            ))}

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
