/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 15:21:40
 * @LastEditTime: 2022-07-29 21:16:09
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\MainButton\index.tsx
 */

import { Direction } from "@/types"
import { Stack } from "@chakra-ui/react"
import { FC } from "react"
import ArrowButton from "./ArrowButton"
import PauseButton from "./PauseButton"

interface IProps {
    audioRef: React.RefObject<HTMLAudioElement>
    isPlaying: boolean
    togglePlaying: () => void
    playNextOrPrev: (order?: "next" | "prev") => void
}

/**
 * @description: 控制歌曲暂停，切换上/下一首歌曲的组件
 * @return {*}
 */
const MainButton: FC<IProps> = ({ audioRef, isPlaying, togglePlaying, playNextOrPrev }) => {
    return (
        <Stack
            direction="row"
            left="50%"
            position="absolute"
            spacing={10}
            transform="translate(-50%, 0)"
        >
            <ArrowButton direction={Direction.left} playNextOrPrev={playNextOrPrev} />
            <PauseButton audioRef={audioRef} isPlaying={isPlaying} togglePlaying={togglePlaying} />
            <ArrowButton direction={Direction.right} playNextOrPrev={playNextOrPrev} />
        </Stack>
    )
}

export default MainButton
