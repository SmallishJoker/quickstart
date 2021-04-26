import React, { Component } from "react";
import style from "./login.less";
import LoginForm from "../../components/loginform/LoginForm";
import RegisterForm from "../../components/loginform/RegisterForm";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formId: "register",
        }
    }

    changeForm = (val) => {
        this.setState({
            formId: val,
        })
    }

    viewCom = () => {
        console.log(this.formWrap);
        if (this.state.formId === "login") {
            return <LoginForm changeForm={this.changeForm} />
        } else if (this.state.formId === "register") {
            return <RegisterForm changeForm={this.changeForm} />
        }
    }

    render() {
        return (
            <div className={style["login-wrap"]}>
                <div className={style["login-box"]} ref={(div) => { this.formWrap = div }}>
                    {this.viewCom()}
                </div>
            </div >
        );
    }
}

export default Login;