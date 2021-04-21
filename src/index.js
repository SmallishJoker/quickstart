import dva from 'dva';
import './index.css';
import 'font-awesome/less/font-awesome.less';
import { createBrowserHistory as createHistory } from "history";
import tools from "./utils/tools";

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
