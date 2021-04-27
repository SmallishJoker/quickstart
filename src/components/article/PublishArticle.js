import React, { Component } from "react"
import { Form, Divider, Button, Radio } from 'antd';
import style from "./publisharticle.less"

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
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
                    <p className={style["item-title"]}>文章分类</p>
                    <Form.Item
                        label=""
                        name="category"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Radio.Group className={style["radio-group"]} buttonStyle="solid">
                            <Radio.Button value="a">前端</Radio.Button>
                            <Radio.Button value="b">后端</Radio.Button>
                            <Radio.Button value="c">面试</Radio.Button>
                            <Radio.Button value="d">阅读</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

}

export default PublishArticle