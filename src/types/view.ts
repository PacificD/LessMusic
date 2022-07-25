/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 10:12:40
 * @LastEditTime: 2022-07-25 15:48:40
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\types\view.ts
 */

export type TablistItem = {
    name: string
    route: string
}

export enum Direction {
    up = "UP",
    down = "DOWN",
    left = "LEFT",
    right = "RIGHT"
}
