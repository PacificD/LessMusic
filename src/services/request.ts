/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 17:05:20
 * @LastEditTime: 2022-07-29 15:52:27
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\services\request.ts
 */
import createAxiosInstance from "./axios"
import { IRes, METHODS } from "@/types"
import { AxiosResponse } from "axios"
import { qs } from "@/utils"

function request<T>(
    url: string,
    params: object,
    method: METHODS = METHODS.GET
): Promise<AxiosResponse<T>> {
    const axiosInstance = createAxiosInstance()
    switch (method) {
        case METHODS.GET:
            return axiosInstance.get(qs(url, params))
        case METHODS.POST:
            return axiosInstance.post(url, params)
        case METHODS.DELETE:
            return axiosInstance.delete(url, params)
        case METHODS.PUT:
            return axiosInstance.put(url, params)
        case METHODS.PATCH:
            return axiosInstance.patch(url, params)
    }
}

export default request
