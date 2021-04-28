/*
 * @Author: your name
 * @Date: 2021-04-27 20:25:56
 * @LastEditTime: 2021-04-27 22:24:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \quickstart\src\components\article\PublishArticle.js
 */
import React, { Component } from "react"
import { Form, Button, Radio, Input } from 'antd';
import articleService from "../../services/articleService"
import SelectOption from "./SelectOption"
import style from "./publisharticle.less"

const { TextArea } = Input

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
};


class PublishArticle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            form: React.createRef(),
            categorys: []
        }
    }

    onFinish = (values) => {
        if (!values.category) {
            return this.$message.error("选择文章分类")
        }
        if (!values.tags) {
            return this.$message.error("至少选择一个标签")
        }
        if (!values.abstract) {
            return this.$message.error("填写文章摘要")
        }
        this.props.handlePublish({
            form: this.state.form.current.getFieldsValue(true)
        })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    handleChange = (value) => {
        this.state.form.current.setFieldsValue({
            tags: value
        })
    }

    componentWillMount = () => {
        articleService.getCategorys({
            method: "get",
        }).then(res => {
            this.setState({
                categorys: res.data
            })
            console.log(this.state.categorys);
        })
    }

    render() {
        const { categorys } = this.state
        return (
            <div className={style["article-from"]}>
                <p className={style["title"]}>发布文章</p>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    ref={this.state.form}
                >
                    <p className={style["item-title"]}>分类</p>
                    <Form.Item
                        label=""
                        name="category"
                    >
                        <Radio.Group className={style["radio-group"]} size="small" buttonStyle="solid">
                            {
                                categorys.map(item => {
                                    return (<Radio.Button value={item} key={item._id}>{item.category_name}</Radio.Button>)
                                })
                            }
                        </Radio.Group>
                    </Form.Item>

                    <p className={style["item-title"]}>选择标签</p>

                    <Form.Item
                        label=""
                        name="tags"
                    >
                        <SelectOption handleChange={this.handleChange} />
                    </Form.Item>

                    <p className={style["item-title"]}>文章摘要</p>

                    <Form.Item
                        label=""
                        name="abstract"
                    >
                        <TextArea rows={5} />
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