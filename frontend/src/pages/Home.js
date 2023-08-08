import { useSearchParams, useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { back_ip_port } from './back_ip_port';
const serverUrl = `${back_ip_port}`;

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
            <h1 style={{ textAlign: 'center' }}>A1BnB에 등록된 숙소들</h1>

            <Row sx={1} md={4} className="g-4">
                {imageList.map((info, idx) => (
                    <Col key={idx}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={info.thumbnail} />
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

// // import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// // 메인 화면
// const Home = () => {
//   return (
//     <div>
//       <h1 style={{ textAlign: 'center' }}>홈</h1>
//       <p style={{ textAlign: 'center' }}>가장 먼저 보여지는 페이지입니다.</p>
//       <Row sx={1} md={4} className="g-4">
//         {Array.from({ length: 12 }).map((_, idx) => (
//           <Col key={idx}>
//             <Card style={{ width: '18rem' }}>
//               <Card.Img variant="top" src="https://tensorflow.org/images/bedroom_hrnet_tutorial.jpg" />
//               <Card.Body>
//                 <Card.Title>숙소 제목 {idx + 1}</Card.Title>
//                 <Card.Text>
//                   {/* Some quick example text to build on the card title and make up the
//                             bulk of the card's content. 보여줄 내용 */}
//                 </Card.Text>
//                 <Button variant="primary" href='/room'>이동</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default Home;

// // import { people } from './data.js';
// // import { getImageUrl } from './utils.js';

// // export default function List() {
// //   const listItems = people.map(person =>
// //     <li key={person.id}>
// //       <img
// //         src={getImageUrl(person)}
// //         alt={person.name}
// //       />
// //       <p>
// //         <b>{person.name}:</b>
// //         {' ' + person.profession + ' '}
// //         known for {person.accomplishment}
// //       </p>
// //     </li>
// //   );
// //   return (
// //     <article>
// //       <h1>Scientists</h1>
// //       <ul>{listItems}</ul>
// //     </article>
// //   );
// // }
