/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 20:57:28
 * @LastEditTime: 2022-07-28 21:04:37
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\PlayList\index.tsx
 */
import { usePlaylistTrackAllQuery } from "@/services"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Text } from "@chakra-ui/react"
import request from "@/services/request"
import { METHODS } from "@/types"

type QueryData = {
    code: number
    privileges: Array<any>
    songs: Array<any>
}

const PlayList = () => {
    const { id } = useParams(),
        ref = useRef<HTMLDivElement>(null)

    const { data: queryData, isLoading: isQueryLoading } = usePlaylistTrackAllQuery(+id!)

    return (
        <div
            ref={ref}
            style={{
                width: "800px",
                height: "500px",
                overflow: "scroll",
                border: "1px solid",
                margin: "64px auto",
                padding: 12
            }}
        ></div>
    )
}

export default PlayList
