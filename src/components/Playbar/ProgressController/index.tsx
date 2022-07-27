/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 11:41:32
 * @LastEditTime: 2022-07-27 21:11:03
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\ProgressController\index.tsx
 */

import { Slider, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from "@chakra-ui/react"
import { FC, useState, useMemo } from "react"

interface IProps {
    currentTime: number
    duration: number
    audioRef: React.RefObject<HTMLAudioElement>
}

/**
 * @description: 音乐播放进度控制器
 * @return {*}
 */
const ProgressController: FC<IProps> = ({ currentTime, duration, audioRef }) => {
    const [isTooltip, setIsTooltip] = useState(false),
        [sliderValue, setSliderValue] = useState(0)

    const precentage = useMemo(
        () => +((currentTime / duration) * 100).toFixed(1),
        [currentTime, duration]
    )
    // TODO: 根据拖动百分比倒推回播放时间
    const toPosition = (v: number) => {
        const startTime = Math.round((v / 100) * duration)
        audioRef.current!.currentTime = startTime
        setSliderValue(v)
    }

    return (
        <Slider
            aria-label="slider-ex-4"
            onChange={v => toPosition(v)}
            onMouseEnter={() => setIsTooltip(true)}
            onMouseLeave={() => setIsTooltip(false)}
            position="absolute"
            top="0"
            transform="translate(0, -100%)"
            value={sliderValue}
            zIndex={1}
        >
            <SliderTrack bg="red.100">
                <SliderFilledTrack bg="theme.200" />
            </SliderTrack>
            <Tooltip
                bg="gray.100"
                color="black"
                hasArrow
                isOpen={isTooltip}
                label={`${sliderValue}%`}
                placement="top"
            >
                <SliderThumb bg="theme.800" boxSize={3} />
            </Tooltip>
        </Slider>
    )
}

export default ProgressController
