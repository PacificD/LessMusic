/*
 * @Author: Pacific_D
 * @Date: 2022-07-19 09:57:29
 * @LastEditTime: 2022-07-23 10:00:54
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \less-music\src\router\ViewRouter.tsx
 */

import { Flex } from "@chakra-ui/react"
import { FC, Suspense } from "react"
import RouterConfig from "./config"

const ViewRouter: FC = () => {
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
            <RouterConfig />
        </Suspense>
    )
}

export default ViewRouter
