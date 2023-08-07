// 메인에서 숙소 열람 페이지 
import Image from 'react-bootstrap/Image';
// useSearchParams로 전 페이지에서 보내온 post_id값을 받아옴
import { useNavigate, useSearchParams, useState } from "react";
import Axios from 'axios';
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
      <p style={{ textAlign: "center" }}>
        방 사진 열거 맨 sort by Classification Result
      </p>
      {Object.entries(showRoomsByClassification).map(([classifiedRoomType, roomData]) => (
        <div>
          <h1>{classifiedRoomType}</h1>
          {/* <p>{roomData.img_path}</p> */}
          {/* <p>{imageView(roomData.img_path)}</p> */}
          <p>{Object.values(roomData.img_path).map((path)=> (
            // <div><img src = {path}/></div>
            <img src = {path}/>
          ))}</p>
          <h2>{JSON.stringify(roomData.detected)}</h2>
          <p>확인</p>
        </div>
      ))}
    </div>
  );
};

const Room = () => {
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors]=useState({});
    // useSearchParams 사용
    // setSearchParams의 경우 다음 페이지에 쿼리값을 전해주기 위해 사용 room?postid=3
    const [searchParams, setSearchParams]=useSearchParams();
    const data = {}
    let userName = ''
    let title = ''
    let caption = ''
    let thumbImgSrc = ''
    let roomInfo = {}

    // 쿼리 get으로 받아오기
    const onFinish = values => {
      async function fn() {
          // const { username, password } = values;
          const postid = searchParams.get('postid');

          serverUrl =  `${serverUrl}?postid=${postid}`;
          setFieldErrors({});

          // const data = { username, password };
          // GET요청
          try{
              await Axios.get(serverUrl)
              .then(function (response) {
                // 성공 핸들링
                // db를 json 파일로 해서 받을 예정 response.data = json 형태
                data = response.data.postInfo
                userName = JSON.stringify(data.userName)
                title = JSON.stringify(data.title)
                thumbImgSrc = JSON.stringify(data.thumbImgSrc)
                caption = JSON.stringify(data.caption)
                
                roomInfo = data.roomInfo

                console.log(response);
              })
              .catch(function (error) {
                // 에러 핸들링
                
                console.log(error);
              })
              .finally(function () {
                // 항상 실행되는 영역
                
              });

              // navigate("/accounts/login");

          }catch(error){
              if (error.response){
                  notification.open({
                      message: "방 정보 불러오기 실패",
                      description: "죄송합니다.",
                      icon: <FrownOutlined style={{ color: "#ff3333"}} />
                  });

                  const { data:filedsErrorMessages } = error.response;

                  setFieldErrors(
                      Object.entries(filedsErrorMessages).reduce(
                          (acc, [fieldName, errors]) => {
                              acc[fieldName] = {
                                  validateStatus: "error",
                                  help: errors.join(" ")
                              };
                              return acc;
                          },
                          {}
                      )
                  );
              }
          }
      }
      fn();
  };
    
    return (
      <div>
        <hr></hr>
        <h1 style={{textAlign:'left'}}>{title}</h1>
        <p style={{textAlign:'right'}}>{userName}</p>
        <img src = {thumbImgSrc} />
        <p style={{ textAlign: "left" }}>{caption}</p>


        <h2>상세 방 소개</h2>
        
        {othersImageView(roomInfo)}
      </div>
    );
  };

export default Room;