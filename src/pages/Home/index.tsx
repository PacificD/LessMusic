/*
 * @Author: Pacific_D
 * @Date: 2022-07-18 10:14:40
 * @LastEditTime: 2022-07-26 20:08:53
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\Home\index.tsx
 */

import { FC } from "react"
import { Flex, useColorModeValue } from "@chakra-ui/react"
import { useHotTopicQuery } from "@/services"
import { motion } from "framer-motion"
import NewestMusic from "./NewestMusic"

const animation = {
    initial: {
        scale: 0,
        opacity: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    },
    exit: {
        x: 0,
        opacity: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    }
}

const Home: FC = () => {
    const bg = useColorModeValue("white", "darkMode")
    // const { data, isLoading, isError, error } = useHotTopicQuery(50, 20)

    // if (isLoading) {
    //     return (
    //         <Text color="red.400" fontSize="2xl" fontWeight="bold">
    //             Loading ...
    //         </Text>
    //     )
    // }

    // if (isError || !data) {
    //     const msg = JSON.stringify(error)
    //     return <div>fetch error: {msg}</div>
    // }
    // console.log(data)
    return (
        <motion.div animate="animate" exit="exit" initial="initial" variants={animation}>
            <Flex
                alignItems="center"
                bg={bg}
                className="mainContent"
                flexDirection="column"
                justifyContent="center"
                layerStyle="mainContent"
            >
                <NewestMusic />
            </Flex>
        </motion.div>
    )
}
export default Home
