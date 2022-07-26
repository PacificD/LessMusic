/*
 * @Author: Pacific_D
 * @Date: 2022-03-30 22:15:53
 * @LastEditTime: 2022-07-26 18:43:42
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\App.tsx
 */
import { FC, createContext, useMemo } from "react"
import ViewRouter from "@/router/ViewRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/style/index.css"
import { Background, GoBack, Navbar, Playbar } from "@/components"
import { Box } from "@chakra-ui/react"

// TODO: 把CreateContext和Provider抽出一个文件，单独管理全局状态
export const ctx = createContext<{}>({} as any)

/**
 * @description: 顶层组件，管理全局状态
 * @return {*}
 */
const App: FC = () => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <ctx.Provider value={{}}>
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
            </ctx.Provider>
            <Playbar />
        </QueryClientProvider>
    )
}

export default App
