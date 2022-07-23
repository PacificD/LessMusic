/*
 * @Author: Giaruei
 * @Date: 2022-07-23 09:53:12
 * @LastEditTime: 2022-07-23 11:57:38
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\pages\NotFound\index.tsx
 */
import { Box, Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

const Error: FC = () => {
    const navigate = useNavigate()
    const backToMainPage = () => navigate("/")

    return (
        <Flex alignItems="center" cursor="default" direction="column" justify="center">
            <Text
                bgClip="text"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                fontSize="100px"
                fontWeight="extrabold"
                mt="200px"
                textAlign="center"
            >
                Error! This is 404 !
            </Text>
            <Box
                _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
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

export default Error
