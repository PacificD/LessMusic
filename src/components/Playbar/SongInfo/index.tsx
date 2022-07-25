/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 11:44:26
 * @LastEditTime: 2022-07-25 15:13:12
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\SongInfo\index.tsx
 */

import { Box, Image, Flex, Text, useColorModeValue, Center } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { BsArrowsAngleExpand } from "react-icons/bs"

interface IProps {
    cover: string
    name: string
    singerInfo: string | Array<string>
}

/**
 * @description: 展示正在播放的歌曲信息
 * @param {string} cover - 歌曲封面URL
 * @param {string} name - 歌曲名
 * @param {string | Array<string>} singerInfo - 歌手
 * @return {*}
 */
const SongInfo: FC<IProps> = ({ cover, name, singerInfo }) => {
    const singerList: Array<string> = useMemo(
            () => (Array.isArray(singerInfo) ? singerInfo : [singerInfo]),
            [singerInfo]
        ),
        textColor = useColorModeValue("gray.800", "gray.300")

    return (
        <Flex alignItems="center" overflow="hidden" w={80}>
            <Box cursor="pointer" position="relative" role="group" w={16}>
                <Center
                    _groupHover={{ opacity: 1 }}
                    bg="rgba(0,0,0,0.3)"
                    h="full"
                    opacity={0}
                    position="absolute"
                    rounded="lg"
                    transition="opacity 0.25s linear"
                    w="full"
                    zIndex="20"
                >
                    <BsArrowsAngleExpand color="white" fontSize="26" />
                </Center>
                <Image
                    alt="song cover"
                    fallbackSrc="./svg/404.svg"
                    rounded="lg"
                    src={cover}
                    w="full"
                />
            </Box>
            <Flex alignItems="start" flexDirection="column" justifyContent="center" ml="6" w="full">
                <Text cursor="pointer" fontSize="16px" fontWeight="bold">
                    {name}
                </Text>
                <Box w="full" whiteSpace="nowrap">
                    {singerList.map((singer, index) => (
                        <Text
                            _hover={{ color: "theme.200" }}
                            color={textColor}
                            cursor="pointer"
                            display="inline-block"
                            fontSize="12px"
                            key={singer}
                        >
                            {singer}
                            {index === singerList.length - 1 ? (
                                ""
                            ) : (
                                <Text display="inline-block" mx={1}>
                                    /
                                </Text>
                            )}
                        </Text>
                    ))}
                </Box>
            </Flex>
        </Flex>
    )
}

export default SongInfo
