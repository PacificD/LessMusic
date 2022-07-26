/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 20:53:59
 * @LastEditTime: 2022-07-26 20:55:21
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\types\album.ts
 */
import { Artist } from "./artist"

export type Album = {
    artist: Artist
    name: string
    id: number
    picUrl: string
    description: string
}
