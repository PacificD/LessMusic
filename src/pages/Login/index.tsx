/*
 * @Author: Pacific_D
 * @Date: 2022-07-18 10:28:37
 * @LastEditTime: 2022-07-22 21:37:09
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\pages\Login\index.tsx
 */
import { useHighqualityPlaylistQuery, usePlaylistDetailQuery } from "@/services"
import { IRes } from "@/types"
import { VStack, StackDivider, Box, Flex, Text, Spacer } from "@chakra-ui/react"
import { FC, useMemo, useState } from "react"

const Login: FC = () => {
    const { data: playlist, isLoading: playlistIsLoading } = useHighqualityPlaylistQuery(),
        [playlistId, setPlaylistId] = useState<number>(24381616),
        { data: info, isLoading: detailIsLoading } = usePlaylistDetailQuery(
            playlistId,
            // 第二个参数 `enabled` 为控制是否请求的布尔变量
            !!(playlist as IRes)?.playlists
        )

    const playlistDetails = useMemo(() => {
        if (info) {
            return JSON.stringify((info as IRes).playlist)
        }
    }, [info])

    return (
        <Box h="full" px="12" py="8" w="full">
            <Flex h="full" w="full">
                <VStack
                    align="stretch"
                    divider={<StackDivider borderColor="gray.200" />}
                    maxH="96"
                    overflow="scroll"
                    spacing={2}
                >
                    {playlistIsLoading ? (
                        <Text color="red.400" fontSize="2xl" fontWeight="bold">
                            Loading ...
                        </Text>
                    ) : (
                        (playlist as IRes).playlists?.map((item: any) => (
                            <Box
                                bg="red.200"
                                border="1px"
                                cursor="pointer"
                                key={item.id}
                                onClick={() => setPlaylistId(item.id)}
                            >
                                {item.name}
                            </Box>
                        ))
                    )}
                </VStack>
                <Spacer></Spacer>
                <VStack
                    align="stretch"
                    divider={<StackDivider borderColor="gray.200" />}
                    maxH="96"
                    overflow="scroll"
                    spacing={1}
                >
                    {detailIsLoading ? (
                        <Text color="blue.400" fontSize="2xl" fontWeight="bold">
                            Loading ...
                        </Text>
                    ) : (
                        <Text maxW={64}>{playlistDetails}</Text>
                    )}
                </VStack>
            </Flex>
        </Box>
    )
}

export default Login
