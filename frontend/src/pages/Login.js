// import React, { useState, useEffect } from "react";
import React, { useState} from "react";
// import { Card, Form, Input, Button, notification } from "antd";
import { Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useNavigate, useLocation} from "react-router-dom";
import Axios from "axios";
// import useLocalStorage from "../utils/useLocalStorage";
import { back_ip_port } from './back_ip_port'
import { useAppContext, setToken } from "../store";

const serverUrl = `${back_ip_port}user/token/`;

export default function Login() {
    const { dispatch } = useAppContext();

    const location = useLocation();
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({});

    const { from: loginRedirectUrl } = location.state || {
        from: { pathname: "/" }
    };

    const navigateToSignup = () => {
        navigate("/user/signup");
      };

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;

            setFieldErrors({});

            const data = { username, password };
            try {
                const response = await Axios.post(
                    serverUrl,
                    data);
                const {
                    data: { access : jwtToken } 
                } = response;

                dispatch(setToken(jwtToken));

                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });
                navigate(loginRedirectUrl);
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: "로그인 실패",
                        description: "아이디/암호를 확인해주세요.",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    });

                    const { data: fieldsErrorMessages } = error.response;
                    // fieldsErrorMessages => { username: "m1 m2", password: [] }
                    // python: mydict.items()
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" ")
                                };
                                return acc;
                            },
                            {}
                        )
                    );
                }
            }
        }
        fn();
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "500px" }}>
            <Form
                {...layout}
                onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete={"false"}
            >
                <Form.Item>
                    <h1>로그인</h1>
                </Form.Item>
                <Form.Item
                    label="아이디"
                    name="username"
                    rules={[
                        { required: true, message: "Please input your username!" },
                        { min: 5, message: "5글자 입력해주세요." }
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" onClick={navigateToSignup}>
                        Signup
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};