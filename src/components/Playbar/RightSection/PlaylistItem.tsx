/*
 * @Author: Pacific_D
 * @Date: 2022-07-29 19:37:32
 * @LastEditTime: 2022-07-29 20:33:56
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\RightSection\PlaylistItem.tsx
 */
import { useCtxValue } from "@/hooks"
import { PlayingMusic } from "@/types"
import { calculateDuration } from "@/utils"
import { chakra, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsFillTrashFill } from "react-icons/bs"

const CBsFillTrashFill = chakra(BsFillTrashFill)

interface IProps {
    index: number
    music: PlayingMusic
    isPlaying: boolean
}

const PlaylistItem: FC<IProps> = ({ index, music, isPlaying }) => {
    const { playMusic, playlistDispatch } = useCtxValue(),
        bg = useColorModeValue("gray.200", "gray.700")
    const play = () => {
        playMusic(music)
    }

    const deleteFromPlaylist = (e: React.MouseEvent) => {
        e.stopPropagation()
        playlistDispatch({
            type: "DELETE",
            payload: music.id
        })
    }

    return (
        <Flex
            alignItems="center"
            bg={index % 2 === 0 ? bg : ""}
            cursor="pointer"
            fontSize="14px"
            height="36px"
            justifyContent="space-between"
            m="0"
            onClick={play}
            p="0 4px 0 16px"
            w="full"
        >
            <Text color={isPlaying ? "theme.200" : ""}>{index}.</Text>
            <Text
                color={isPlaying ? "theme.200" : ""}
                overflow="hidden"
                textAlign="center"
                textOverflow="ellipsis"
                w="154px"
                whiteSpace="nowrap"
            >
                {music.name}
            </Text>
            <Text
                color={isPlaying ? "theme.200" : ""}
                overflow="hidden"
                textAlign="center"
                textOverflow="ellipsis"
                w="150px"
                whiteSpace="nowrap"
            >
                {music.artists.map((artist, index: number) =>
                    index === music.artists.length - 1 ? artist.name : artist.name + ","
                )}
            </Text>
            <Text color={isPlaying ? "theme.200" : ""}>{calculateDuration(music.duration)}</Text>
            <CBsFillTrashFill
                _hover={{ color: "blue.300" }}
                color={isPlaying ? "theme.200" : "gray.500"}
                cursor="pointer"
                onClick={(e: React.MouseEvent) => deleteFromPlaylist(e)}
            />
        </Flex>
    )
}

export default PlaylistItem
