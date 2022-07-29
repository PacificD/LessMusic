/*
 * @Author: Pacific_D
 * @Date: 2022-07-29 20:07:07
 * @LastEditTime: 2022-07-29 20:12:08
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\utils\calculateDuration.util.ts
 */

const calculateDuration = (duration: number): string => {
    const seconds = Math.round(duration / 1000)
    let min: string | number = Math.floor(seconds / 60)
    min = min < 10 ? "0" + min : min
    let sec = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60
    return min + ":" + sec
}

export default calculateDuration
