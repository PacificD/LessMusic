/*
 * @Author: Pacific_D
 * @Date: 2022-07-23 15:58:35
 * @LastEditTime: 2022-07-26 19:09:06
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Playbar\index.tsx
 */
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react"
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
    const bg = useColorModeValue("white", "darkMode")

    return (
        <Box bottom={0} h="60px" position="fixed" w="full">
            <ProgressController />
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
                    cover="https://bit.ly/dan-abramov"
                    name="fallback"
                    singerInfo={["Dan Abramov", "Evan You", "Nieve", "Nujabes"]}
                />
                <MainButton />
                <Text left="60%" position="absolute">
                    0:00 / 0:00
                </Text>
                <RightSection />
            </Flex>
        </Box>
    )
}

export default Playbar
