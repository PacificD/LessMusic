/*
 * @Author: Pacific_D
 * @Date: 2022-07-22 17:16:03
 * @LastEditTime: 2022-07-29 15:53:02
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\services\services\useHotTopicQuery.ts
 */
import { METHODS, IRes } from "@/types"
import { useQuery } from "@tanstack/react-query"
import request from "../request"

/**
 * @description:获取热门话题
 * @param {number} limit
 * @param {number} offset
 * @return {*}
 */
const useHotTopicQuery = (limit = 20, offset = 0) => {
    const queryKey = ["hotTopic"]
    const fetchData = () =>
        request<IRes>(
            "/hot/topic",
            {
                limit,
                offset
            },
            METHODS.GET
        ).then(res => res.data.code === 200 && res.data)

    return useQuery(queryKey, fetchData)
}

export default useHotTopicQuery
