/*
 * @Author: joker
 * @Date: 2021-04-21 21:11:36
 * @LastEditTime: 2021-04-24 17:19:57
 * @LastEditors: Please set LastEditors
 * @Description: entry file
 * @FilePath: \quickstart\src\index.js
 */
import dva from 'dva';
import './index.css';
import 'font-awesome/less/font-awesome.less';
import { createBrowserHistory as createHistory } from "history";
import "./utils/tools";

// 1. Initialize
const app = dva({
    history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
