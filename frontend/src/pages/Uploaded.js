import Button from 'react-bootstrap/Button';
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation, useNavigate } from "react-router-dom";

import { back_ip_port } from './back_ip_port'

const serverUrl = `${back_ip_port}user/regist/uploaded`;

const Uploaded = () => {
    // /become-host 에서 navigate 으로 데이터 전달 받음
    const location = useLocation();
    const navigate = useNavigate();

    const result_detection= location.state.result_detection;
    const result_classification= location.state.result_classification;
    const result_title = location.state.post_title;
    const result_caption = location.state.post_caption;
    const result_roomInfo = location.state.post_roomInfo;

    console.log(result_detection)
    console.log(result_classification)
    console.log(result_title)
    console.log(result_caption)
    console.log(result_roomInfo)
    // const [data, setData] = useState([]);

    const mergeData = {result_detection, result_classification, 'title' : result_title, 'caption' : result_caption, 'roomInfo' : result_roomInfo}
    
    console.log(mergeData)
    // POST 요청
    useEffect(() => {
      // 서버에 POST 요청 보내기
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
    
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
            
          <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>등록이 완료되었습니다.</h1>
          {/* <p>{result_title}</p>
          <p>{result_caption}</p> */}
          {/* <p>{result_detection}</p>
          <p>{result_classification}</p> */}

        </div>
    );
}
export default Uploaded;
