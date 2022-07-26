/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 16:31:01
 * @LastEditTime: 2022-07-26 19:32:29
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Background\index.tsx
 */

import { Flex, Heading, useColorModeValue, Image, Box } from "@chakra-ui/react"
import { FC } from "react"

const Background: FC = () => {
    const bg = useColorModeValue("url(/svg/confetti-light.svg)", "url(/svg/confetti-dark.svg)")

    return (
        <Flex
            alignItems="center"
            bgImage={bg}
            bgPosition="center"
            // display={isShow}
            flexDirection="column"
            h="calc(100vh - 130px)"
            id="background"
            justifyContent="space-between"
            left="0"
            overflow="hidden"
            position="absolute"
            top="70px"
            w="full"
            zIndex="-1"
        >
            <Box
                backdropFilter="blur(2px)"
                bgColor="rgba(255,255,255,0.1)"
                h="full"
                left="0"
                position="absolute"
                top="0"
                w="full"
            ></Box>
            <Heading
                as="h4"
                bgClip="text"
                bgGradient="linear(to-l, theme.100, theme.600)"
                fontSize="7xl"
                mt={16}
                zIndex="1"
            >
                Less Music
            </Heading>
            <Image
                alt="mello"
                left="50%"
                position="absolute"
                src="./svg/mello.svg"
                top="20%"
                transform="translate(-50%,0)"
                w="lg"
                zIndex="1"
            ></Image>
        </Flex>
    )
}

export default Background
