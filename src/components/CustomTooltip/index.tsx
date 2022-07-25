/*
 * @Author: Pacific_D
 * @Date: 2022-07-23 16:13:40
 * @LastEditTime: 2022-07-23 16:28:41
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\CustomTooltip\index.tsx
 */

import { Box, Tooltip, useColorMode } from "@chakra-ui/react"
import { FC } from "react"

interface IProps {
    label: string
    Children?: JSX.Element
}

const CustomTooltip: FC<IProps> = ({ label, Children = "" }) => {
    return (
        <Tooltip hasArrow label={label} px={2} py={1}>
            <Box>{Children}</Box>
        </Tooltip>
    )
}

export default CustomTooltip
