/*
 * @Author: Pacific_D
 * @Date: 2022-03-30 21:51:13
 * @LastEditTime: 2022-07-22 18:15:44
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\services\axios.ts
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import defaultConfig, { LOCALSTORAGE_TOKEN_KEY } from "./config"
import { showMessage } from "./status"
import qs from "qs"
import { IRes } from "@/types"

// 请求Map，因为新版本axios不推荐使用cancelToken来取消请求，使用AbortController对象来实现
// 重复请求时调用value的AbortController.abort()方法取消请求。
const pendingRequest = new Map<string, AbortController>()

/**
 * @description: 获取请求Key
 * @param {AxiosRequestConfig} config
 * @return {string} requestKey
 */
const getReqKey = (config: AxiosRequestConfig): string => {
    const { method, url, params, data } = config
    // GET ---> params  POST ---> data
    const requestKey = [method, url, qs.stringify(params), qs.stringify(data)].join("&")
    return requestKey
}

/**
 * @description: 从Map中删除 requestKey
 * @param {string} requestKey
 * @return {*}
 */
const removeReqKey = (requestKey: string) => {
    pendingRequest.delete(requestKey)
}

/**
 * @description: 取消之前发送的请求
 * @param {string} requestKey
 * @return {*}
 */
const abortRequest = (requestKey: string) => {
    pendingRequest.get(requestKey)?.abort()
    removeReqKey(requestKey)
}

/**
 * @description: 生成Axios实例，使用config.ts的默认配置
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
    const abortController = new AbortController()

    const axiosInstance: AxiosInstance = axios.create({
        signal: abortController.signal,
        ...defaultConfig,
        ...config
    })

    // axios实例拦截请求
    axiosInstance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
            if (token && config.headers) {
                config.headers.authorization = `Bearer ${token}`
            }

            // 判断是否重复请求
            const requestKey = getReqKey(config)
            if (pendingRequest.has(requestKey)) {
                // 取消上次请求，并把上次请求从Map中删除
                console.log("cancel request! ")
                abortRequest(requestKey)
            }
            // 并把本次请求加入到Map中
            pendingRequest.set(requestKey, abortController)

            return config
        },
        (error: AxiosError) => {
            return Promise.reject(error)
        }
    )

    // axios实例拦截响应
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            if (!response) return

            const key = getReqKey(response.config)
            removeReqKey(key)

            if (response.headers.authorization) {
                localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, response.headers.authorization)
            } else {
                if (response.data && response.data.token) {
                    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, response.data.token)
                }
            }

            if (response.status === 200) {
                return response
            } else {
                showMessage(response.status)
                return response
            }
        },
        // 请求失败
        (error: AxiosError) => {
            const { response } = error
            if (response) {
                // 请求已发出，但是不在2xx的范围
                showMessage(response.status)
                return Promise.reject(response.data)
            } else {
                //TODO: 封装msg组件
                // alert("网络连接异常,请稍后再试!")
            }
        }
    )

    return axiosInstance
}

export default createAxiosInstance
