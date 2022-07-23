/*
 * @Author: Pacific_D
 * @Date: 2022-07-18 10:14:40
 * @LastEditTime: 2022-07-23 10:23:46
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\pages\Home\index.tsx
 */

import { FC } from "react"
import { ColorModeSwitcher } from "@/components"
import { Box, Text, VStack, Grid } from "@chakra-ui/react"
import { useHotTopicQuery } from "@/services"

const Home: FC = () => {
    const { data, isLoading, isError, error } = useHotTopicQuery(50, 20)

    if (isLoading) {
        return (
            <Text color="red.400" fontSize="2xl" fontWeight="bold">
                Loading ...
            </Text>
        )
    }

    if (isError || !data) {
        const msg = JSON.stringify(error)
        return <div>fetch error: {msg}</div>
    }
    console.log(data)
    return (
        <Box fontSize="xl" textAlign="center">
            <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <Box layerStyle="selected">This is a box</Box>
                <VStack spacing={8}>
                    {data.hot.map((topic: any) => (
                        <Text key={topic.actId} maxW="80vw">
                            {JSON.stringify(topic)}
                        </Text>
                    ))}
                </VStack>
            </Grid>
        </Box>
    )
}
export default Home
