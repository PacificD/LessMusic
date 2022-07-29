/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 11:37:59
 * @LastEditTime: 2022-07-29 17:21:51
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\types\reducer.ts
 */
import { PlaylistMusic } from "@/types"

export type HistoryAction = {
    type: "PUSH" | "BACK"
    payload?: string
}

export type PlaylistAction = {
    type: "ADD" | "DELETE" | "CLEAR"
    payload?: PlaylistMusic | Array<PlaylistMusic> | number | Array<number>
}
