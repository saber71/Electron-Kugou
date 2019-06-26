<template>
    <div id="music"
         @mouseleave="visiblePopup=false" @mouseenter="visiblePopup=true">
        <div ref="music" class="content" :class="{'content-active':clickContent}" tabindex="1"
             @dblclick="dbClick"
             @click="clickContent=!clickContent" @blur="clickContent=false">
            <div class="text">
                <img src="../../assets/add.png" title="稍后播" @click.stop="laterPlay">
                {{name(music)}}
            </div>
            <div class="icons">
                <img class="mv" src="../../assets/mv.png" v-if="music.mv" title="观看MV">
                <div class="mv-space" v-else></div>
                <img class="love" src="../../assets/love-red.png" v-if="music.love"
                     @click="music.love=false">
                <img class="love" src="../../assets/love.png" v-else title="我喜欢"
                     @click="music.love=true">
                <img class="remove" src="../../assets/remove.png" title="删除" @click="remove">
                <div class="more" ref="more" @click="visibleMorePopup=true"
                     @mouseleave="visibleMorePopup=false">
                    <img src="../../assets/more.png" title="更多">
                    <div class="more-popup" ref="morePopup" v-show="visibleMorePopup" :style="{top:morePopupTop}"
                         @click.stop="">
                        <div class="item">相似歌曲</div>
                        <div class="item" @mouseenter="mouseEnterAddListPopup" ref="subItemAddList">
                            添加到列表
                            <div class="sub-popup" ref="subPopupAddList" :style="{top:addListPopupTop}">
                                <h6>本地列表</h6>
                                <div class="sub-item" v-for="(v) in $store.getters.localList('最近播放')"
                                     @click="addToList(true,v.name)">{{v.name}}
                                </div>
                                <h6>网络列表</h6>
                                <div class="sub-item" v-for="(v,name) in $store.state.netMusicList"
                                     @click="addToList(false,name)">{{name}}
                                </div>
                            </div>
                        </div>
                        <div class="item">K歌</div>
                    </div>
                </div>
                <span class="duration">{{formatDuration(music.duration)}}</span>
            </div>
        </div>
        <div class="popup" ref="popup"
             :class="{'popup-active':visiblePopup}"
             :style="{top:popupTop}"
             @mouseenter="visiblePopup=false">
            <h6>{{name(music)}}</h6>
            <div class="info">
                <img :src="music.img">
                <div class="area">
                    <div class="part">
                        <label>大小：</label>
                        <span>{{music.size}}</span>
                    </div>
                    <div class="part">
                        <label>音质：</label>
                        <span>{{music.quality}}</span>
                    </div>
                    <div class="part">
                        <label>来源：</label>
                        <span>{{music.source}}</span>
                    </div>
                </div>
                <div class="area">
                    <div class="part">
                        <label>格式：</label>
                        <span>{{music.type}}</span>
                    </div>
                    <div class="part">
                        <label>播放：</label>
                        <span>{{musicPlayTimes(music)+'次'}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getMainLeftBottom, isReachMainLeftBottom} from "@/js/util";
    import {ADD_TO_PLAY_LIST, PARENT_ADD_TO_LIST, PARENT_DB_CLICK} from "@/js/event-bus";

    export default {
        name: "Music",
        props: {
            music: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                visiblePopup: false,
                popupTop: 0,
                popupHeight: 0,
                visibleMorePopup: false,
                clickContent: false,
                morePopupTop: 0,
                addListPopupTop: 0
            }
        },
        watch: {
            visiblePopup(newVal) {
                if (newVal) {
                    const el = this.$refs.music
                    const toTop = el.getBoundingClientRect().y
                    const height = el.getBoundingClientRect().height
                    this.popupTop = (toTop + height + 2) + 'px'
                    if (isReachMainLeftBottom(toTop + height, this.popupHeight)) {
                        this.popupTop = (toTop - this.popupHeight - 3) + 'px'
                    }
                }
            },
            visibleMorePopup(newVal) {
                if (newVal) {
                    this.visiblePopup = false
                    this.$nextTick(() => {
                        const moreY = this.$refs.more.getBoundingClientRect().y
                        const morePopupHeight = this.$refs.morePopup.getBoundingClientRect().height
                        if (isReachMainLeftBottom(moreY, morePopupHeight)) {
                            this.morePopupTop = (getMainLeftBottom() - morePopupHeight - moreY) + 'px'
                        } else {
                            this.morePopupTop = '0px'
                        }
                    })
                }
            }
        },
        computed: {},
        methods: {
            dbClick() {
                this.$parent.$emit(PARENT_DB_CLICK, {
                    music: this.music,
                    index: this.index
                })
            },
            addToList(local, name) {
                this.$parent.$emit(PARENT_ADD_TO_LIST, {
                    name, local,
                    music: this.music
                })
            },
            mouseEnterAddListPopup() {
                this.$nextTick(() => {
                    const subItem = this.$refs.subItemAddList
                    const subPopup = this.$refs.subPopupAddList
                    const itemY = subItem.getBoundingClientRect().y
                    const popupHeight = subPopup.getBoundingClientRect().height
                    if (isReachMainLeftBottom(itemY, popupHeight)) {
                        this.addListPopupTop = (getMainLeftBottom() - itemY - popupHeight) + 'px'
                    } else {
                        this.addListPopupTop = '0'
                    }
                })
            },
            remove() {
                this.$parent.$emit('remove', this.index)
            },
            laterPlay() {
                eventBus.$emit(ADD_TO_PLAY_LIST, this.music)
            },
            name(music) {
                return music.name
            },
        },
        mounted() {
            const popup = this.$refs.popup
            this.popupHeight = popup.getBoundingClientRect().height
        },
        created() {
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";

    #music {
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
                background-color: #F5F5F5;

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
                    position: relative;

                    img {
                        display: block;
                    }

                    .more-popup {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 150px;
                        background-color: white;
                        z-index: 10;
                        box-shadow: 0 0 2px gray;

                        .item {
                            padding: 10px;
                            box-sizing: border-box;
                            font-size: 13px;
                            color: $black;
                            cursor: pointer;
                            position: relative;
                            background-color: white;

                            .sub-popup {
                                position: absolute;
                                left: -130px;
                                width: 150px;
                                max-height: 300px;
                                overflow: auto;
                                box-shadow: 0 0 2px gray;
                                background-color: white;
                                display: none;
                                cursor: default;
                                z-index: 10;

                                h6 {
                                    color: $black;
                                    font-size: 15px;
                                    margin: 5px 0;
                                    padding-left: 5px;
                                    box-sizing: border-box;
                                }

                                .sub-item {
                                    @extend .item;
                                    color: $black;
                                    padding: 10px 15px;

                                    &:hover {
                                        color: white;
                                    }
                                }
                            }

                            &:hover {
                                background-color: $blue;
                                color: white;

                                .sub-popup {
                                    display: block;
                                }
                            }
                        }
                    }
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

        .content-active {
            background-color: #F5F5F5;
        }

        .popup {
            position: fixed;
            left: $left-width - 270px;
            width: 250px;
            visibility: hidden;
            box-shadow: 0 0 2px #777777;
            padding: 10px;
            background-color: white;
            z-index: 10;

            h6 {
                font-size: 13px;
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

        .popup-active {
            visibility: visible;
        }
    }
</style>