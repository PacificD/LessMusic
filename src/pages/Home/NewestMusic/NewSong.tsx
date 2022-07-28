/*
 * @Author: Pacific_D
 * @Date: 2022-07-26 20:37:28
 * @LastEditTime: 2022-07-28 12:05:39
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \lessMusic\src\pages\Home\NewestMusic\NewSong.tsx
 */
import { useCtxValue } from "@/hooks"
import { Artist } from "@/types"
import { Flex, Stack, Box, useColorModeValue, Image, Text, chakra } from "@chakra-ui/react"
import { FC } from "react"
import { RiPlayFill } from "react-icons/ri"

const CRiPlayFill = chakra(RiPlayFill)

const boxShadow = "1px 2px 6px rgb(128 128 128 / 30%)",
    borderRadius = "24px 0 24px 0"

interface IProps {
    id: number
    name: string
    cover: string
    artists: Array<Artist>
    index: number
}

const NewSong: FC<IProps> = ({ id, name, cover, artists, index }) => {
    const bg = useColorModeValue("white", "darkMode"),
        { playMusic } = useCtxValue()

    const play = () => {
        playMusic({
            id,
            name,
            cover,
            artists
        })
    }
    return (
        <Flex
            _hover={{
                width: "100%",
                transform: "scale(1.01)"
            }}
            alignItems="center"
            bg={bg}
            flexDirection="row"
            h="60px"
            my={2}
            role="group"
            rounded={borderRadius}
            shadow={boxShadow}
            transition="all 0.6s ease-out"
            w="320px"
        >
            <Text mx={1}>{index + 1}.</Text>
            <Image alt="歌曲封面" h="48px" mr={2} src={cover} w="48px" />
            <Stack direction="column" w="242px">
                <Text
                    _hover={{ color: "theme.200" }}
                    cursor="pointer"
                    fontSize="15px"
                    fontWeight="bold"
                    onClick={play}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    w="full"
                    whiteSpace="nowrap"
                >
                    {name}
                </Text>
                <Box w="full" whiteSpace="nowrap">
                    {artists.map((artist, index) => (
                        <Box display="inline-block" fontSize="12px" key={artist.id}>
                            {artist.name}
                            {index === artists.length - 1 ? (
                                ""
                            ) : (
                                <Text display="inline-block" mx={1}>
                                    /
                                </Text>
                            )}
                        </Box>
                    ))}
                </Box>
            </Stack>
            <Box
                _groupHover={{ opacity: "1" }}
                border="2px"
                borderColor="theme.200"
                borderRadius="8px"
                cursor="pointer"
                mr={4}
                onClick={play}
                opacity="0"
                transition="all 0.6s"
            >
                <CRiPlayFill color="theme.200" fontSize="2xl" />
            </Box>
        </Flex>
    )
}

export default NewSong
