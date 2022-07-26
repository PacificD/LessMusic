/*
 * @Author: Pacific_D
 * @Date: 2022-07-23 15:18:21
 * @LastEditTime: 2022-07-26 15:21:41
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Navbar\index.tsx
 */

import { Flex, Spacer, Image, Heading, useColorModeValue, chakra } from "@chakra-ui/react"
import { FC } from "react"
import ColorModeSwitcher from "../ColorModeSwitcher"
import CustomTooltip from "../CustomTooltip"
import Tablist from "./Tablist"
import { BsInfoCircle } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const CBsInfoCircle = chakra(BsInfoCircle)

const Navbar: FC = () => {
    const textShadow = useColorModeValue(
            "2px 2px 4px rgb(128 128 128 / 60%)",
            "2px 2px 4px rgb(255 255 255 / 80%)"
        ),
        bg = useColorModeValue("white", "darkMode"),
        navigate = useNavigate()

    const toHomePage = () => navigate("/")

    return (
        <Flex
            alignItems="center"
            bg={bg}
            h="70px"
            overflow="hidden"
            position="fixed"
            px={24}
            shadow="xl"
            userSelect="none"
            w="full"
            zIndex={20}
        >
            <Image
                alt="LessMusic logo"
                cursor="pointer"
                fallbackSrc="./svg/404.svg"
                onClick={toHomePage}
                src="./svg/logo.svg"
                w={12}
            />
            <Heading
                as="h1"
                className="heading"
                fontSize="25px"
                fontWeight="bold"
                ml={4}
                onClick={toHomePage}
                textShadow={textShadow}
            >
                LessMusic
            </Heading>
            <Tablist />
            <Spacer />
            <CBsInfoCircle cursor="pointer" fontSize={20} />
            <CustomTooltip
                Children={<ColorModeSwitcher justifySelf="flex-end" />}
                label="切换主题"
            ></CustomTooltip>
        </Flex>
    )
}

export default Navbar
