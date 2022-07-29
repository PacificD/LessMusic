/*
 * @Author: Pacific_D
 * @Date: 2022-07-29 12:38:43
 * @LastEditTime: 2022-07-29 15:34:33
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\types\MV.ts
 */
import { Artist } from "./artist"

export type Resolution = {
    size: number
    br: number
    point: number
}

export type MVDetail = {
    code: number
    data: {
        artistId: number
        artistName: string
        artists: Array<Artist>
        brs: Array<Resolution>
        commentCount: number
        cover: string
        desc: string
        duration: number
        id: number
        name: string
        playCount: number
        shareCount: number
        publishTime: string
    }
    urls: Array<[number, string]>
}
