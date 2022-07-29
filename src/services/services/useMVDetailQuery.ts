/*
 * @Author: Pacific_D
 * @Date: 2022-07-29 12:27:08
 * @LastEditTime: 2022-07-29 15:57:08
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\services\services\useMVDetailQuery.ts
 */
import { METHODS, Resolution, MVDetail, IRes } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import request from "../request"

/**
 * @description: 获取MV详情(包括各个分辨率的播放地址)
 * @param {number} mvid
 * @return {*}
 */
const useMVDetailQuery = (mvid: number) => {
    const queryKey = ["MV", "detail"]

    const resolutionRadio: Array<number> = [],
        url = new Map<number, string>([])

    const fetchData = () =>
        request<MVDetail>(
            "/mv/detail",
            {
                mvid
            },
            METHODS.GET
        )
            .then(res => {
                if (res.data.code === 200) {
                    // 获取MV的所有分辨率
                    res.data.data.brs.forEach((br: Resolution) => resolutionRadio.push(br.br))
                    return res.data
                } else {
                    return res
                }
            })
            .then(async mvDetail => {
                await Promise.all(
                    // 获取所有分辨率的MV播放地址
                    resolutionRadio.map(r =>
                        request("/mv/url", {
                            id: mvid,
                            r
                        }).then(res => {
                            if ((res.data as IRes).code === 200) {
                                url.set(r, (res.data as IRes).data.url)
                            }
                        })
                    )
                ).then(
                    // 插入res中返回
                    () => Object.assign(mvDetail, { urls: Array.from(url) })
                )
                return mvDetail
            })
    return useQuery(queryKey, fetchData)
}

export default useMVDetailQuery
