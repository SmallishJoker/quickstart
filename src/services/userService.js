/*
 * @Author: your name
 * @Date: 2021-04-21 21:11:36
 * @LastEditTime: 2021-04-21 22:44:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \quickstart\src\services\userService.js
 */
import request from '../utils/request';

exports.Login = function (options) {
    return request('http://localhost:3001/login', options);
}
