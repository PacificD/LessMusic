/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 21:56:37
 * @LastEditTime: 2022-07-26 15:00:30
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\components\GoBack\index.tsx
 */
import { Center, chakra, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"
import { AiOutlineLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

const CAiOutlineLeft = chakra(AiOutlineLeft)

/**
 * @description: 往历史记录后退一级的组件
 * @return {*}
 */
const GoBack: FC = () => {
    const bg = useColorModeValue("#e0e7eb", "gray.600"),
        navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <Center
            bg={bg}
            cursor="pointer"
            left="4"
            onClick={goBack}
            p={2}
            position="fixed"
            rounded="lg"
            shadow="md"
            top="96px"
            zIndex="50"
        >
            <CAiOutlineLeft fontSize={20} />
        </Center>
    )
}

export default GoBack
