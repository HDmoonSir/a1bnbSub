import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import Axios from 'axios';
// 로그인 화면 
const Login = () => {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>로그인</h1>
        <p style={{textAlign:'center'}}>A1BnB에 오신 것을 환영합니다.</p>
        {/* 로그인 버튼 */}
        <BasicExample></BasicExample>
        {/* <GoogleLoginButton></GoogleLoginButton> */}
        {/* <p Link="" style={{textAlign:'center'}}>회원가입</p> */}
        <Breadcrumb>
            <Breadcrumb.Item href="signin" className="mx-auto">회원가입</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  };
  
export default Login;

// // 구글 로그인 버튼 
// const GoogleLoginButton = () =>{
//     const clientId = '1093194890162-39suj1pnlko4eu3ngb4k0qqe4iom3e87.apps.googleusercontent.com'
//     return (
//         <>
//             <GoogleOAuthProvider clientId={clientId}>
//                 <GoogleLogin
//                     onSuccess={(res) => {
//                         console.log(res);
//                     }}
//                     onFailure={(err) => {
//                         console.log(err);
//                     }}
//                 />
//             </GoogleOAuthProvider>
//         </>
//     );
// }

// 로그인 폼 
function BasicExample() {
    const [inputs, setInputs] = useState({});
    const onSubmit = e =>{
        e.preventDefault(); // 새로고침 없애기
        console.log("onSubmit :", inputs);

        Axios.post("http://localhost:8000/account/signin", inputs) // 장고 api 
        .then(response =>{
            console.log("response :", response);
        })
        .catch(error =>{
            console.log("error :", error);
        })
    };
    
    const onChange = e =>{
        const { name, value }= e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <center>
            <Form onSubmit={onSubmit}>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
            <Form.Group className="mb-3">
                {/* <Form.Label>아이디</Form.Label> */}
                <Form.Control name= "username" type="email" placeholder="아이디" onChange={onChange}/>
                {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text> */}
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control name= "password" type="password" placeholder="비밀번호" onChange={onChange}/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
            {/* <Form.Check type="checkbox" label="Check me out" /> */}
            {/* </Form.Group> */}
            <Button variant="primary" type="submit">
                로그인
            </Button>
        </Form>
        </center>
    );
  }