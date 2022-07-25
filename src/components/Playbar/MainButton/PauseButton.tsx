/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 16:10:40
 * @LastEditTime: 2022-07-25 16:31:43
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\MainButton\PauseButton.tsx
 */

import { chakra, Circle } from "@chakra-ui/react"
import { FC, useState } from "react"
import { RiPauseMiniFill, RiPlayFill } from "react-icons/ri"

const buttonShadow = "1px 1px 6px rgb(128 128 128 / 40%)",
    CRiPauseMiniFill = chakra(RiPauseMiniFill),
    CRiPlayFill = chakra(RiPlayFill)

/**
 * @description: 歌曲暂停组件
 * @return {*}
 */
const PauseButton: FC = () => {
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlaying = () => setIsPlaying(isPlaying => !isPlaying)

    return (
        <Circle
            _hover={{ borderColor: "theme.400" }}
            border="1px"
            borderColor="theme.200"
            cursor="pointer"
            onClick={togglePlaying}
            role="group"
            shadow={buttonShadow}
            size="32px"
        >
            {isPlaying ? (
                <CRiPauseMiniFill
                    _groupHover={{ color: "theme.400" }}
                    color="theme.200"
                    fontSize={26}
                />
            ) : (
                <CRiPlayFill _groupHover={{ color: "theme.400" }} color="theme.200" fontSize={26} />
            )}
        </Circle>
    )
}

export default PauseButton
