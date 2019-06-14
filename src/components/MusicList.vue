<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="music-list">
        <list :name="listName" :size="array.length" v-model="visiblePopup"
              :popup-hidden-option="popupHiddenOption">
            <template v-slot:header>
                <div class="header-items">
                    <img src="../assets/update.png" v-if="update" title="一键升级无损音质">
                    <img src="../assets/share.png" title="分享">
                    <img src="../assets/menu-music-list.png" title="列表菜单" @click.stop="clickMenu">
                </div>
            </template>
            <template v-slot:items>
                <div class="items">
                    <div class="item" v-for="(v) in array">
                        <div class="content">
                            <div class="text">
                                <img src="../assets/add.png" title="稍后播">
                                {{name(v)}}
                            </div>
                            <div class="icons">
                                <img class="mv" src="../assets/mv.png" v-if="v.mv" title="观看MV">
                                <div class="mv-space" v-else></div>
                                <img class="love" src="../assets/love-red.png" v-if="isLove(v)" title="我不喜欢">
                                <img class="love" src="../assets/love.png" v-else title="我喜欢">
                                <img class="remove" src="../assets/remove.png" title="删除">
                                <img class="more" src="../assets/more.png" title="更多">
                                <span class="duration">{{formatDuration(v.duration)}}</span>
                            </div>
                        </div>
                        <div class="popup">
                            <h6>{{name(v)}}</h6>
                            <div class="info">
                                <img :src="v.img">
                                <div class="area">
                                    <div class="part">
                                        <label>大小：</label>
                                        <span>{{v.size}}</span>
                                    </div>
                                    <div class="part">
                                        <label>音质：</label>
                                        <span>{{v.quality}}</span>
                                    </div>
                                    <div class="part">
                                        <label>来源：</label>
                                        <span>{{v.source}}</span>
                                    </div>
                                </div>
                                <div class="area">
                                    <div class="part">
                                        <label>格式：</label>
                                        <span>{{v.type}}</span>
                                    </div>
                                    <div class="part">
                                        <label>播放：</label>
                                        <span>{{musicPlayTimes(v)+'次'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </list>
    </div>
</template>

<script>
    import List from "@/components/List";

    export default {
        name: "MusicList",
        components: {List},
        props: {
            array: {
                type: Array,
                required: true
            },
            listName: {
                type: String,
                required: true
            },
            update: {
                type: Boolean,
                default: true
            },
            renameable: {
                type: Boolean,
                default: false
            },
            removeable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visiblePopup: false,
                popupHiddenOption: {},
            }
        },
        watch: {},
        computed: {},
        methods: {
            clickMenu() {
                this.visiblePopup = !this.visiblePopup;
            },
            isLove(music) {
                // todo
            },
            name(music) {
                return music.name + ' - ' + music.singer
            }
        },
        mounted() {
        },
        created() {
            this.popupHiddenOption.remove = !this.removeable
            this.popupHiddenOption.rename = !this.renameable
            this.popupHiddenOption.addList = true
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/common";

    #music-list {
        .header-items {
            display: flex;
            align-items: center;

            img {
                width: 16px;
                height: 16px;
                margin: 0 5px;
                cursor: pointer;
                opacity: 0.5;

                &:hover {
                    opacity: 0.7;
                }
            }
        }

        .items {
            .item {
                font-size: 13px;
                color: #333333;
                position: relative;

                .content {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px;
                    box-sizing: border-box;
                    cursor: default;

                    .text {
                        width: 60%;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;

                        img {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            visibility: hidden;
                            cursor: pointer;
                        }
                    }

                    &:hover {
                        background-color: #dddddd;

                        .text {
                            img {
                                visibility: visible;
                            }
                        }
                    }

                    .icons {
                        width: 35%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        img {
                            width: 16px;
                            height: 16px;
                            opacity: 0.7;
                            cursor: pointer;

                            &:hover {
                                opacity: 1;
                            }
                        }

                        .mv {
                            transform: rotate(90deg);
                        }

                        .mv-space {
                            width: 16px;
                            height: 16px;
                            visibility: hidden;
                        }

                        .love, .remove {
                            visibility: hidden;
                        }

                        .more {
                            display: none;
                        }

                        .duration {
                            font-size: 12px;
                        }
                    }

                    &:hover {
                        .icons {
                            .more {
                                display: inline-block;
                            }

                            .love, .remove {
                                visibility: visible;
                            }

                            .duration {
                                display: none;
                            }
                        }
                    }
                }

                .popup {
                    position: absolute;
                    right: 0;
                    top: 40px;
                    width: 250px;
                    box-shadow: 0 0 2px #777777;
                    padding: 10px;
                    display: none;
                    background-color: white;
                    z-index: 10;

                    h6 {
                        margin-bottom: 10px;
                        margin-top: 0;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    .info {
                        display: grid;
                        grid-template-columns: 1fr 2fr 2fr;

                        img {
                            width: 100%;
                        }

                        .area {
                            padding-left: 10px;
                            box-sizing: border-box;

                            .part {
                                font-size: 12px;
                                margin-bottom: 10px;

                                label {
                                    color: gray;
                                }

                                span {
                                    color: #333333;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                }
                            }
                        }
                    }

                }

                &:hover {
                    .popup {
                        display: block;
                    }
                }

                .popup:hover {
                    display: none;
                }
            }
        }
    }
</style>