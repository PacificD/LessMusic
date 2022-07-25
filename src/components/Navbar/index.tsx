/*
 * @Author: Pacific_D
 * @Date: 2022-07-23 15:18:21
 * @LastEditTime: 2022-07-25 10:23:24
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Navbar\index.tsx
 */

import { Box, Flex, Spacer, Image, Heading, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"
import ColorModeSwitcher from "../ColorModeSwitcher"
import CustomTooltip from "../CustomTooltip"
import Tablist from "./Tablist"

const Navbar: FC = () => {
    const textShadow = useColorModeValue(
        "2px 2px 4px rgb(128 128 128 / 60%)",
        "2px 2px 4px rgb(255 255 255 / 80%)"
    )
    return (
        <Flex alignItems="center" h="70px" mb={6} overflow="hidden" px={24} shadow="xl" w="full">
            <Image alt="LessMusic logo" src="./svg/logo.svg" w={12} />
            <Heading
                as="h1"
                className="heading"
                fontSize="25px"
                fontWeight="bold"
                ml={4}
                textShadow={textShadow}
            >
                LessMusic
            </Heading>
            <Tablist />
            <Spacer />
            <CustomTooltip
                Children={<ColorModeSwitcher justifySelf="flex-end" />}
                label="切换主题"
            ></CustomTooltip>
        </Flex>
    )
}

export default Navbar
