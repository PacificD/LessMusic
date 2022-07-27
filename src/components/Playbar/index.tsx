/*
 * @Author: Pacific_D
 * @Date: 2022-07-23 15:58:35
 * @LastEditTime: 2022-07-27 21:05:37
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\index.tsx
 */
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { FC, useMemo, useRef, useState } from "react"
import MainButton from "./MainButton"
import ProgressController from "./ProgressController"
import SongInfo from "./SongInfo"
import RightSection from "./RightSection"
import { useEventListener } from "ahooks"
import { useMusicUrlQuery } from "@/services"
import { IRes, PlayingInfo } from "@/types"
import { formatPlayTime } from "@/utils"

/**
 * @description: 底部音乐控件：播放进度，音量，呼出播放列表等
 * @return {*}
 */
const Playbar: FC = () => {
    const bg = useColorModeValue("white", "darkMode"),
        audioRef = useRef<HTMLAudioElement>(null)

    const { data, isLoading, isError, error } = useMusicUrlQuery(33894312)

    const playingInfo: PlayingInfo = useMemo(() => {
        if (isLoading || !data || (data as IRes).code !== 200)
            return {
                musicSrc: "./mp3",
                duration: audioRef.current?.duration as number
            }
        else {
            return {
                musicSrc: (data as IRes).data[0].url,
                duration: audioRef.current?.duration as number
            }
        }
    }, [data, isLoading])

    const [currentTime, setCurrentTime] = useState(0)

    useEventListener(
        "timeupdate",
        (e: any) => {
            setCurrentTime(e.target!.currentTime)
        },
        {
            target: audioRef
        }
    )

    return (
        <Box bottom={0} h="60px" position="fixed" w="full">
            <audio
                className="audio"
                ref={audioRef}
                src={playingInfo.musicSrc}
                style={{ display: "none" }}
            ></audio>
            <ProgressController
                audioRef={audioRef}
                currentTime={currentTime}
                duration={playingInfo.duration}
            />
            <Flex
                alignItems="center"
                bg={bg}
                flexDirection="row"
                h="60px"
                justifyContent="space-between"
                position="absolute"
                px={16}
                top="0"
                w="full"
            >
                <SongInfo
                    cover="https://bit.ly/dan-abramov"
                    name="fallback"
                    singerInfo={["Dan Abramov", "Evan You", "Nieve", "Nujabes"]}
                />
                <MainButton audioRef={audioRef} />
                <Text left="60%" position="absolute">
                    {formatPlayTime(currentTime)} / {formatPlayTime(playingInfo.duration)}
                </Text>
                <RightSection audioRef={audioRef} />
            </Flex>
        </Box>
    )
}

export default Playbar
