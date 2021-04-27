/*
 * @Author: your name
 * @Date: 2021-04-27 20:25:56
 * @LastEditTime: 2021-04-27 22:24:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \quickstart\src\components\article\PublishArticle.js
 */
import React, { Component } from "react"
import { Form, Button, Radio, Select, Spin } from 'antd';
import SelectOption from "./SelectOption"
import style from "./publisharticle.less"

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
};


class PublishArticle extends Component {

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div className={style["article-from"]}>
                <p className={style["title"]}>发布文章</p>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <p className={style["item-title"]}>分类</p>
                    <Form.Item
                        label=""
                        name="category"
                    >
                        <Radio.Group className={style["radio-group"]} size="small" buttonStyle="solid">
                            <Radio.Button value="a">前端</Radio.Button>
                            <Radio.Button value="b">后端</Radio.Button>
                            <Radio.Button value="c">面试</Radio.Button>
                            <Radio.Button value="d">阅读</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <p className={style["item-title"]}>选择标签</p>

                    <Form.Item
                        label=""
                        name="tags"
                    >
                        <SelectOption />
                    </Form.Item>

                    <p className={style["item-title"]}>文章摘要</p>

                    <Form.Item
                        label=""
                        name="category"
                    >
                        <SelectOption />
                    </Form.Item>

                    <Form.Item>
                        <div className={style["confirm-button"]}>
                            <Button type="default" htmlType="submit">
                                确定发布
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        )
    }

}

export default PublishArticle