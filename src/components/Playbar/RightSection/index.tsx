/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 16:26:13
 * @LastEditTime: 2022-07-29 21:24:55
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\RightSection\index.tsx
 */

import React, { FC, useState, useMemo } from "react"
import VolumeController from "../VolumeController"
import { RiPlayListFill } from "react-icons/ri"
import { BiSortDown } from "react-icons/bi"
import { ImLoop2 } from "react-icons/im"
import { FaRandom } from "react-icons/fa"
import { chakra, Stack, Box, Text, Flex, Tooltip, useColorModeValue } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { useCtxValue } from "@/hooks"
import PlaylistItem from "./PlaylistItem"
import { BsFillTrashFill } from "react-icons/bs"

const animation = {
    initial: {
        width: 0,
        opacity: 0,

        scale: 0,
        x: 100,
        y: -256,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    },
    animate: {
        width: "464px",
        opacity: 1,
        scale: 1,
        x: -100,
        y: -560,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    },
    exit: {
        width: 0,
        opacity: 0,
        scale: 0,
        x: 100,
        y: -256,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    }
}

// TODO: transition: top
// TODO: tooggle -> top
const CRiPlayListFill = chakra(RiPlayListFill),
    CBiSortDown = chakra(BiSortDown),
    CImLoop2 = chakra(ImLoop2),
    CFaRandom = chakra(FaRandom),
    CBsFillTrashFill = chakra(BsFillTrashFill),
    iconProperty = {
        _hover: { color: "theme.200" },
        cursor: "pointer",
        fontSize: "20"
    },
    modeMapper = new Map<number, [string, JSX.Element]>([
        [0, ["列表循环", <CBiSortDown key="0" {...iconProperty} fontSize="22" />]],
        [1, ["单曲循环", <CImLoop2 key="1" {...iconProperty} fontSize="16" />]],
        [2, ["随机播放", <CFaRandom key="2" {...iconProperty} fontSize="16" />]]
    ])

interface IProps {
    mode: number
    setMode: React.Dispatch<React.SetStateAction<number>>
    audioRef: React.RefObject<HTMLAudioElement>
}

/**
 * @description: Playbar右侧组件
 * @return {*}
 */
const RightSection: FC<IProps> = ({ mode, setMode, audioRef }) => {
    const [isPlayList, setIsPlayList] = useState(false),
        modeInfo = modeMapper.get(mode),
        bg = useColorModeValue("white", "darkMode"),
        { playlist, playlistDispatch, playingMusic } = useCtxValue()

    /**
     * @description: 切换播放模式
     * @return {*}
     */
    const toggleMode = () => {
        setMode(mode => (mode === 2 ? 0 : mode + 1))
    }

    /**
     * @description: 清空播放列表
     * @return {*}
     */
    const deleteAll = (e: React.MouseEvent) => {
        e.stopPropagation()
        playlistDispatch({
            type: "CLEAR"
        })
    }

    return (
        <Stack direction="row" position="relative" spacing={6} userSelect="none">
            <Flex alignItems="center" mr={6}>
                <Text>{modeInfo![0]}</Text>
                <Box ml={2} onClick={toggleMode}>
                    {modeInfo![1]}
                </Box>
            </Flex>
            <AnimatePresence exitBeforeEnter>
                {isPlayList ? (
                    <motion.div
                        animate="animate"
                        exit="exit"
                        initial="initial"
                        style={{ position: "absolute", margin: 0 }}
                        variants={animation}
                    >
                        <Stack
                            bg={bg}
                            h="520px"
                            shadow="2px 2px 16px rgb(128 128 128 / 40%)"
                            spacing="0"
                        >
                            <Flex
                                alignItems="center"
                                boxSizing="border-box"
                                cursor="e-resize"
                                h="48px"
                                justifyContent="space-between"
                                mb="1"
                                onClick={() => setIsPlayList(false)}
                                padding="16px"
                                shadow="0 1px 2px rgb(128 128 128 / 35%)"
                                w="full"
                            >
                                <Text>播放列表</Text>
                                <CBsFillTrashFill
                                    _hover={{ color: "theme.200" }}
                                    color="gray.500"
                                    cursor="pointer"
                                    onClick={(e: React.MouseEvent) => deleteAll(e)}
                                />
                            </Flex>
                            <Box
                                className="playlist-content"
                                h="full"
                                overflowX="hidden"
                                overflowY="scroll"
                                w="full"
                            >
                                {playlist.map((music, index: number) => (
                                    <PlaylistItem
                                        index={index + 1}
                                        isPlaying={music.id === playingMusic.id}
                                        key={music.id}
                                        music={music}
                                    />
                                ))}
                            </Box>
                        </Stack>
                    </motion.div>
                ) : (
                    ""
                )}
            </AnimatePresence>
            <Tooltip bg="gray.100" color="black" hasArrow label="播放列表">
                <Box>
                    <CRiPlayListFill
                        {...iconProperty}
                        onClick={() => setIsPlayList(isPlayList => !isPlayList)}
                    />
                </Box>
            </Tooltip>
            <VolumeController audioRef={audioRef} width={44} />
        </Stack>
    )
}

export default RightSection
