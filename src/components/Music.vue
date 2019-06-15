<template>
    <div id="music"
         @mouseleave="visiblePopup=false" @mouseenter="visiblePopup=true">
        <div ref="music" class="content">
            <div class="text">
                <img src="../assets/add.png" title="稍后播">
                {{name(music)}}
            </div>
            <div class="icons">
                <img class="mv" src="../assets/mv.png" v-if="music.mv" title="观看MV">
                <div class="mv-space" v-else></div>
                <img class="love" src="../assets/love-red.png" v-if="isLove(music)" title="我不喜欢">
                <img class="love" src="../assets/love.png" v-else title="我喜欢">
                <img class="remove" src="../assets/remove.png" title="删除">
                <img class="more" src="../assets/more.png" title="更多">
                <span class="duration">{{formatDuration(music.duration)}}</span>
            </div>
        </div>
        <div class="popup" ref="popup"
             :class="{'popup-active':visiblePopup,'popup-top':popupTop}"
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
    import {isReachMainLeftBottom} from "@/js/util";

    export default {
        name: "Music",
        props: {
            music: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                visiblePopup: false,
                popupTop: false,
                popupHeight: 0
            }
        },
        watch: {
            visiblePopup(newVal) {
                if (newVal) {
                    const el = this.$refs.music
                    if (el) {
                        if (isReachMainLeftBottom(el.getBoundingClientRect().y, this.popupHeight)) {
                            this.popupTop = true
                            return
                        }
                    }
                }
                this.popupTop = false
            }
        },
        computed: {},
        methods: {
            name(music) {
                return music.name + ' - ' + music.singer
            },
            isLove(music) {
                // todo
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
            visibility: hidden;
            box-shadow: 0 0 2px #777777;
            padding: 10px;
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

        .popup-active {
            visibility: visible;
        }

        .popup-top {
            top: -125px;
        }
    }
</style>