// // 메인 화면 
import { Route, Routes } from 'react-router-dom';
import './bootstrap.min.css' // bootstrap
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
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
        <Route path= "accounts/login" element ={<Login />} />
        <Route path= "accounts/signup" element= {<Signup />} />
        <Route path= "/mypage" element ={<Mypage />} />
      </Routes>
    </Layout>
  )
}

export default App;
