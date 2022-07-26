/*
 * @Author: Pacific_D
 * @Date: 2022-07-25 20:56:35
 * @LastEditTime: 2022-07-26 19:28:27
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\Playing\index.tsx
 */
import { FC } from "react"
import { motion } from "framer-motion"
import { Box, useColorModeValue } from "@chakra-ui/react"

const playingMotion = {
    initial: { opacity: 0, y: "100%", transition: { duration: 1 } },
    animate: { opacity: 1, y: "0", transition: { duration: 1 } },
    exit: { opacity: 0, y: "100%", transition: { duration: 1 } }
}

const Playing: FC = () => {
    const bg = useColorModeValue("white", "darkMode")
    return (
        <motion.div
            animate="animate"
            exit="exit"
            initial="initial"
            style={{
                transformStyle: "preserve-3d"
            }}
            variants={playingMotion}
        >
            <Box bg={bg} h="calc(100vh - 130px)" w="full">
                PLAYING
            </Box>
        </motion.div>
    )
}

export default Playing
