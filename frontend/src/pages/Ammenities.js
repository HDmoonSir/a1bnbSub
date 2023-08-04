import Button from 'react-bootstrap/Button';
import React, { Component, useState } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation } from "react-router-dom";

// 숙소 어매니티 화면 // object detection result
// detection 결과 보여주는 함수 
const getDetectImg= (detection_result)=> {
    // return previewImg.map((el, index) =>{ # 반복
    // let result = JSON.stringify(detection_result.post_1)
    let result = JSON.stringify(detection_result)
    result= JSON.parse(result);
    return (
        <div>
            <p style={{textAlign:'center'}}>숙소 어매니티 확인 부분입니다.</p>
            <Row sx= {1} md ={2} className ="g-2">
            {/* {Array.from({ length: Object.keys(result).length }).map((_, idx) => ( */}
                {Object.keys(result).map((testKey) => (
                    // <Col key= {idx}>
                    <Col key= {testKey}>
                        <Card style={{ width: '40rem' }}>
                            <Card.Img variant="top" src="https://tensorflow.org/images/bedroom_hrnet_tutorial.jpg" />
                            <Card.Body>
                                <Card.Title>detect 이미지 {testKey}</Card.Title>
                                    <div>
                                        {/* {Object.keys(result[testKey]).map((subKey) => ( */}
                                            {/* <div key={subKey}> */}
                                                <textarea name="detection" rows={4} cols={60}
                                                // defaultValue={result[idx]}/>
                                                    defaultValue={JSON.stringify(
                                                        result[testKey]
                                                    )}
                                                />
                                            {/* </div> */}
                                        {/* ))} */}
                                    </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
            <hr/>
        </div>
    )
};
// classification 결과 보여주는 함수
const getClassiImg= (classification_result)=> {
    // let result = JSON.stringify(classification_result.post_1)
    let result = JSON.stringify(classification_result)
    result= JSON.parse(result);
    return (
        <div>
            <p style={{textAlign:'center'}}>숙소 분류 확인 부분입니다.</p>
            <Row sx= {1} md ={2} className ="g-2">
            {/* {Array.from({ length: Object.keys(result).length }).map((_, idx) => ( */}
                {Object.keys(result).map((testKey) => (
                    // <Col key= {idx}>
                    <Col key= {testKey}>
                        <Card style={{ width: '40rem' }}>
                            <Card.Img variant="top" src="https://tensorflow.org/images/bedroom_hrnet_tutorial.jpg" />
                            <Card.Body>
                                {/* <Card.Title>classification 이미지 {idx+1}</Card.Title> */}
                                <Card.Title>classification 이미지 {testKey}</Card.Title>
                                <textarea name="classification" rows={4} cols={60}
                                // defaultValue={result[idx]}/>
                                // defaultValue={`${result[testKey][0]}, ${
                                //     result[testKey][1]
                                //   }`}
                                defaultValue={`${result[testKey]}`}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>
            <hr/>
        </div>
    )
};
// generation 결과 보여주는 함수
const getGenerateText= (textgeneration_result)=> {
    let result = JSON.stringify(textgeneration_result)
    //result= JSON.parse(result);
    return (
        <div>
            <p style={{textAlign:'center'}}>숙소 소개글 확인 부분입니다.</p>
            <center>
                <label>
                    <textarea name="text_generation" rows={10} cols={100}
                    defaultValue={result} // generation 결과
                    />
                </label>
            </center>
            <hr/>
        </div>
    )
};
// class Ammenities extends Component{
//     state ={
//         post: []
//     };
//     reqData= JSON.stringify({
//         'image_file': 'image.jpg',
//         "text": "ammenities des"
//     });

//     serverUrl= 'http://127.0.0.1:8000/get/ammenities/';
//     async componentDidMount(){
//         try{
//             const res= await fetch(this.serverUrl, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                   },
//                 // data: this.reqData
//             });
//             // console.log(this.reqData);
//             const posts= await res.json();
//             this.setState({
//                 posts
//             });
//             console.log(posts);
//         } catch (e){
//             console.log(e)
//         }
//     };
//     render(){
//         return (
//             <div>
//                 {/* {onLoading} */}
//                 <h1 style={{textAlign:'center'}}>호스트 숙소 게시글 화면</h1>
//                 <p style={{textAlign:'center'}}>
//                     숙소 등록하는 화면입니다
//                 </p>
//                 {/* <p style={{textAlign:'center'}}>숙소 어메니티 확인 화면입니다.</p> */}
//                 <Button variant="primary" type="submit" href="/become-host">이전</Button>
//                 <Button variant="primary" type="submit" href="">완료</Button>
//                 {/* detecion 결과 화면 보기 */}
//                 {getDetectImg()}
//                 {getClassiImg()}
//                 {getGenerateText()}
//             </div>
//         );
//     }
// }

// export default Ammenities;

const Ammenities = () => {
    // /become-host 에서 navigate 으로 데이터 전달 받음
    const location = useLocation();
    const detection_result= location.state.detection_result;
    const classification_result= location.state.classification_result;
    const textgeneration_result= location.state.textgeneration_result

    console.log(detection_result)
    console.log(classification_result)
    console.log(textgeneration_result)
    return (
        <div>
            {/* {onLoading} */}
            <h1 style={{textAlign:'center'}}>호스트 숙소 게시글 화면</h1>
            <p style={{textAlign:'center'}}>
                숙소 등록하는 화면입니다
            </p>
            {/* <p style={{textAlign:'center'}}>숙소 어메니티 확인 화면입니다.</p> */}
            <Button variant="primary" type="submit" href="/become-host">이전</Button>
            <Button variant="primary" type="submit" href="">완료</Button>
            {/* detecion 결과 화면 보기 */}
            {getDetectImg(detection_result)}
            {/* classification 결과 화면 보기 */}
            {getClassiImg(classification_result)}
            {/* textgeneration 결과 화면 보기 */}
            {getGenerateText(textgeneration_result)}
            </div>
    );
}
export default Ammenities;
