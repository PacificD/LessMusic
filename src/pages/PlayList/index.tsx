/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 20:57:28
 * @LastEditTime: 2022-07-29 11:46:43
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\PlayList\index.tsx
 */
import { usePlaylistTrackAllQuery } from "@/services"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { background, Text } from "@chakra-ui/react"
import request from "@/services/request"
import { METHODS } from "@/types"
import axios from "axios"
import useInfiniteScroll from "./useInfiniteScroll"

type QueryData = {
    code: number
    privileges: Array<any>
    songs: Array<any>
}

const PlayList = () => {
    // const { id } = useParams(),
    //     ref = useRef<HTMLDivElement>(null)
    // const { data: queryData, isLoading: isQueryLoading } = usePlaylistTrackAllQuery(+id!)

    const [pokemon, setPokemon] = useState([]),
        ref = useRef<HTMLDivElement>(null)

    const LIMIT = 5
    let offset = 0

    const loadPokemon = () => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
            .then((data: any) => {
                const newPokemon: any = []
                data.data.results.forEach((p: any) => newPokemon.push(p.name))
                setPokemon(oldPokemon => [...oldPokemon, ...newPokemon] as any)
                offset += LIMIT
            })
    }

    useInfiniteScroll(ref, loadPokemon, true)

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
            {pokemon.map((p, i) => (
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
                    {i}: {p}
                </div>
            ))}
        </div>
    )
}

export default PlayList
