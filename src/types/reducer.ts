/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 11:37:59
 * @LastEditTime: 2022-07-26 11:59:32
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\types\reducer.ts
 */
export type HistoryAction = {
    type: "PUSH" | "BACK"
    payload?: string
}
