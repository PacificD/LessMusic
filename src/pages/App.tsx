/*
 * @Author: Pacific_D
 * @Date: 2022-03-30 22:15:53
 * @LastEditTime: 2022-08-15 17:02:50
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\App.tsx
 */
import { FC, createContext } from "react"
import ViewRouter from "@/router/ViewRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/style/index.css"
import { Background, GoBack, Navbar, Playbar } from "@/components"
import { Box } from "@chakra-ui/react"
import { PlayingMusic } from "@/types"
import { addPlaylist, setPlayingMusic, useAppDispatch } from "@/store"

// ctx 只用来管理全局方法，不会引起rerender
export const ctx = createContext<{
    playMusic: (music: PlayingMusic) => void
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

    const dispatch = useAppDispatch()

    const playMusic = (music: PlayingMusic) => {
        dispatch(setPlayingMusic(music))
        dispatch(addPlaylist(music))
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <ctx.Provider
                value={{
                    playMusic
                }}
            >
                <Box position="relative" py="70px">
                    <GoBack />
                    <Background />
                    <ViewRouter />
                </Box>
                <Playbar />
            </ctx.Provider>
        </QueryClientProvider>
    )
}

export default App
