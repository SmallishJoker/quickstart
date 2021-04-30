
import HomePage from "./home/HomePage"
import Login from "./user/Login"
import WriteArticle from "./article/WriteArticle"
import NotFound from "./404/404"

export default [
    { path: "/", name: "App", component: HomePage, auth: false },
    { path: "/login", name: "Login", component: Login },
    { path: "/write", name: "WriteArticle", component: WriteArticle, auth: true },
    { path: "/404", name: "404", component: NotFound },
]