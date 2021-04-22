import React, { Component } from 'react'
import { Router, Route, Switch } from 'dva/router'
import { Layout, Menu, Breadcrumb } from "antd"
import style from "./homepage.less"
import HeaderCom from "../../components/header/Header"

const { Header, Content } = Layout

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "HomePage"
        }
    }
    render() {
        return (
            <Layout className={style["layout"]}>
                <Header className={style["header-bgc"]}>
                    <HeaderCom />
                </Header>
                <Content>
                    <div style={{ height: "1200px" }}></div>
                </Content>
            </Layout>
        )
    }
}

export default HomePage