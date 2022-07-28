/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 11:44:26
 * @LastEditTime: 2022-07-28 15:46:38
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\SongInfo\index.tsx
 */

import { Artist } from "@/types"
import { Box, Image, Flex, Text, useColorModeValue, Center } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { BsArrowsAngleExpand } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"

interface IProps {
    cover: string
    name: string
    singerInfo: Artist | Array<Artist>
}

/**
 * @description: 展示正在播放的歌曲信息
 * @param {string} cover - 歌曲封面URL
 * @param {string} name - 歌曲名
 * @param {string | Array<string>} singerInfo - 歌手
 * @return {*}
 */
const SongInfo: FC<IProps> = ({ cover, name, singerInfo }) => {
    const singerList: Array<Artist> = useMemo(
            () => (Array.isArray(singerInfo) ? singerInfo : [singerInfo]),
            [singerInfo]
        ),
        textColor = useColorModeValue("gray.800", "gray.300"),
        navigate = useNavigate(),
        location = useLocation()

    const togglePlaying = () => {
        location.pathname.indexOf("playing") === 1 ? navigate(-1) : navigate("/playing/38689014")
    }

    return (
        <Flex alignItems="center" overflow="hidden" w={80}>
            <Box
                cursor="pointer"
                onClick={togglePlaying}
                position="relative"
                role="group"
                userSelect="none"
                w={16}
            >
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
                <Text
                    cursor="pointer"
                    fontSize="16px"
                    fontWeight="bold"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    w="256px"
                    whiteSpace="nowrap"
                >
                    {name}
                </Text>
                <Box w="full" whiteSpace="nowrap">
                    {singerList.map((singer, index) => (
                        <Box
                            _hover={{ color: "theme.200" }}
                            color={textColor}
                            cursor="pointer"
                            display="inline-block"
                            fontSize="12px"
                            key={singer.id}
                        >
                            {singer.name}
                            {index === singerList.length - 1 ? (
                                ""
                            ) : (
                                <Text display="inline-block" mx={1}>
                                    /
                                </Text>
                            )}
                        </Box>
                    ))}
                </Box>
            </Flex>
        </Flex>
    )
}

export default SongInfo
