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
    const title = location.state.post_title;
    const caption = location.state.post_caption;

    console.log(result_detection)
    console.log(result_classification)
    console.log(title)
    console.log(caption)

    const [data, setData] = useState([]);
    //
    // POST 요청
    // useEffect(() => {
    //   // 서버에 GET 요청 보내기
    //   axios.post(serverUrl, mergeData)
    //     .then((response) => {
    //       // data 설정
    //       setData(response.data)
    //       console.log(response.data);
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching data:', error);
    //     });
    // }, []);
    //
    return (
        <div>
            
            <h1 style={{textAlign:'center'}}>등록이 완료되었습니다.</h1>
            <p>{title}</p>
            <p>{caption}</p>
            <p>{result_detection}</p>
            <p>{result_classification}</p>

        </div>
    );
}
export default Uploaded;
