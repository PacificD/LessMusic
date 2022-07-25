/*
 * @Author: Pacific_D
 * @Date: 2022-07-23 10:12:24
 * @LastEditTime: 2022-07-25 17:19:10
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\style\theme.ts
 */
import { extendTheme } from "@chakra-ui/react"
import colors from "./colors"

const theme = extendTheme({
    colors,
    initialColorMode: "light",
    useSystemColorMode: false,
    layerStyles: {
        base: {
            bg: "gray.50",
            border: "2px solid",
            borderColor: "gray.500"
        },
        selected: {
            bg: "teal.500",
            color: "teal.700",
            borderColor: "orange.500"
        }
    },
    componentStyles: {
        button: {}
    },
    textStyles: {
        h1: {
            // you can also use responsive styles
            fontSize: ["48px", "72px"],
            fontWeight: "bold",
            lineHeight: "110%",
            letterSpacing: "-2%"
        },
        h2: {
            fontSize: ["36px", "48px"],
            fontWeight: "semibold",
            lineHeight: "110%",
            letterSpacing: "-1%"
        }
    }
})

export default theme
