/*
 * @Author: Pacific_D
 * @Date: 2022-03-30 21:36:37
 * @LastEditTime: 2022-08-15 17:04:03
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\index.tsx
 */
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import theme from "@/style/theme"
import App from "@/pages/App"
import { Provider } from "react-redux"
import store from "@/store"

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
