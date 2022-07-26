/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 09:28:20
 * @LastEditTime: 2022-07-26 15:01:47
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Navbar\Tablist\index.tsx
 */
import { TablistItem } from "@/types"
import { Box, Heading, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import config from "./config"

const Tablist: FC = () => {
    const textColor = useColorModeValue("rgb(107, 107, 107)", "#ddd"),
        navigate = useNavigate()
    return (
        <Box ml={12}>
            {config.map((item: TablistItem) => (
                <Heading
                    _hover={{ color: "theme.200" }}
                    as="h3"
                    color={textColor}
                    cursor="pointer"
                    display="inline-block"
                    fontSize="16px"
                    key={item.name}
                    mx="5"
                    onClick={() => navigate(item.route)}
                >
                    {item.name}
                </Heading>
            ))}
        </Box>
    )
}

export default Tablist
