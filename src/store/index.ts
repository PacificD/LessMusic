/*
 * @Author: Pacific_D
 * @Date: 2022-08-15 15:06:17
 * @LastEditTime: 2022-08-15 16:49:01
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\store\index.ts
 */
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import playingMusicReducer, { setPlayingMusic } from "./playingMusicSlice"
import playlistReducer, { addPlaylist, deletePlaylist, clearPlaylist } from "./playlistSlice"

const store = configureStore({
    reducer: {
        playingMusic: playingMusicReducer,
        playlist: playlistReducer
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export { setPlayingMusic, addPlaylist, deletePlaylist, clearPlaylist }

export default store
