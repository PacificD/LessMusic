/*
 * @Author: Pacific_D
 * @Date: 2022-07-27 17:58:00
 * @LastEditTime: 2022-07-28 11:48:48
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\types\music.ts
 */
import { Artist } from "./artist"

export type PlayingMusic = {
    id: number
    name: string
    cover: string
    artists: Array<Artist>
}
