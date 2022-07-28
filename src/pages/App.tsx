/*
 * @Author: Pacific_D
 * @Date: 2022-03-30 22:15:53
 * @LastEditTime: 2022-07-28 20:23:07
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\App.tsx
 */
import { FC, createContext, useMemo, useContext, useReducer, useRef, useState } from "react"
import ViewRouter from "@/router/ViewRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/style/index.css"
import { Background, GoBack, Navbar, Playbar } from "@/components"
import { Box } from "@chakra-ui/react"
import { PlayingMusic } from "@/types"

// TODO: 把CreateContext和Provider抽出一个文件，单独管理全局状态
export const ctx = createContext<{
    playingMusic: PlayingMusic
    playMusic: React.Dispatch<PlayingMusic>
}>({} as any)

/**
 * @description: 顶层组件，管理全局状态
 * @return {*}
 */
const App: FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })

    const [playingMusic, playMusic] = useReducer(
        (playingMusic: PlayingMusic, newMusic: PlayingMusic) => newMusic,
        {
            id: 29143665,
            name: "Walk on By-acro jazz laboratories remix-",
            cover: "http://p1.music.126.net/OE0BGTVHuxIoZdCr47xO5w==/2923601420161977.jpg?param=130y130",
            artists: [
                {
                    id: 13886,
                    name: "Acro Jazz Laboratories",
                    picUrl: "http://p1.music.126.net/sWLvKMtXJLr2i0LLy5njTw==/801543976672489.jpg?param=640y300"
                }
            ]
        } as PlayingMusic
    )

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <ctx.Provider value={{ playingMusic, playMusic }}>
                <Box position="relative" py="70px">
                    <GoBack />
                    <Background />
                    {useMemo(
                        () => (
                            <ViewRouter />
                        ),
                        []
                    )}
                </Box>
                {/* <Playbar /> */}
            </ctx.Provider>
        </QueryClientProvider>
    )
}

export default App
