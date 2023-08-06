// 메인에서 숙소 열람 페이지 
import Image from 'react-bootstrap/Image';

function ImageExample() {
  return <Image src="https://tensorflow.org/images/bedroom_hrnet_tutorial.jpg" fluid />;
}

const Room = () => {
    // 쿼리 
    return (
      <div>
        <h1 style={{textAlign:'center'}}>Room 페이지</h1>
        <p style={{textAlign:'center'}}>Room 페이지 화면입니다</p>
        <hr></hr>
        <h2 style={{textAlign:'left'}}>title</h2>
        <src><p>이미지 n장</p></src>
        {ImageExample()}

        <p>숙소 소개글...</p>
        <p>detection 결과</p>
        <p>classfication 결과</p>
        <hr></hr>
      </div>
    );
  };

export default Room;