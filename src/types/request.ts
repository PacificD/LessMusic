/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 17:07:13
 * @LastEditTime: 2022-07-22 21:56:03
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\types\request.ts
 */
export enum METHODS {
    "GET" = "get",
    "POST" = "post",
    "PUT" = "put",
    "DELETE" = "delete",
    "PATCH" = "patch"
}

export default interface IRes {
    code: number
    [key: string]: any
}
