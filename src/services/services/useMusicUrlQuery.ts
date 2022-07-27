/*
 * @Author: Pacific_D
 * @Date: 2022-07-27 17:33:09
 * @LastEditTime: 2022-07-27 17:34:28
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\services\services\useMusicUrlQuery.ts
 */
import { METHODS } from "@/types"
import { useQuery } from "@tanstack/react-query"
import request from "../request"

/**
 * @description: 获取音乐URL
 * @param {number} id - 歌单id
 * @param {number} id - 音乐ID
 * @return {*}
 */
const useMusicUrl = (id: number, enabled = true) => {
    const queryKey = ["song", "url", id]
    const fetchData = () =>
        request(
            "/song/url",
            {
                id
            },
            METHODS.GET
        ).then(res => res.data.code === 200 && res.data)

    return useQuery(queryKey, fetchData, { enabled })
}

export default useMusicUrl
