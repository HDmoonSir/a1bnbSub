import Button from 'react-bootstrap/Button';

const Ammenities = () => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>호스트 숙소 게시글 화면</h1>
            <p style={{textAlign:'center'}}>
                숙소 등록하는 화면입니다
            </p>
            <p style={{textAlign:'center'}}>숙소 어메니티 확인 화면입니다.</p>
            <Button variant="primary" type="submit" href="/become-host">이전</Button>
            <Button variant="primary" type="submit" href="">다음</Button>
        </div>

    );
};
  
export default Ammenities;