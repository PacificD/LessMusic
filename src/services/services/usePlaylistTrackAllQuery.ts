/*
 * @Author: Pacific_D
 * @Date: 2022-07-28 20:02:40
 * @LastEditTime: 2022-07-29 15:55:06
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\services\services\usePlayListTrackAllQuery.ts
 */

import { IRes, METHODS } from "@/types"
import { useQuery } from "@tanstack/react-query"
import request from "../request"

/**
 * @description:获取歌单的全部歌曲
 * @param {number} id - 歌单ID
 * @return {*}
 */
const usePlaylistTrackAllQuery = (id: number) => {
    const queryKey = ["topSong"]
    const fetchData = () =>
        request<IRes>(
            "/playlist/track/all",
            {
                id
            },
            METHODS.GET
        ).then(res => res.data.code === 200 && res.data)

    return useQuery(queryKey, fetchData)
}

export default usePlaylistTrackAllQuery
