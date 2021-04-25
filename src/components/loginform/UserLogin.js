import React, { Component } from "react"
import { Form, Input, Button, Divider } from 'antd'
import style from "./userlogin.less"
import { withRouter } from "react-router-dom"

import userService from "../../services/userService";

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            verifyLoading: false,
            timeCount: 59,
            loginForm: React.createRef(),
        }
        this.timer = null;
    }

    handleClose = () => {
        this.props.closeLogin()
    }

    onFinish = (values) => {
        this.setState({
            loading: true,
        })
        const hide = this.$message.loading("正在为您登录...", 0);
        let userForm = {
            username: values.email,
            password: this.$md5(values.verify),
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
        }).catch((err) => {
            this.$message.error("连接错误");
        })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    handleRegitster = () => {
        this.props.changeForm("login");
    };

    sendVerify = () => {
        let email = this.state.loginForm.current.getFieldValue("email")
        if (!email) {
            return;
        }
        clearInterval(this.timer);
        this.setState({
            verifyLoading: true,
        })
        userService.SendEmail({
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
        }).then(res => {
            if (res.data.status === 200) {
                this.$message.success(res.data.message)
            }
        }).catch(() => {
            this.$message.error("验证码发送失败，请输入正确的邮箱地址")
        })
        this.timer = setInterval(() => {
            this.setState({
                timeCount: this.state.timeCount - 1,
            })
            if (this.state.timeCount === 0) {
                this.setState({
                    verifyLoading: false,
                    timeCount: 59
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
            <div className={style["user-login-wrap"]}>
                <div className={style["login-header"]}>
                    <div className={style["title"]}>邮箱登录</div>
                    <div><i className="fa fa-close" onClick={this.handleClose}></i></div>
                </div>
                <Form
                    {...layout}
                    ref={this.state.loginForm}
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
                        rules={[{ required: true, message: '请输入邮箱' }]}
                    >
                        <Input placeholder="请输入您的邮箱" />
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
                                    type="link"
                                    size="small"
                                    disabled={this.state.verifyLoading}
                                    onClick={this.sendVerify}
                                    block
                                >
                                    {this.state.verifyLoading ? "重新获取（" + this.state.timeCount + "）" : "点击发送验证码"}
                                </Button>
                            }
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" loading={this.state.loading} block>
                            登录
                        </Button>
                    </Form.Item>

                    <Divider />

                    <Form.Item {...tailLayout}>
                        <Button type="default" block onClick={this.handleRegitster}>
                            其他登录方式
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default withRouter(UserLogin)