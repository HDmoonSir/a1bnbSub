// // 메인 화면 
import { Route, Routes } from 'react-router-dom';
import './bootstrap.min.css' // bootstrap
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Layout from './layout/Layout';
// import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import BecomeHost from './pages/BecomeHost';
import Ammenities from './pages/Ammenities';

function App(){
  return (
    <Layout>
      <Routes>
        <Route path= "/become-host" element= {<BecomeHost />} />
        <Route path= "/become-host/ammenities" element= {<Ammenities />} />
        <Route path= "/" element= {<Home />} />
        <Route path= "/login" element ={<Login />} />
        <Route path= "/signin" element= {<Signin />} />
        <Route path= "/mypage" element ={<Mypage />} />
      </Routes>
    </Layout>
  )
}

export default App;

// function App() {
//   return (
//     <Routes>
//       <Route path= "/" element= {<Home />} />
//       <Route path= "/about" element ={<About />} />
//     </Routes>
//   );
// }
// export default App;

// import { people } from './data/data.js';
// import { getImageUrl } from './data/utils.js';

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
// import { people } from './data/data.js';
// import { getImageUrl } from './data/utils.js';

// export default function List() {
//   const listItems = people.map(person =>
//     <span key={person.id}>
//       <img 
//         src={getImageUrl(person)}
//         alt={person.name}
//       />
//       <p>
//         <ol>{person.name}</ol>
//         <ol>{person.profession}</ol>
//         <ol>{person.accomplishment}</ol>
//       </p>
//     </span>
//   );
//   return (
//     <section>
//       <h1>숙소</h1>
//       <div>{listItems}</div>
//     </section>
//   );
// }
