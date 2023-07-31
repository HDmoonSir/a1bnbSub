import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
// 회원가입 페이지 
const Signin = () => {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>회원가입</h1>
        <p style={{textAlign:'center'}}>회원가입 페이지입니다.</p>
        {/* <BasicExample></BasicExample> */}
        <FormExample></FormExample>
      </div>
    );
  };
  
  export default Signin;

//   function BasicExample() {
//     return (
//         <center>
//             <Form>
//                 <Form.Group className="mb-3" controlId="validationCustomUsername">
//                     {/* <Form.Label>아이디</Form.Label> */}
//                     <Form.Control type="email" placeholder="아이디" />
//                     {/* <Form.Text className="text-muted">
//                         We'll never share your email with anyone else.
//                     </Form.Text> */}
//                     {/* <Form.Label>Password</Form.Label> */}
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formGridPassword">
//                     <Form.Control type="password" placeholder="비밀번호" />
//                 </Form.Group>
//                     {/* 비밀번호 확인 alert! */}
//                 <Form.Group className="mb-3" controlId="formGridPasswordCheck">
//                     <Form.Control type="password" placeholder="비밀번호 확인" />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formGridEmail">
//                     <Form.Control type="email" placeholder="[필수] 비밀번호 분실 시 확인용 이메일" />
//                 </Form.Group>
            
//                 <Form.Group className="mb-3" controlId="formBasicButton">
//                     <Button variant="primary" type="submit">
//                         완료
//                     </Button>
//                 </Form.Group>
//             </Form>
//         </center>
//     );
//   }

  function FormExample() {
    const { Formik } = formik;
    const schema = yup.object().shape({
        formGridPassword: yup.string().required(),
        formGridPasswordCheck: yup.string().required()
    });

    return(
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                formGridPassword: '',
                formGridPasswordCheck: ''
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                 <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationCustomUsername">
                        {/* <Form.Label>아이디</Form.Label> */}
                        <Form.Control type="email" placeholder="아이디" />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                        {/* <Form.Label>Password</Form.Label> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridPassword">
                        <Form.Control 
                            type="password" 
                            placeholder="비밀번호"
                            name="formGridPassword"
                            value={values.formGridPassword}
                            onChange={handleChange} />
                    </Form.Group>
                        {/* 비밀번호 확인 alert! */}
                    <Form.Group className="mb-3" controlId="formGridPasswordCheck">
                        <Form.Control
                            type="password"
                            placeholder="비밀번호 확인"
                            name="formGridPasswordCheck"
                            value={values.formGridPasswordCheck}
                            onChange={handleChange}
                            isValid={touched.formGridPasswordCheck && !errors.formGridPasswordCheck 
                                && values.formGridPasswordCheck === values.formGridPassword}
                        />
                        <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Control type="email" placeholder="[필수] 비밀번호 분실 시 확인용 이메일" />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicButton">
                        <Button variant="primary" type="submit">
                            완료
                        </Button>
                    </Form.Group>
             </Form>
            )}
                 
        </Formik>
        );
    }

