/*
 * @Author: your name
 * @Date: 2021-04-24 16:38:24
 * @LastEditTime: 2021-04-24 19:34:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \quickstart\src\routes\home\HomePage.js
 */
import React, { Component } from 'react'
import { Layout } from "antd"
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
                </Content>
            </Layout>
        )
    }
}

export default HomePage