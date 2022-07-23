/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 19:59:11
 * @LastEditTime: 2022-07-22 20:01:45
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\utils\qs.ts
 */

/**
 * @description: 将请求URL与参数序列化为query string
 * @param {string} url
 * @param {object} params
 * @return {*}
 */
const qs = (url: string, params: object): string => {
    url += "?"
    for (let [key, value] of Object.entries(params)) {
        url += `${key}=${value}&`
    }
    url = url.substring(0, url.length - 1)
    return url
}

export default qs
