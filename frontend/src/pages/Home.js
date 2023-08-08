import { useSearchParams, useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { back_ip_port, img_ip_port } from './back_ip_port';
const serverUrl = `${back_ip_port}`;
const imgUrl = `${img_ip_port}`;

function Home() {
    const navigate = useNavigate();
    const [imageList, setImageList] = useState([]);
    // const [searchParams] = useSearchParams();
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            // const postid = searchParams.get('postid');
            const response = await axios.get(`${serverUrl}`);
            const latestData = response.data; // 최신 8개 데이터 배열

            setImageList(latestData); // 이미지 리스트에 최신 데이터 할당
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    const handleCardClick = (postId) => {
        navigate(`/room?postid=${postId}`);
    };
    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: '30px'}}>A1BnB를 이용해 보세요</h1>

            <Row sx={1} md={4} className="g-4">
                {imageList.map((info, idx) => (
                    <Col key={idx}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`${imgUrl}/${info.thumbnail}`} />
                            <Card.Body>
                                <Card.Title>{info.title}</Card.Title>
                                <Button variant="primary" onClick={() => handleCardClick(info.postId)}>이동</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
export default Home;