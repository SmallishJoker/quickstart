import request from '../utils/request';

exports.Login = function () {
    return request('https://jsonplaceholder.typicode.com/todos/1');
}
