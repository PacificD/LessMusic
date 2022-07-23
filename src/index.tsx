/*
 * @Author: Pacific_D
 * @Date: 2022-03-30 21:36:37
 * @LastEditTime: 2022-07-23 10:24:25
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\index.tsx
 */
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import theme from "@/style/theme"
import App from "@/pages/App"

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript />
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
