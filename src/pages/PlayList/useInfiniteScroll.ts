/*
 * @Author: Pacific_D
 * @Date: 2022-07-29 10:42:44
 * @LastEditTime: 2022-07-29 11:51:53
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\PlayList\useInfiniteScroll.ts
 */
import { useEventListener } from "ahooks"
import { useEffect } from "react"

type TargetType = React.RefObject<HTMLElement> | null

function useInfiniteScroll(
    target: TargetType,
    callback: (...args: any[]) => void,
    isLoading: boolean
) {
    const handleScroll = () => {
        const element = target?.current
        if (element!.scrollHeight - +element!.style.height.slice(0, -2) < element!.scrollTop) {
            console.log("scroll!")
            callback()
        }
    }

    useEffect(() => {
        !isLoading && callback()
    }, [isLoading])

    useEventListener("scroll", handleScroll, {
        target: target
    })

    // useEffect(() => {
    //     if (target!.current) {
    //         console.log(target)
    //         // callback(target?.current)
    //         target?.current!.addEventListener("scroll", () => handleScroll(target.current!))
    //     }
    //     return () =>
    //         target?.current!.removeEventListener("scroll", () => handleScroll(target.current!))
    // }, [callback, handleScroll, target])
}

export default useInfiniteScroll
