/*
 * @Author: Pacific_D
 * @Date: 2022-07-19 09:57:29
 * @LastEditTime: 2022-07-26 17:44:04
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\router\ViewRouter.tsx
 */

import { Flex } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { FC, Suspense } from "react"
import { Routes, useLocation, Route } from "react-router-dom"
import config from "./config"

const ViewRouter: FC = () => {
    const location = useLocation()
    return (
        <Suspense
            fallback={
                <Flex
                    alignItems="center"
                    fontSize="3xl"
                    fontWeight="bold"
                    justifyContent="center"
                    mt={32}
                >
                    Loading...
                </Flex>
            }
        >
            <AnimatePresence exitBeforeEnter>
                <Routes key={location.pathname} location={location}>
                    {config.map(route => (
                        <Route element={route.element} key={route.path} path={route.path} />
                    ))}
                </Routes>
            </AnimatePresence>
        </Suspense>
    )
}

export default ViewRouter
