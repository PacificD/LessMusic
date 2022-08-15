/*
 * @Author: Pacific_D
 * @Date: 2022-08-15 15:09:08
 * @LastEditTime: 2022-08-15 17:08:56
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\store\playingMusicSlice.ts
 */
import { INITIAL_SONG } from "@/constants"
import { PlayingMusic } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const playingMusicSlice = createSlice({
    name: "playingMusic",
    initialState: INITIAL_SONG,
    reducers: {
        setPlayingMusic: (state, action: PayloadAction<PlayingMusic>) => {
            return action.payload
        }
    }
})

export const { setPlayingMusic } = playingMusicSlice.actions

export default playingMusicSlice.reducer
