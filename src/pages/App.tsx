/*
 * @Author: Pacific_D
 * @Date: 2022-03-30 22:15:53
 * @LastEditTime: 2022-07-25 17:14:27
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\App.tsx
 */
import { FC, createContext } from "react"
import ViewRouter from "@/router/ViewRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/style/index.css"
import { Navbar, Playbar } from "@/components"
import { Box } from "@chakra-ui/react"

export const AppContext = createContext<{
    userInfo: string
}>({} as any)

const App: FC = () => {
    const queryClient = new QueryClient()
    let userInfo = "hello"

    return (
        <AppContext.Provider
            value={{
                userInfo
            }}
        >
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <Box py="70px">
                    <ViewRouter />
                </Box>
                <Playbar />
            </QueryClientProvider>
        </AppContext.Provider>
    )
}

export default App
