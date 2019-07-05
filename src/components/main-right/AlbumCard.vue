<template>
    <div id="AlbumCard" @click="toAlbum()">
        <div class="img">
            <img class="icon" :src="v.img">
            <div class="hover-bottom">
                <div class="play" title="播放全部">
                    <img src="../../assets/triangle-white.png">
                </div>
            </div>
        </div>
        <p class="name">{{v.name}}</p>
        <div class="bottom">
            <label :title="v.singer">{{v.singer}}</label>
            <span v-if="v.price">￥{{v.price}}</span>
            <img src="../../assets/play-list-blue.png" v-else @click.stop="showMusicList($event)" title="所有曲目">
            <section class="popup" v-show="showAlbumListIndex" @click="showAlbumListIndex=false">
                <div class="popup-content" @click.stop="" :style="musicListPopupStyle">
                    <div class="top">
                        共{{albumMusicTotal}}首
                        <div class="close" @click="showAlbumListIndex=false"></div>
                    </div>
                    <div class="middle">
                        <div class="music" v-for="(v) in showAlbumMusicList">
                            <div class="left">{{v.name}}</div>
                            <div class="right">
                                <img class="play-icon" src="../../assets/sanjiao-gray.png">
                                <img src="../../assets/download-gray.png">
                            </div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="pager">
                            <img class="prev" src="../../assets/arrow-down-dark.png" :class="{'disabled':albumPage===1}"
                                 @click="albumPage=albumPage===1?albumPage:albumPage-1">
                            <label>{{albumPage}} / {{albumMusicListTotalPage}}</label>
                            <img class="next" src="../../assets/arrow-down-dark.png" :class="{'disabled':albumPage===albumMusicListTotalPage}"
                                 @click="albumPage=albumPage===albumMusicListTotalPage?albumPage:albumPage+1">
                        </div>
                        <button>
                            <img src="../../assets/sanjiao-gray.png">全部播放
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {SET_LOOK_ALBUM} from "@/js/store/mutations_name";
    import {MAIN_RIGHT_ACTIVE_ALBUM} from "@/js/_const";

    export default {
        name: "AlbumCard",
        props: {
            album: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                v: {},
                albumPage: 1,
                albumSize: 8,
                musicListPopupStyle: {
                    top: 0,
                    right: 0
                },
                showAlbumListIndex: false,
            }
        },
        watch: {},
        computed: {
            showAlbumMusicList() {
                const musics = this.album.musics
                const page = this.albumPage
                const size = this.albumSize
                return musics.slice((page - 1) * size, page * size)
            },
            albumMusicTotal() {
                return this.album.musics.length
            },
            albumMusicListTotalPage() {
                const musicsLength = this.albumMusicTotal
                const size = this.albumSize
                let res = parseInt(musicsLength / size)
                if (musicsLength % size > 0) {
                    res++
                }
                return res
            },
        },
        methods: {
            showMusicList(ev) {
                this.showAlbumListIndex = true
                const clientX = ev.clientX
                const clientY = ev.clientY
                const width = window.innerWidth
                this.musicListPopupStyle.right = (width - clientX + 15) + 'px'
                this.musicListPopupStyle.top = (clientY - 180) + 'px'
            },
            toAlbum() {
                store.commit(SET_LOOK_ALBUM, {
                    breadcrumb: [],
                    album: this.album
                })
                this.mainRightActive(MAIN_RIGHT_ACTIVE_ALBUM)
            },
            playAll() {
                const musicList = store.state.localMusicList['默认列表'].musics
                const index = musicList.length
                store.commit(ADD_ALL_TO_MUSIC_LIST, {
                    name: '默认列表',
                    local: true,
                    musics: this.album.musics,
                })
                const obj = {
                    music,
                    musics: musicList,
                    index
                }
                eventBus.$emit(SET_PLAYING_MUSIC, obj)
            },
            play(music) {
                this.addToMusicList(music)
                const musicList = store.state.localMusicList['默认列表'].musics
                const obj = {
                    music,
                    musics: musicList,
                    index: musicList.length - 1
                }
                eventBus.$emit(SET_PLAYING_MUSIC, obj)
            },
            addToMusicList(music) {
                store.commit(ADD_ALL_TO_MUSIC_LIST, {
                    name: '默认列表',
                    local: true,
                    musics: [music],
                })
            },
        },
        mounted() {
        },
        created() {
            this.v = this.album
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";

    #AlbumCard {
        margin-bottom: 20px;

        .img {
            width: 100%;
            position: relative;
            cursor: pointer;

            .icon {
                width: 100%;
            }

            .hover-bottom {
                background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
                display: none;
                align-items: center;
                justify-content: flex-end;
                padding: 10px 0;
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;

                .love, .play {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border: 2px solid white;
                    opacity: 0.7;
                    cursor: pointer;
                    margin-right: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 12px;
                        height: 12px;
                    }

                    &:hover {
                        opacity: 1;
                    }
                }

                .play {
                    img {
                        margin-left: 2px;
                    }
                }
            }

            &:hover {
                .hover-bottom {
                    display: flex;
                }
            }
        }

        .name {
            font-size: 14px;
            color: $black;
            margin: 5px 0;
            padding: 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;

            &:hover {
                color: $blue;
            }
        }

        .bottom {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: $light-black;

            label {
                display: inline-block;
                width: 70%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            img {
                opacity: 0.7;
                width: 12px;
                height: 12px;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                }
            }

            span {
                color: #FF8111;
            }

            .popup {
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
                cursor: default;

                .popup-content {
                    position: absolute;
                    width: 300px;
                    background-color: white;
                    padding: 0 10px;
                    box-sizing: border-box;
                    box-shadow: 0 0 2px gray;

                    .top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 13px;
                        color: $black;
                        padding: 5px 0;
                        border-bottom: 1px solid #dddddd;

                        .close {
                            position: relative;
                            width: 16px;
                            height: 16px;
                            cursor: pointer;

                            &:before {
                                content: '';
                                position: absolute;
                                left: 0;
                                top: 50%;
                                width: 100%;
                                height: 1px;
                                background-color: $light-black;
                                transform: rotate(45deg);
                            }

                            &:after {
                                content: '';
                                position: absolute;
                                left: 0;
                                top: 50%;
                                width: 100%;
                                height: 1px;
                                background-color: $light-black;
                                transform: rotate(-45deg);
                            }

                            &:hover {
                                &:before, &:after {
                                    background-color: $blue;
                                }
                            }
                        }
                    }

                    .middle {
                        height: 240px;

                        .music {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 7px 0;

                            .left {
                                width: 70%;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                color: $black;
                                font-size: 13px;
                                cursor: pointer;

                                &:hover {
                                    color: $blue;
                                }
                            }

                            .right {
                                display: flex;
                                align-items: center;

                                img {
                                    width: 16px;
                                    height: 16px;
                                    opacity: 0.7;
                                    cursor: pointer;
                                    margin-right: 5px;

                                    &:hover {
                                        opacity: 1;
                                    }
                                }

                                .play-icon {
                                    transform: rotate(90deg);
                                }
                            }

                            &:hover {
                                background-color: #e8fffa;
                            }
                        }
                    }

                    .bottom {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 5px 0;
                        border-radius: 1px;

                        .pager {
                            display: flex;
                            align-items: center;

                            img {
                                width: 16px;
                                height: 16px;
                                cursor: pointer;
                                opacity: 0.7;

                                &:hover {
                                    opacity: 1;
                                }
                            }

                            label {
                                font-size: 12px;
                                color: $light-black;
                                cursor: default;
                                margin: 0 10px;
                            }

                            .prev {
                                transform: rotate(90deg);
                            }

                            .next {
                                transform: rotate(-90deg);
                            }

                            .disabled {
                                cursor: default;

                                &:hover {
                                    opacity: 0.7;
                                }
                            }
                        }

                        button {
                            background-color: white;
                            color: $black;
                            border: 1px solid #dddddd;
                            padding: 5px 10px;
                            display: flex;
                            align-items: center;

                            img {
                                width: 16px;
                                height: 16px;
                                transform: rotate(90deg);
                                margin-right: 5px;
                            }

                            &:hover {
                                border-color: #a8fff5;
                                color: $blue;
                            }
                        }
                    }
                }
            }
        }

    }
</style>