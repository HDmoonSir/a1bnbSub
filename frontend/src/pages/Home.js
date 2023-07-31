// import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// 메인 화면 
const Home = () => {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>홈</h1>
        <p style={{textAlign:'center'}}>가장 먼저 보여지는 페이지입니다.</p>
        <Row sx= {1} md ={4} className ="g-4">
            {Array.from({ length: 12 }).map((_, idx) => (
            <Col key= {idx}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://tensorflow.org/images/bedroom_hrnet_tutorial.jpg" />
                    <Card.Body>
                        <Card.Title>숙소 제목 {idx+1}</Card.Title>
                        <Card.Text>
                            {/* Some quick example text to build on the card title and make up the
                            bulk of the card's content. 보여줄 내용 */}
                        </Card.Text>
                        <Button variant="primary">이동</Button>
                    </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
      </div>
    );
  };
  
  export default Home;

// import { people } from './data.js';
// import { getImageUrl } from './utils.js';

// export default function List() {
//   const listItems = people.map(person =>
//     <li key={person.id}>
//       <img
//         src={getImageUrl(person)}
//         alt={person.name}
//       />
//       <p>
//         <b>{person.name}:</b>
//         {' ' + person.profession + ' '}
//         known for {person.accomplishment}
//       </p>
//     </li>
//   );
//   return (
//     <article>
//       <h1>Scientists</h1>
//       <ul>{listItems}</ul>
//     </article>
//   );
// }
