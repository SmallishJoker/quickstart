import React, { Component } from "react";

import { Form, Input, Button, Checkbox, Row, Col, Divider, message } from 'antd';

import style from "./login.less";

import userService from "../../services/userService";

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    onFinish = (values) => {
        this.setState({
            loading: true,
        })
        const hide = message.loading("登录中...", 0);
        console.log('Success:', values);
        userService.Login().then(data => {
            console.log(data);
            this.setState({
                loading: false,
            })
            hide();
            message.success("登录成功");
        })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    Demo = () => {
        return (
            <div className={style["login-wrap"]}>
                <div className={style["login-box"]}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        size="large"
                        className={style["login-form"]}
                    >
                        <Form.Item
                            label=""
                            name="username"
                            rules={[{ required: true, message: '请输入用户名/邮箱' }]}
                        >
                            <Input placeholder="用户名/邮箱" />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="password"
                            rules={[{ required: true, message: '请输入登录密码' }]}
                        >
                            <Input.Password placeholder="密码" />
                        </Form.Item>

                        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={this.state.loading} block>
                                登录
                            </Button>
                        </Form.Item>

                        <Divider />

                        <Form.Item {...tailLayout}>
                            <Button type="default" block>
                                还没有账号？免费注册
                            </Button>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="default" block>
                                忘记密码？重置
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };

    render() {
        return this.Demo();
    }
}

export default Login;