// // 메인 화면 
import { Route, Routes } from 'react-router-dom';
import './bootstrap.min.css' // bootstrap
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import User from './pages/User';
import BecomeHost from './pages/BecomeHost';
import Ammenities from './pages/Ammenities';
import Room from './pages/Room';
// import LoginRequiredRoute from './utils/LoginRequiredRoute';

function App(){
  return (
    <Layout>
      <Routes>
        <Route path= "/" element= {<Home />} />
        <Route path= "/user" element ={<User />} /> 
        <Route path= "/user/signup" element= {<Signup />} />
        <Route path= "/user/login" element ={<Login />} />
        {/* <Route path= "user/logout" element= {<Logout />} />  */}
        <Route path= "/user/regist" element= {<BecomeHost />} />
        <Route path= "/user/regist/result" element= {<Ammenities />} />
        <Route path= "/user/regist/uploaded" element= {<Ammenities />} />
        <Route path= "room" element ={<Room />} />
      </Routes>
    </Layout>
  )
}

export default App;
