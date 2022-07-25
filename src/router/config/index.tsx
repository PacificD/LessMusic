/*
 * @Author: Pacific_D
 * @Date: 2022-07-19 10:16:22
 * @LastEditTime: 2022-07-25 21:17:40
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\router\config\index.tsx
 */
import {
    Home,
    Login,
    NotFound,
    PlayList,
    Playing,
    Rank,
    MV,
    Me,
    Search,
    Singer,
    Recommend
} from "@/pages"
import { useRoutes } from "react-router-dom"

/** 当路由结构复杂时，考虑重构为扁平化配置
 * @description: 路由配置
 * @return {*}
 */
const RouterConfig = () => {
    return useRoutes([
        // 主页
        {
            path: "",
            element: <Home />
        },
        // 登录 - 注册
        {
            path: "/login",
            element: <Login />
        },
        // 歌单详情
        {
            path: "/playlist/:id",
            element: <PlayList />
        },
        // 正在播放
        {
            path: "/playing/:id",
            element: <Playing />
        },
        // 排行榜
        {
            path: "/rank",
            element: <Rank />
        },
        // MV播放
        {
            path: "/mv/:id",
            element: <MV />
        },
        // 个人主页
        {
            path: "/me",
            element: <Me />
        },
        // 搜索
        {
            path: "/singer/:keyword",
            element: <Search />
        },
        // 歌手详情
        {
            path: "/singer/:id",
            element: <Singer />
        },
        // 推荐
        {
            path: "/Recommend",
            element: <Recommend />
        },
        // 404
        {
            path: "*",
            element: <NotFound />
        }
    ])
}

export default RouterConfig
