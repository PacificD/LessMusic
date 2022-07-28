/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 15:21:40
 * @LastEditTime: 2022-07-28 11:29:46
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
}

/**
 * @description: 控制歌曲暂停，切换上/下一首歌曲的组件
 * @return {*}
 */
const MainButton: FC<IProps> = ({ audioRef, isPlaying, togglePlaying }) => {
    return (
        <Stack
            direction="row"
            left="50%"
            position="absolute"
            spacing={10}
            transform="translate(-50%, 0)"
        >
            <ArrowButton direction={Direction.left} />
            <PauseButton audioRef={audioRef} isPlaying={isPlaying} togglePlaying={togglePlaying} />
            <ArrowButton direction={Direction.right} />
        </Stack>
    )
}

export default MainButton
