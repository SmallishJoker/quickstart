import React, { Component } from "react"
import style from "./header.less"
import { Row, Col, Button, Modal } from "antd"
import UserLogin from "../../components/loginform/UserLogin"


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: "home",
            menuList: [
                {
                    name: "首 页",
                    id: "home"
                },
                {
                    name: "Hotspot",
                    id: "hotspot"
                },
                {
                    name: "文档",
                    id: "doc"
                },
            ],
            isModalVisible: false
        }
    }

    menuClick = (val) => {
        this.setState({
            active: val.id
        })
    }

    handleLogin = () => {
        this.setState({
            isModalVisible: true
        })
    }

    handleOk = () => {

    }

    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    }

    closeLogin = () => {
        this.setState({
            isModalVisible: false
        })
    }

    render() {
        return (
            <div className={style["header-wrap"]}>
                <Row justify="center">
                    <Col span={16}>
                        <Row>
                            <Col span={14}>
                                <div className={style["left-wrap"]}>
                                    <div className={style["Logo"]}>Share</div>
                                    <div className={style["menu-wrap"]}>
                                        {
                                            this.state.menuList.map(item =>
                                                <div
                                                    className={this.state.active === item.id ? `${style["menu-item"]} ${style["active"]}` : style["menu-item"]}
                                                    onClick={this.menuClick.bind(this, item)}
                                                    key={item.id}
                                                >
                                                    {item.name}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col span={10}>
                                <div className={style["right-wrap"]}>
                                    <div className={style["btn-group"]}>
                                        <Button type="primary" size="default" onClick={this.handleLogin}>
                                            写文章
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button type="primary" size="default" onClick={this.handleLogin}>
                                            登 录
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal
                    title=""
                    visible={this.state.isModalVisible}
                    closable={false}
                    maskClosable={false}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={350}
                >
                    <UserLogin closeLogin={this.closeLogin} />
                </Modal>
            </div>
        )
    }
}

export default Header