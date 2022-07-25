/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 11:41:32
 * @LastEditTime: 2022-07-25 11:42:36
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\ProgressController\index.tsx
 */

import { Slider, SliderTrack, SliderFilledTrack, Tooltip, SliderThumb } from "@chakra-ui/react"
import { FC, useState } from "react"

/**
 * @description: 音乐播放进度控制器
 * @return {*}
 */
const ProgressController: FC = () => {
    const [isTooltip, setIsTooltip] = useState(false),
        [sliderValue, setSliderValue] = useState(5)
    return (
        <Slider
            aria-label="slider-ex-4"
            defaultValue={5}
            onChange={v => setSliderValue(v)}
            onMouseEnter={() => setIsTooltip(true)}
            onMouseLeave={() => setIsTooltip(false)}
            position="absolute"
            top={0}
            transform="translate(0, 50%)"
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
