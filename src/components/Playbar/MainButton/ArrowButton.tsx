/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 15:29:06
 * @LastEditTime: 2022-07-29 21:29:20
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\MainButton\ArrowButton.tsx
 */
import { useHover } from "ahooks"
import { FC, useMemo, useRef } from "react"
import colors from "@/style/colors"
import { Circle } from "@chakra-ui/react"
import { Direction } from "@/types"

const buttonShadow = "1px 1px 6px rgb(128 128 128 / 40%)"

const directionDegMapper = new Map<Direction, number>([
    [Direction.up, 90],
    [Direction.down, -90],
    [Direction.left, 0],
    [Direction.right, 180]
])

interface IProps {
    direction: Direction
    playNextOrPrev: (order?: "next" | "prev") => void
}

/**
 * @description: 上一首/下一首组件
 * @param {Direction} direction - 箭头旋转的方向： "up" | "down" | "left" | "right"
 * @return {*}
 */
const Arrow: FC<IProps> = ({ direction, playNextOrPrev }) => {
    const arrowRef = useRef<SVGSVGElement | null>(null),
        isHovering = useHover(arrowRef)

    const rotateDeg = useMemo(() => directionDegMapper.get(direction), [direction])

    const play = () => {
        playNextOrPrev(direction === Direction.left ? "prev" : "next")
    }

    return (
        <Circle
            _hover={{ borderColor: "theme.400" }}
            border="1px"
            borderColor="theme.200"
            onClick={play}
            padding={1}
            shadow={buttonShadow}
            size="32px"
            style={{ transform: `rotate(${rotateDeg}deg)` }}
        >
            <svg
                className="icon"
                height="100"
                p-id="1903"
                ref={arrowRef}
                style={{ cursor: "pointer" }}
                version="1.1"
                viewBox="0 0 1024 1024"
                width="100"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <style type="text/css"></style>
                </defs>
                <path
                    d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z"
                    fill={isHovering ? colors.theme[400] : colors.theme[200]}
                    p-id="1904"
                ></path>
            </svg>
        </Circle>
    )
}

export default Arrow
