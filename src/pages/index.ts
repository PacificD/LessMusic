/*
 * @Author: Pacific_D
 * @Date: 2022-07-19 10:12:26
 * @LastEditTime: 2022-07-25 21:17:11
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\index.ts
 */
import { lazy } from "react"

export const Login = lazy(() => import("./Login"))
export const Home = lazy(() => import("./Home"))
export const NotFound = lazy(() => import("./NotFound"))
export const Rank = lazy(() => import("./Rank"))
export const Search = lazy(() => import("./Search"))
export const MV = lazy(() => import("./MV"))
export const Me = lazy(() => import("./Me"))
export const Singer = lazy(() => import("./Singer"))
export const Playing = lazy(() => import("./Playing"))
export const PlayList = lazy(() => import("./PlayList"))
export const Recommend = lazy(() => import("./Recommend"))
