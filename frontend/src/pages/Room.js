// 메인에서 숙소 열람 페이지 
import Image from 'react-bootstrap/Image';
// useSearchParams로 전 페이지에서 보내온 post_id값을 받아옴
import { useNavigate, useSearchParams, useState, useEffect } from "react";
import axios from 'axios';
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

import { back_ip_port } from './back_ip_port'

const serverUrl = `${back_ip_port}room`;

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
          <p>{Object.values(roomData.img_path).map((path)=> (
            // <div><img src = {path}/></div>
            <img src = {path}/>
          ))}</p>
          <p>{JSON.stringify(roomData.detected)}</p>
        </div>
      ))}
    </div>
  );
};

const Room = () => {
    const [data, setData] = useState([]);

    // GET요청
    useEffect(() => {
      // 서버에 GET 요청 보내기
      axios.get(serverUrl)
        .then((response) => {
          // data 설정
          setData(response.data)
          // data = response.data.postInfo
          // userName = JSON.stringify(data.userName)
          // title = JSON.stringify(data.title)
          // thumbImgSrc = JSON.stringify(data.thumbImgSrc)
          // caption = JSON.stringify(data.caption)
          // roomInfo = data.roomInfo
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    
    return (
      <div>
        <h1>방 소개</h1>
        {Object.entries(data).map(([item, value]) => (
          <div>
          <h1 style={{textAlign:'left'}}>{value.title}</h1>
          <p style={{textAlign:'right'}}>{value.userName}</p>
          <img src = {value.thumb_image} />
          <p style={{ textAlign: "left" }}>{value.caption}</p>


          <h2>상세 방 소개</h2>
          
          {othersImageView(value.roomInfo)}
          </div>
        ))}

      </div>
    );
  };

export default Room;