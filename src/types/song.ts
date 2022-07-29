/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 20:45:15
 * @LastEditTime: 2022-07-29 19:52:05
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\types\song.ts
 */
import { Artist, Album } from "@/types"

export type Song = {
    id: number
    artists: Array<Artist>
    mp3Url: string
    name: string
    album: Album
    duration: number
}
