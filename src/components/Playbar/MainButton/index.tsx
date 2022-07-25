/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 15:21:40
 * @LastEditTime: 2022-07-25 16:23:10
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\MainButton\index.tsx
 */

import { Direction } from "@/types"
import { Stack } from "@chakra-ui/react"
import { FC } from "react"
import ArrowButton from "./ArrowButton"
import PauseButton from "./PauseButton"

/**
 * @description: 控制歌曲暂停，切换上/下一首歌曲的组件
 * @return {*}
 */
const MainButton: FC = () => {
    return (
        <Stack
            direction="row"
            left="50%"
            ml={8}
            position="absolute"
            spacing={10}
            transform="translate(-50%, 0)"
        >
            <ArrowButton direction={Direction.left} />
            <PauseButton />
            <ArrowButton direction={Direction.right} />
        </Stack>
    )
}

export default MainButton
