/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 20:00:11
 * @LastEditTime: 2022-07-29 15:55:20
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\services\services\useTopSongQuery.ts
 */
import { IRes, METHODS } from "@/types"
import { useQuery } from "@tanstack/react-query"
import request from "../request"

/**
 * @description:获取新歌
 * @param {number} type - 地区，全部：0，华语：7，欧美：96，日本：8，韩国：16
 * @return {*}
 */
const useTopSongQuery = (type = 96) => {
    const queryKey = ["topSong"]
    const fetchData = () =>
        request<IRes>(
            "/top/song",
            {
                type
            },
            METHODS.GET
        ).then(res => res.data.code === 200 && res.data)

    return useQuery(queryKey, fetchData)
}

export default useTopSongQuery
