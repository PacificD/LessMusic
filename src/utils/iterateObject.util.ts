/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 21:02:12
 * @LastEditTime: 2022-07-22 21:03:48
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\utils\iterateObject.util.ts
 */
type ObjectType = {
    [key: string]: any
}

const iterateObject = (obj: ObjectType, fn: Function) => {
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj)
        }
    }
}

export default iterateObject
