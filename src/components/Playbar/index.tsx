/*
 * @Author: Pacific_D
 * @Date: 2022-07-23 15:58:35
 * @LastEditTime: 2022-07-25 16:26:47
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\index.tsx
 */
import { Box, Flex } from "@chakra-ui/react"
import { FC } from "react"
import MainButton from "./MainButton"
import ProgressController from "./ProgressController"
import SongInfo from "./SongInfo"
import RightSection from "./RightSection"

/**
 * @description: 底部音乐控件：播放进度，音量，呼出播放列表等
 * @return {*}
 */
const Playbar: FC = () => {
    return (
        <Box bottom={0} position="fixed" w="full">
            <ProgressController />
            <Flex
                alignItems="center"
                flexDirection="row"
                h="60px"
                justifyContent="space-between"
                px={16}
                w="full"
            >
                <SongInfo
                    cover="https://bit.ly/dan-abramov"
                    name="fallback"
                    singerInfo={["Dan Abramov", "Evan You", "Nieve", "Nujabes"]}
                />
                <MainButton />
                <RightSection />
            </Flex>
        </Box>
    )
}

export default Playbar
