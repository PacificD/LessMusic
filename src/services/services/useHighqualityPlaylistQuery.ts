/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 20:26:40
 * @LastEditTime: 2022-07-22 20:38:24
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\services\services\useHighqualityPlaylistQuery.ts
 */
import { METHODS } from "@/types"
import { useQuery } from "@tanstack/react-query"
import request from "../request"

type HighqualityParams = {
    limit?: number // 取出的歌单数量
    before?: number // 分页参数，取上一页最后一个歌单的id
    cat?: number // 歌单相关标签的id
}

/**
 * @description: 获取精品歌单
 * @param {HighqualityParams} params
 * @return {*}
 */
const useHighqualityPlaylistQuery = (params?: HighqualityParams) => {
    const queryKey = ["playlist", "highquality"]
    const fetchData = () => {
        return request("/top/playlist/highquality", params ?? {}, METHODS.GET).then(
            res => res.data.code === 200 && res.data
        )
    }
    return useQuery(queryKey, fetchData)
}

export default useHighqualityPlaylistQuery
