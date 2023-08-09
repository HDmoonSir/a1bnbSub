// 메인에서 숙소 열람 페이지 
import Image from 'react-bootstrap/Image';
// useSearchParams로 전 페이지에서 보내온 post_id값을 받아옴
import { useNavigate, useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom'; 
import axios from 'axios';
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { back_ip_port, img_ip_port } from './back_ip_port'
const imgUrl = `${img_ip_port}`;

const serverUrl = `${back_ip_port}room`;

const othersImageView = (roomInfo) => {
  // list로 만들어서 출력한다? ㄴㄴ
  // 리빙룸1
  // 사진 사이즈로 열거 (브라우저 넓이 / 사진갯수로 줄여서)
  // 어메니티 출력
  let showRoomsByClassification = JSON.stringify(roomInfo);
  showRoomsByClassification = JSON.parse(showRoomsByClassification);
  Object.values(showRoomsByClassification).map
  // return (
  //   <div style={{ padding: '20px', margin: '20px'}}>

  //     {Object.entries(showRoomsByClassification).map(([classifiedRoomType, roomData]) => (
  //       <div key={classifiedRoomType} style={{ marginBottom: '20px' }}>
  //         <h3 style ={{backgroundColor: '#eb6864', color: 'white'}}>{classifiedRoomType}</h3>
  //         {/* <p>{roomData.img_path}</p> */}
  //         {/* <p>{imageView(roomData.img_path)}</p> */}
  //         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
  //           {Object.values(roomData.img_paths).map((path, index)=> (
  //             <img key={index} src={`${imgUrl}/${path}`} style={{ marginRight: '10px', marginBottom: '10px', maxWidth: '300px', maxHeight: '180px' }} />
  //             // <img src = {path}/>
  //           ))}
  //         </div>
  //         <p>{Object.entries(roomData.list_amenities).map(([amenity, count]) => (
  //           <span key={amenity} style={{ margin: '5px', padding: '5px 10px', backgroundColor: '#f19592', color: 'white', borderRadius: '5px', border: '4px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)' }}>
  //             {amenity} {count} &nbsp;
  //           </span>        
  //         ))}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
  return (
  <div style={{ padding: '20px', margin: '20px' }}>
    {Object.entries(showRoomsByClassification).map(([classifiedRoomType, roomData]) => (
      <div key={classifiedRoomType} style={{ marginBottom: '20px' }}>
        <h3 style={{ backgroundColor: '#eb6864', color: 'white', padding: '10px', borderRadius: '5px', width: '100%', margin: '0 auto',}}>
          {classifiedRoomType}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
          {Object.values(roomData.img_paths).map((path, index) => (
            <Card key={index} style={{ width: '18rem', margin: '10px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'}}>
              <Card.Img variant="top" src={`${imgUrl}/${path}`} style={{ borderRadius: '10px', maxHeight: '180px' }} />
            </Card>
          ))}
        </div>
        <p>
          {Object.entries(roomData.list_amenities).map(([amenity, count]) => (
            <span
              key={amenity}
              style={{
                margin: '5px',
                padding: '5px 10px',
                backgroundColor: '#f19592',
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
              }}>
              {amenity} {count} &nbsp;
            </span>
          ))}
        </p>
      </div>
    ))}
  </div>
);

};

const Room = () => {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const post_id = searchParams.get('postid')
    
    const serverUrl2 = `${serverUrl}?postid=${post_id}`;
    // GET요청
    useEffect(() => {
      // 서버에 GET 요청 보내기
      axios.get(serverUrl2)
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
      <div style={{ padding: '20px' }}>
        {/* <h1>방 소개</h1> */}
        {Object.entries(data).map(([item, value]) => (
          <div 
            key={item} 
            style={{ 
              // display: 'flex', // Flexbox layout
              // flexDirection: 'column', // Align items in a column
              // alignItems: 'center', // Center items horizontally
              border: '5px solid #ddd',
              padding: '20px',
              margin: '20px 0',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            {/* <div style={{ flex: '1', maxWidth: '80%' }}>
              <div style={{ display: 'flex' ,  justifyContent: 'center'}}> */}
              <h2 style={{ marginBottom: '10px', textAlign: 'center'}}>{value.title}</h2>
              <p style={{ textAlign: 'right', color: '#666'}}>작성자: {value.userName}</p>
              {/* </div> */}
              <img
                src={`${imgUrl}/${value.thumbnail}`}
                alt={value.title}
                style={{
                  maxWidth: '600px',
                  height: '360px',
                  borderRadius: '10px'
                }}
              />
              <p style={{  width: '600px', margin: '10px auto', border: '2px solid #ddd', padding: '5px', textAlign: 'left', lineHeight: '1.5',  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9', borderRadius: '5px', maxWidth: '100%'}}>{value.caption}</p>
            {/* </div> */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', justifyContent: 'center' }}>
                {/* <h3>상세 방 소개</h3> */}
                {othersImageView(value.roomInfo)}
              </div>
          </div>
        ))}
      </div>
    );
    
  };

export default Room;