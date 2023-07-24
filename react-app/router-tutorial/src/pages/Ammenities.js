import Button from 'react-bootstrap/Button';
import React, { Component, useState } from 'react';
import axios from 'axios';

// 숙소 어매니티 화면 // object detection result
// const Ammenities = () => {

//     return (
//         <div>
//             <h1 style={{textAlign:'center'}}>호스트 숙소 게시글 화면</h1>
//             <p style={{textAlign:'center'}}>
//                 숙소 등록하는 화면입니다
//             </p>
//             <p style={{textAlign:'center'}}>숙소 어메니티 확인 화면입니다.</p>
//             <Button variant="primary" type="submit" href="/become-host">이전</Button>
//             <Button variant="primary" type="submit" href="">다음</Button>
//         </div>

//     );
// };
class Ammenities extends Component{
    state ={
        post: []
    };
    reqData= JSON.stringify({
        'image_file': 'image.jpg',
        "text": "ammenities des"
    });

    serverUrl= 'http://127.0.0.1:8000/get/ammenities/';
    async componentDidMount(){
        try{
            const res= await fetch(this.serverUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                  },
                data: this.reqData
            });
            // console.log(this.reqData);    
            const posts= await res.json();
            this.setState({
                posts
            });
            console.log(posts);     
        } catch (e){
            console.log(e)
        }
    };
    render(){
        return (
            <div>
                {/* {onLoading} */}
                <h1 style={{textAlign:'center'}}>호스트 숙소 게시글 화면</h1>
                <p style={{textAlign:'center'}}>
                    숙소 등록하는 화면입니다
                </p>
                <p style={{textAlign:'center'}}>숙소 어메니티 확인 화면입니다.</p>
                <Button variant="primary" type="submit" href="/become-host">이전</Button>
                <Button variant="primary" type="submit" href="">다음</Button>
            </div>
        );
    }
}
  
export default Ammenities;