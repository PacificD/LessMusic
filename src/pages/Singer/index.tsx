/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 21:01:24
 * @LastEditTime: 2022-07-29 12:03:55
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\Singer\index.tsx
 */
import { usePlaylistTrackAllQuery } from "@/services"
import { FC, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import useInfiniteScroll from "../PlayList/useInfiniteScroll"

const Singer: FC = () => {
    const { id } = useParams(),
        ref = useRef<HTMLDivElement>(null)

    const LIMIT = 5,
        offset = useRef(0)
    const [resData, setResData] = useState<any>([])

    const { data: queryData, isLoading: isQueryLoading } = usePlaylistTrackAllQuery(+id!)

    const loadMore = () => {
        if (!queryData || offset.current >= (queryData as any).songs.length) {
            return
        }

        const data = [...(queryData as any).songs].slice(offset.current, offset.current + LIMIT)
        offset.current += LIMIT
        setResData((oldData: any) => [...oldData, ...data])
    }

    useInfiniteScroll(ref, loadMore, isQueryLoading)

    return (
        <div
            ref={ref}
            style={{
                width: "800px",
                height: "500px",
                overflowY: "scroll",
                overflowX: "hidden",
                border: "1px solid",
                margin: "64px auto",
                padding: 12,
                display: "flex",
                flexDirection: "column"
            }}
        >
            {resData.map((p: any, i: number) => (
                <div
                    key={i + p}
                    style={{
                        width: "100%",
                        padding: "48px 0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    {i + 1}: {p.name}, {p.id}
                </div>
            ))}
        </div>
    )
}

export default Singer
