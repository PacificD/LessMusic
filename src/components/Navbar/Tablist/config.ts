/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 10:08:15
 * @LastEditTime: 2022-07-29 12:26:20
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Navbar\Tablist\config.ts
 */
import { TablistItem } from "@/types/view"

const config: Array<TablistItem> = [
    {
        name: "发现音乐",
        route: "/"
    },
    {
        name: "个人主页",
        route: "/me"
    },
    {
        name: "排行榜",
        route: "/rank"
    },
    {
        name: "歌手",
        route: "/singer/3200013727"
    },
    {
        name: "歌单",
        route: "/playlist/3200013727"
    },
    {
        name: "MV",
        route: "/mv/14547812"
    }
]

export default config
