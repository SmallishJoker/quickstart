/*
 * @Author: joker
 * @Date: 2021-04-21 21:11:36
 * @LastEditTime: 2021-04-21 22:45:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \quickstart\src\utils\request.js
 */
import fetch from 'dva/fetch';
import { message } from "antd";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  
  if (response.status === 401) {
    message.error("用户未登录")
  }

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, {
    ...options, headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') || undefined
    }, ...{ credentials: "include" }
  }) // 后端node express处理跨域,credentials 发送cookie
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data))
    .catch(err => ({ err }));
}
