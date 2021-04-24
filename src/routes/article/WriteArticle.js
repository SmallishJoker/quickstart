/*
 * @Author: joker
 * @Date: 2021-04-24 20:39:23
 * @LastEditTime: 2021-04-24 20:45:45
 * @LastEditors: Please set LastEditors
 * @Description: write article for markdown
 * @FilePath: \quickstart\src\routes\article\WriteArticle.js
 */
import React, { Component } from "react"
import Editormd from "../../components/editor/Editormd"
import style from "./writearticle.less"

class WriteArticle extends Component {
    render() {
        return (
            <div className={style["article-wrap"]}>
                <Editormd />
            </div>
        )
    }
}

export default WriteArticle