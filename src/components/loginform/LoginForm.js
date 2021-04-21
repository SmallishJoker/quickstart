import React, { Component } from "react";
import { Form, Input, Button, Divider } from 'antd';
import style from "./form.less";
import { withRouter } from "react-router-dom";

import userService from "../../services/userService";

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

class LoginForm extends Component {
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
        const hide = this.$message.loading("登录中...", 0);
        let userForm = {
            username: values.username,
            password: this.$md5(values.password),
        }
        userService.Login({
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm),
        }).then(res => {
            hide();
            this.setState({
                loading: false,
            })
            if (res.data.status === 200) {
                this.$message.success(res.data.message);
            } else {
                this.$message.warning(res.data.message);
            }
        })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    handleRegitster = () => {
        this.props.changeForm("register");
    };

    render() {
        return (
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
                    <Button type="default" block onClick={this.handleRegitster}>
                        还没有账号？免费注册
                            </Button>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="default" block>
                        忘记密码？重置
                            </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(LoginForm);