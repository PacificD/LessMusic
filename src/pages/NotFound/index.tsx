/*
 * @Author: Giaruei
 * @Date: 2022-07-23 09:53:12
 * @LastEditTime: 2022-07-25 20:50:25
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\NotFound\index.tsx
 */
import { Box, Flex, Text, Image } from "@chakra-ui/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

const NotFound: FC = () => {
    const navigate = useNavigate()
    const backToMainPage = () => navigate("/")

    return (
        <Flex alignItems="center" cursor="default" direction="column" justifyContent="space-around">
            <Text
                bgClip="text"
                bgGradient="linear(to-l, theme.600, theme.100)"
                fontSize="100px"
                fontWeight="extrabold"
                mt={8}
                textAlign="center"
            >
                Page not found
            </Text>
            <Image alt="404" src="./svg/404.svg" w="96" />
            <Box
                _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
                bgGradient="linear(to-l, theme.200, theme.400)"
                borderRadius="12px"
                h="80px"
                mt="40px"
                onClick={backToMainPage}
                transition="all .5s"
                w="300px"
            >
                <Text
                    color="gray.100"
                    fontSize="25px"
                    fontWeight="700"
                    lineHeight="80px"
                    textAlign="center"
                >
                    Back to the main page
                </Text>
            </Box>
        </Flex>
    )
}

export default NotFound
