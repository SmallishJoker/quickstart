/*
 * @Author: joker
 * @Date: 2021-04-24 20:39:23
 * @LastEditTime: 2021-04-28 20:51:47
 * @LastEditors: Please set LastEditors
 * @Description: write article for markdown
 * @FilePath: \quickstart\src\routes\article\WriteArticle.js
 */
import React, { Component } from "react"
import Editormd from "../../components/editor/Editormd"
import style from "./writearticle.less"
import ArticleHeader from "../../components/header/ArticleHeader"
import articleService from "../../services/articleService"

class WriteArticle extends Component {

    state = {
        editor: React.createRef()
    }

    handlePublish = (value) => {
        let form = value.form
        let content = this.state.editor.current.state.value
        let article = {
            article_info: {
                title: value.title,
                mark_content: content,
                brief_content: form.abstract,
                category_id: form.category.category_id
            },
            category: form.category,
            tags: form.tags.map(item => ({
                tag_name: item.label,
                tag_id: item.value
            })),
            is_publish: true
        }

        console.log(article);

        if (!content) {
            return this.$message.info("输入文章内容")
        }

        articleService.saveArticle({
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article),
        }).then(res => {
            if (res.status === 200) {
                this.$message.success("发布成功")
            }
        }).catch(err => {
            this.$message.error("error")
        })
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