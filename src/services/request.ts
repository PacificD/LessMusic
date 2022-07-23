/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 17:05:20
 * @LastEditTime: 2022-07-22 20:02:51
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\services\request.ts
 */
import createAxiosInstance from "./axios"
import { IRes, METHODS } from "@/types"
import { AxiosResponse } from "axios"
import { qs } from "@/utils"

const request = (
    url: string,
    params: object,
    method: METHODS = METHODS.GET
): Promise<AxiosResponse<IRes>> => {
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
