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

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            verifyLoading: false,
            timeCount: 59,
        }
        this.timer = null;
    }

    onFinish = (values) => {
        this.setState({
            loading: true,
        })
        const hide = this.$message.loading("正在为您创建账号...", 0);
        console.log('Success:', values);
        userService.Login().then(data => {
            console.log(data);
            this.setState({
                loading: false,
            })
            hide();
            this.$message.success("账号创建成功");
        })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    handleRegitster = () => {
        this.props.changeForm("login");
    };

    sendVerify = (e) => {
        clearInterval(this.timer);
        this.setState({
            verifyLoading: true,
        })
        setInterval(() => {
            this.setState({
                timeCount: this.state.timeCount - 1,
            })
            if (this.state.timeCount === 0) {
                this.setState({
                    verifyLoading: true,
                })
                clearInterval(this.timer);
            }
        }, 1000);
    }

    // 自定义校验
    checkPwd = (rule, value, callback) => {
        if (!value) {
            return Promise.reject("请输入登录密码");
        }
        if (value.length < 6) {
            return Promise.reject("密码至少6位");
        }
        if (/^[1-9]\d*$/.test(value) || /^[A-Za-z]+$/.test(value)) {
            return Promise.reject("密码必须包含数字和字母");
        }
        return Promise.resolve();
    }

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
                    name="email"
                    rules={[{ required: true, message: '请输入用户名/邮箱' }]}
                >
                    <Input placeholder="请输入您正在使用的邮箱" />
                </Form.Item>

                <Form.Item
                    label=""
                    name="verify"
                    rules={[{ required: true, message: '请输入验证码' }]}
                >
                    <Input
                        placeholder="邮箱验证"
                        suffix={
                            <Button
                                type="primary"
                                size="default"
                                disabled={this.state.verifyLoading}
                                onClick={this.sendVerify}
                                block
                            >
                                {this.state.verifyLoading ? "重新获取（" + this.state.timeCount + "）" : "点击发送验证码"}
                            </Button>
                        }
                    />
                </Form.Item>

                <Form.Item
                    label=""
                    name="username"
                    rules={[{ required: true, message: '请输入您用户名' }]}
                >
                    <Input placeholder="请输入您用户名" />
                </Form.Item>

                <Form.Item
                    label=""
                    name="password"
                    rules={[{ validator: this.checkPwd }]} // 自定义校验
                >
                    <Input.Password placeholder="密码（字母、数字，至少6位）" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading} block>
                        注册
                            </Button>
                </Form.Item>

                <Divider />

                <Form.Item {...tailLayout}>
                    <Button type="default" block onClick={this.handleRegitster}>
                        已有帐号？登录
                            </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(RegisterForm);