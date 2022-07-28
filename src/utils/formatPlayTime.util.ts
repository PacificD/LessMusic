/*
 * @Author: Pacific_D
 * @Date: 2022-07-27 18:01:21
 * @LastEditTime: 2022-07-28 10:29:55
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\utils\formatPlayTime.util.ts
 */

/**
 * @description: 将267的秒格式时间化成 04:27 的时间格式
 * @param {number} time - Math.round 后的时间
 * @return {string}
 */
const formatPlayTime = (time: number | null | undefined): string => {
    if (!time) return "00:00"
    let min: string | number = Math.floor(time / 60)
    if (min >= 1) {
        min = min < 10 ? "0" + min : min
        let second: string | number = time % 60
        second = second < 10 ? "0" + second : second
        return min + ":" + second
    } else {
        return "00:" + (time < 10 ? "0" + time : time)
    }
}

export default formatPlayTime
