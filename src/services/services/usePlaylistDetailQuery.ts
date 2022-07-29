/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 20:08:10
 * @LastEditTime: 2022-07-29 15:54:59
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\services\services\usePlaylistDetailQuery.ts
 */
import { IRes, METHODS } from "@/types"
import { useQuery } from "@tanstack/react-query"
import request from "../request"

/**
 * @description: 获取歌单详情
 * @param {number} id - 歌单id
 * @param {boolean} enabled - 控制是否请求的参数
 * @return {*}
 */
const usePlaylistDetailQuery = (id: number, enabled = false) => {
    const queryKey = ["playlist", "detail", id]
    const fetchData = () =>
        request<IRes>(
            "/playlist/detail",
            {
                id,
                cookie: cookie
            },
            METHODS.GET
        ).then(res => res.data.code === 200 && res.data)

    return useQuery(queryKey, fetchData, { enabled })
}

const cookie =
    "MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/neapi/feedback;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/wapi/feedback;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/eapi/feedback;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/weapi/feedback;;MUSIC_U=e2aef9427139efbe3b20ece62ee866f3e2ca9e577d1b50395eecebf243e2d69c993166e004087dd35437c30b2a689c99c6bff6bd96c51ffa516668d797ec59cd9f0b060817350cdead8b3b53860f12d6; Max-Age=1296000; Expires=Sat, 06 Aug 2022 12:48:47 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Sat, 06 Aug 2022 12:48:47 GMT; Path=/;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/neapi/feedback;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/eapi/clientlog;;__csrf=2be2545e6681ac42c3df536679644186; Max-Age=1296010; Expires=Sat, 06 Aug 2022 12:48:57 GMT; Path=/;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/openapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Fri, 22 Jul 2022 12:48:47 GMT; Path=/;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/api/feedback;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/api/clientlog;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/api/clientlog;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/api/feedback;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/wapi/feedback;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1458917760165; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/weapi/feedback;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1458917850042; Max-Age=2147483647; Expires=Wed, 09 Aug 2090 16:02:54 GMT; Path=/eapi/feedback;"

export default usePlaylistDetailQuery
