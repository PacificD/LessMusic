/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 09:28:20
 * @LastEditTime: 2022-07-25 10:22:34
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\Navbar\Tablist\index.tsx
 */

import { TablistItem } from "@/types"
import { Box, Heading, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"
import config from "./config"

const Tablist: FC = () => {
    const textColor = useColorModeValue("rgb(107, 107, 107)", "#ddd")
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
                >
                    {item.name}
                </Heading>
            ))}
        </Box>
    )
}

export default Tablist
