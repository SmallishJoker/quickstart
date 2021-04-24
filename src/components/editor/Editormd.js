/*
 * @Author: joker
 * @Date: 2021-04-24 17:59:16
 * @LastEditTime: 2021-04-24 21:33:49
 * @LastEditors: Please set LastEditors
 * @Description: markdown editor
 * @FilePath: \quickstart\src\components\editor\Editormd.js
 */
import React, { Component } from "react"
import style from "./editor.less"
import Editor from 'for-editor'

class Editormd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handleChange(value) {
        this.setState({
            value
        })
        console.log(value);
    }

    render() {
        const { value } = this.state
        return (
            <div className={style["editor-wrap"]}>
                <Editor value={value} onChange={(value) => this.handleChange(value)} height="100%" />
            </div>
        )
    }
}

export default Editormd