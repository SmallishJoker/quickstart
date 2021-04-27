/*
 * @Author: joker
 * @Date: 2021-04-24 20:39:23
 * @LastEditTime: 2021-04-24 22:26:00
 * @LastEditors: Please set LastEditors
 * @Description: write article for markdown
 * @FilePath: \quickstart\src\routes\article\WriteArticle.js
 */
import React, { Component } from "react"
import Editormd from "../../components/editor/Editormd"
import style from "./writearticle.less"
import ArticleHeader from "../../components/header/ArticleHeader"

class WriteArticle extends Component {

    state = {
        editor: React.createRef()
    }

    handlePublish = () => {
        console.log(this.state.editor);
    }

    render() {
        return (
            <div className={style["article-wrap"]}>
                <div className={style["article-header"]}>
                    <ArticleHeader handlePublish={this.handlePublish} />
                </div>
                <div className={style["editor-wrap"]}>
                    <Editormd ref={this.state.editor} />
                </div>
            </div>
        )
    }
}

export default WriteArticle