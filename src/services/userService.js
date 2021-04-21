import request from '../utils/request';

exports.Login = function (options) {
    return request('https://jsonplaceholder.typicode.com/todos/1', options);
}
