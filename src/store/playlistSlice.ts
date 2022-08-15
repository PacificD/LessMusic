/*
 * @Author: Pacific_D
 * @Date: 2022-08-15 16:29:01
 * @LastEditTime: 2022-08-15 17:09:39
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\store\playlistSlice.ts
 */
import { INITIAL_SONG } from "@/constants"
import { Playlist, PlaylistMusic } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const playlistSlice = createSlice({
    name: "playlist",
    initialState: [INITIAL_SONG],
    reducers: {
        addPlaylist: (state, action: PayloadAction<PlaylistMusic | Playlist>) => {
            if (!action.payload) return
            if (Array.isArray(action.payload)) {
                // patch add
                action.payload.forEach(music => {
                    // id重复判断
                    if (!state.some(curr => curr.id === music.id)) {
                        // redux toolkit 中的 reducer 需要使用 Mmutable写法
                        state.push(music)
                    }
                })
            } else {
                // add one
                if (state.some(music => music.id === (action.payload as PlaylistMusic).id)) {
                    return
                } else {
                    state.push(action.payload as PlaylistMusic)
                }
            }
        },
        deletePlaylist: (state, action: PayloadAction<number | Array<number>>) => {
            // delete by id
            if (!action.payload) return
            if (Array.isArray(action.payload)) {
                // patch delete
                state = state.filter(music => !(action.payload as Array<number>).includes(music.id))
            } else {
                // delete one
                state = state.filter(music => music.id !== (action.payload as number))
            }
        },
        clearPlaylist: () => {
            return []
        }
    }
})

export const { addPlaylist, deletePlaylist, clearPlaylist } = playlistSlice.actions

export default playlistSlice.reducer
