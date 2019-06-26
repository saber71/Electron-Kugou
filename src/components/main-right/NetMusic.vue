<template>
    <div id="NetMusic">
        <div class="left">
            <div class="rect" @click="clickSelected">
                <img v-if="selected" src="../../assets/right.png">
            </div>
            <span class="index">{{getIndex()}}</span>
            <span class="name">{{music.name}}</span>
        </div>
        <div class="right">
            <div class="play" @mouseleave="hoverPlay=false" @mouseenter="hoverPlay=true"
                 title="播放">
                <img v-show="!hoverPlay" src="../../assets/sanjiao-gray.png">
                <img v-show="hoverPlay" src="../../assets/sanjiao-blue.png">
            </div>
            <div class="add" title="添加"></div>
            <div class="download" @mouseenter="hoverDownload=true" @mouseleave="hoverDownload=false"
                 title="下载">
                <img v-show="!hoverDownload" src="../../assets/download-gray.png">
                <img v-show="hoverDownload" src="../../assets/download-blue.png">
            </div>
            <div class="more" @mouseleave="hoverMore=false" @mouseenter="hoverMore=true"
                 title="更多">
                <img v-show="!hoverMore" src="../../assets/more-gray.png">
                <img v-show="hoverMore" src="../../assets/more-blue.png">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NetMusic",
        model: {
            prop: 'selected',
            event: 'change'
        },
        props: {
            music: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
            selected: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                clicked: false,
                visiblePopup: false,
                hoverPlay: false,
                hoverDownload: false,
                hoverMore: false
            }
        },
        watch: {},
        computed: {},
        methods: {
            getIndex() {
                const index = this.index + 1
                if (index < 10) {
                    return '0' + index
                }
                return index
            },
            clickSelected() {
                this.$emit('change', !this.selected)
            }
        },
        mounted() {
        },
        created() {
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";

    #NetMusic {
        width: 100%;
        padding: 10px 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #dddddd;

        .left {
            display: flex;
            align-items: center;
            flex-grow: 1;
            color: $black;
            font-size: 13px;

            .rect {
                border: 1px solid $light-black;
                border-radius: 1px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 12px;
                height: 12px;
                margin-right: 5px;
                cursor: pointer;

                img {
                    width: 80%;
                    height: 80%;
                }
            }

            .index, .name, .singer {
                margin: 0 5px;
            }

            .index {
                color: $light-black;
            }
        }

        .right {
            display: flex;
            align-items: center;

            .play, .add, .download, .more {
                cursor: pointer;
                width: 16px;
                height: 16px;
                margin: 0 5px;

                img {
                    width: 100%;
                }
            }

            .play {
                transform: rotate(90deg);
            }

            .add {
                width: 14px;
                height: 14px;
                position: relative;
                border: 1px solid #8A8A8A;

                &:before {
                    content: '';
                    position: absolute;
                    left: 5%;
                    top: calc(50% - 1px);
                    width: 90%;
                    height: 1px;
                    background-color: #8A8A8A;
                }

                &:after {
                    content: '';
                    position: absolute;
                    left: calc(50%);
                    top: 5%;
                    width: 1px;
                    height: 90%;
                    background-color: #8A8A8A;
                }

                &:hover {
                    border-color: $blue;

                    &:before {
                        background-color: $blue;
                    }

                    &:after {
                        background-color: $blue;
                    }
                }
            }
        }

        &:hover {
            background-color: #F5F8FB;

            .left {
                color: $blue;
            }
        }
    }
</style>