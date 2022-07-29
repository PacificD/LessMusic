/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 19:47:28
 * @LastEditTime: 2022-07-29 20:42:10
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\Home\NewestMusic\index.tsx
 */
import { useTopSongQuery } from "@/services"
import { Song } from "@/types"
import { Flex, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"
import NewSong from "./NewSong"

const LIST_NUM = 5

/**
 * @description: 最新音乐
 * @return {*}
 */
const NewestMusic: FC = () => {
    const { data, isLoading, isError, error } = useTopSongQuery()
    if (isLoading) {
        return (
            <Text color="red.400" fontSize="2xl" fontWeight="bold">
                Loading ...
            </Text>
        )
    }
    if (isError || !data) {
        const msg = JSON.stringify(error)
        return <div>fetch error: {msg}</div>
    }

    return (
        <Flex flexDirection="column" w="352px">
            <Heading as="h3" fontSize="20px" fontWeight="bold" mb={2}>
                推荐新歌
            </Heading>
            {data.data.slice(0, LIST_NUM).map((song: Song, index: number) => (
                <NewSong
                    artists={song.artists}
                    cover={song.album.picUrl}
                    duration={song.duration}
                    id={song.id}
                    index={index}
                    key={song.id}
                    name={song.name}
                />
            ))}
        </Flex>
    )
}

export default NewestMusic
