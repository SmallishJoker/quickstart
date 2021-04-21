import React from "react";
import { message } from "antd";
import md5 from "js-md5";

React.Component.prototype.$message = message; // 在原型上添加antd的message方法
React.Component.prototype.$md5 = md5;