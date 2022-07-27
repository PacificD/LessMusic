/*
 * @Author: Pacific_D
 * @Date: 2022-07-27 18:01:21
 * @LastEditTime: 2022-07-27 18:22:02
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\utils\formatPlayTime.ts
 */

/**
 * @description: 将267.258的秒格式时间化成 04:27 的时间格式
 * @param {number} time
 * @return {string}
 */
const formatPlayTime = (time: number | null | undefined): string => {
    if (!time) return "00:00"
    const timeRounded = Math.round(time)
    let min: string | number = Math.floor(timeRounded / 60)
    if (min >= 1) {
        min = min < 10 ? "0" + min : min
        let second: string | number = timeRounded % 60
        second = second < 10 ? "0" + second : second
        return min + ":" + second
    } else {
        return "00:" + (timeRounded < 10 ? "0" + timeRounded : timeRounded)
    }
}

export default formatPlayTime
