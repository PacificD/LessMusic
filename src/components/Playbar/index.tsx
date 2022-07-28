/*
 * @Author: Pacific_D
 * @Date: 2022-07-23 15:58:35
 * @LastEditTime: 2022-07-28 16:26:31
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\index.tsx
 */
import { Box, Flex, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { FC, useMemo, useRef, useState } from "react"
import MainButton from "./MainButton"
import ProgressController from "./ProgressController"
import SongInfo from "./SongInfo"
import RightSection from "./RightSection"
import { useMusicUrlQuery } from "@/services"
import { IRes } from "@/types"
import { formatPlayTime } from "@/utils"
import { useCtxValue } from "@/hooks"

/**
 * @description: 底部音乐控件：播放进度，音量，呼出播放列表等
 * @return {*}
 */
const Playbar: FC = () => {
    const bg = useColorModeValue("white", "darkMode"),
        [currentTime, setCurrentTime] = useState(0),
        { playingMusic } = useCtxValue(),
        toast = useToast()

    const audioRef = useRef<HTMLAudioElement>(null),
        [isPlaying, setIsPlaying] = useState(false)

    const { data, isLoading, isError, error } = useMusicUrlQuery(playingMusic.id)

    const musicSrc: string = useMemo(
        () =>
            isLoading || !data || (data as IRes).code !== 200
                ? "./mp3"
                : (data as IRes).data[0].url,

        [data, isLoading]
    )

    const duration: number = useMemo(
        () => Math.round(audioRef.current?.duration ?? 0),
        [audioRef.current?.duration]
    )

    /**
     * @description: 播放时间更新事件
     * @param {any} e
     * @return {*}
     */
    const playTimeUpdate = (e: any) => {
        setCurrentTime(Math.round(e.target!.currentTime))
    }

    /**
     * @description: 资源加载完毕的回调
     * @return {*}
     */
    const mediaOnLoaded = () => {
        audioRef.current!.play()
        setIsPlaying(true)
    }

    /**
     * @description: 切换播放状态：播放/暂停
     * @return {*}
     */
    const togglePlaying = () => {
        if (isPlaying) {
            setIsPlaying(false)
            audioRef.current!.pause()
        } else {
            setIsPlaying(true)
            audioRef?.current!.play()
        }
    }

    const playEnded = () => {
        console.log("end!")
    }

    if (isError) {
        toast({
            title: "网络出错" + error,
            description: "请检查网络或联系管理员",
            status: "error",
            duration: 6000,
            position: "top",
            isClosable: true
        })
    }

    return (
        <Box bottom={0} h="60px" position="fixed" w="full">
            <audio
                className="audio"
                onEnded={playEnded}
                onLoadedMetadata={mediaOnLoaded}
                onTimeUpdate={e => playTimeUpdate(e)}
                ref={audioRef}
                src={musicSrc}
                style={{ display: "none" }}
            ></audio>
            <ProgressController
                audioRef={audioRef}
                currentTime={currentTime}
                duration={duration}
                setIsPlaying={setIsPlaying}
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
                    cover={playingMusic.cover}
                    name={playingMusic.name}
                    singerInfo={playingMusic.artists}
                />
                <MainButton
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    togglePlaying={togglePlaying}
                />
                <Text left="60%" position="absolute">
                    {formatPlayTime(currentTime)} / {formatPlayTime(duration)}
                </Text>
                <RightSection audioRef={audioRef} />
            </Flex>
        </Box>
    )
}

export default Playbar
