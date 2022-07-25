/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 16:26:13
 * @LastEditTime: 2022-07-25 17:08:46
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\RightSection\index.tsx
 */

import { FC, useState, useMemo } from "react"
import VolumeController from "../VolumeController"
import { RiPlayListFill } from "react-icons/ri"
import { BiSortDown } from "react-icons/bi"
import { ImLoop2 } from "react-icons/im"
import { FaRandom } from "react-icons/fa"
import { chakra, Stack, Box, Text, Flex } from "@chakra-ui/react"

const CRiPlayListFill = chakra(RiPlayListFill),
    CBiSortDown = chakra(BiSortDown),
    CImLoop2 = chakra(ImLoop2),
    CFaRandom = chakra(FaRandom),
    iconProperty = {
        _hover: { color: "theme.200" },
        cursor: "pointer",
        fontSize: "20"
    },
    modeMapper = new Map<number, [string, JSX.Element]>([
        [0, ["列表循环", <CBiSortDown key="0" {...iconProperty} fontSize="22" />]],
        [1, ["单曲循环", <CImLoop2 key="1" {...iconProperty} fontSize="16" />]],
        [2, ["随机播放", <CFaRandom key="2" {...iconProperty} fontSize="16" />]]
    ])

const RightSection: FC = () => {
    const [mode, setMode] = useState(0),
        modeInfo = useMemo(() => modeMapper.get(mode), [mode])

    const toggleMode = () => {
        setMode(mode => (mode === 2 ? 0 : mode + 1))
    }
    return (
        <Stack direction="row" spacing={6}>
            <Flex alignItems="center" mr={6}>
                <Text>{modeInfo![0]}</Text>
                <Box ml={2} onClick={toggleMode}>
                    {modeInfo![1]}
                </Box>
            </Flex>
            <CRiPlayListFill {...iconProperty} />
            <VolumeController width={44} />
        </Stack>
    )
}

export default RightSection
