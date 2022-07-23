/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 12:35:42
 * @LastEditTime: 2022-07-22 20:56:48
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\services\config.ts
 */
import { ENV, URL } from "@/constants"
import { AxiosRequestConfig } from "axios"

export const LOCALSTORAGE_TOKEN_KEY = "app_token"

const defaultConfig: AxiosRequestConfig = {
    baseURL: URL[ENV],
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    withCredentials: false, // 跨域携带cookie
    timeout: 3000,
    transformRequest: [
        data => {
            data = JSON.stringify(data)
            return data
        }
    ]
}

export default defaultConfig
