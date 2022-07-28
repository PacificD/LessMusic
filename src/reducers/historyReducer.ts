/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 11:26:03
 * @LastEditTime: 2022-07-28 11:54:57
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\reducers\historyReducer.ts
 */
import { HistoryAction } from "@/types"

type History = Array<string>
const MAX_HISTORY_LEN = 10

/**
 * @description: 管理路由历史记录栈state的reducer
 * @param {History} history
 * @param {HistoryAction} action
 * @return {*}
 */
export default function historyReducer(history: History, action: HistoryAction): History {
    const { type, payload } = action,
        len = history.length
    switch (type) {
        case "PUSH":
            if (len === MAX_HISTORY_LEN) {
                history.shift()
                return [...history, payload!]
            } else {
                return [...history, payload!]
            }
        case "BACK":
            if (len === 0) {
                return history
            } else {
                history.pop()
                return [...history]
            }
        default:
            return history
    }
}
