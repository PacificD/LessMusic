/*
 * @Author: Pacific_D
 * @Date: 2022-07-29 17:10:22
 * @LastEditTime: 2022-07-29 18:18:19
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\reducers\playListReducer.ts
 */
import { PlaylistAction, PlaylistMusic } from "@/types"

type Playlist = Array<PlaylistMusic>

export default function playlistReducer(playlist: Playlist, action: PlaylistAction): Playlist {
    const { type, payload } = action

    switch (type) {
        case "ADD":
            if (!payload) return playlist
            if (Array.isArray(payload)) {
                // patch add
                return (payload as Playlist).reduce(
                    (accumulator, curr) =>
                        // id重复判断
                        !playlist.some(music => music.id === curr.id)
                            ? [...accumulator, curr]
                            : accumulator,
                    playlist
                )
            } else {
                // add one
                if (playlist.some(music => music.id === (payload as PlaylistMusic).id)) {
                    return playlist
                } else {
                    return [...playlist, payload as PlaylistMusic]
                }
            }
        case "DELETE":
            if (!payload) return playlist
            if (Array.isArray(payload)) {
                // patch delete
                return playlist.filter(music => !(payload as Array<number>).includes(music.id))
            } else {
                // delete one
                return playlist.filter(music => music.id !== (payload as number))
            }
        case "CLEAR":
            return []
        default:
            return playlist
    }
}
