import React, { Component } from "react"
import { Upload, Image, Popover, Input, Button, Avatar } from 'antd';
import { LoadingOutlined, PlusOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import style from "./articleheader.less"
import PublishArticle from "../../components/article/PublishArticle"

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class ArticleHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            imageUrl: '',
            title: ''
        };
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
        if (info.file.status === 'error') {
            this.$message.error("上传失败")
            this.setState({
                loading: false,
            })
        }
    };

    handleRemove = () => {
        this.setState({
            imageUrl: ""
        })
    }

    handlePublish = (value) => {
        if (!this.state.title) {
            return this.$message.info("输入文章标题")
        }
        this.props.handlePublish({
            title: this.state.title,
            ...value
        })
    }

    uploadCom = () => {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>点击添加图片</div>
            </div>
        );
        return (
            <div className={style["upload-body"]}>
                <h3>上传封面图片</h3>
                {!imageUrl ? <Upload
                    name="avatar"
                    listType="picture-card"
                    className={`avatar-uploader ${style["wu-upload"]}`}
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={this.handleChange}
                >
                    {uploadButton}
                </Upload> :
                    <div className={style["img-body"]}>
                        <div className={style["img-delete"]} onClick={this.handleRemove}>
                            <DeleteOutlined className={style["delete-icon"]} />
                        </div>
                        <Image src={imageUrl} preview={false} width="100%" />
                    </div>}
            </div>
        );
    }

    render() {
        return (
            <div className={style["header-wrap"]}>
                <div className={style["img-upload"]}>
                    <Popover placement="bottomRight" title={null} content={this.uploadCom} trigger="click">
                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                    </Popover>
                </div>
                <div className={style["title-input"]}>
                    <Input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} placeholder="输入文章标题" />
                    <Button>保存草稿</Button>
                    <Popover placement="bottomRight" title={null} content={<PublishArticle handlePublish={this.handlePublish} />} trigger="click">
                        <Button type="primary">发布</Button>
                    </Popover>
                    <div><Avatar icon={<UserOutlined />} /></div>
                </div>
            </div>
        )
    }
}

export default ArticleHeader