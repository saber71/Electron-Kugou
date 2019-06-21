<template>
    <div id="UserMusicSpace">
        <section class="header">
            <div class="bg"></div>
            <section class="line1">
                <div class="option">
                    <div class="content" @click.stop="clickOption">
                        <img class="icon" src="../../assets/option-white.png">设置
                    </div>
                    <div class="popup" v-show="visibleMusicOption">
                        <div class="element" @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT)">编辑资料
                        </div>
                        <div class="element">隐私设置</div>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
    import {MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT} from "@/js/_const";

    export default {
        name: "UserMusicSpace",
        props: {},
        data() {
            return {
                constant: {
                    MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT,
                }
            }
        },
        watch: {},
        computed: {
            visibleMusicOption() {
                return store.state.visiblePopup.musicOption
            }
        },
        methods: {
            clickOption() {
                const val = this.visibleMusicOption
                store.state.visiblePopup.musicOption = !val
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

    #UserMusicSpace {
        position: relative;
        padding: 10px;
        box-sizing: border-box;

        .header {
            .bg {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 125px;
                background: url("../../assets/music-space-bg.jpg") no-repeat;
                background-size: 100% auto;
                background-position-y: -170px;
            }

            .line1 {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .option {
                    position: relative;

                    .content {
                        padding: 3px 5px;
                        background-color: rgba(0, 0, 0, 0.5);
                        border-radius: 15px;
                        color: rgba(242, 242, 242, 0.7);
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        .icon {
                            width: 14px;
                            height: 14px;
                            margin-right: 5px;
                            opacity: 0.7;
                        }

                        &:hover {
                            color: white;

                            .icon {
                                opacity: 1;
                            }
                        }
                    }

                    .popup {
                        position: absolute;
                        right: 0;
                        top: 30px;
                        width: 95px;
                        background-color: rgba(0, 0, 0, 0.7);
                        color: white;
                        font-size: 13px;
                        text-align: center;
                        line-height: 40px;
                        border-radius: 3px;
                        z-index: 10;

                        &:before {
                            content: '';
                            position: absolute;
                            left: calc(50% - 2.5px);
                            top: -10px;
                            width: 0;
                            height: 0;
                            border: 5px solid transparent;
                            border-bottom-color: rgba(0, 0, 0, 0.7);
                        }

                        .element {
                            cursor: pointer;

                            &:hover {
                                color: $blue;
                            }
                        }
                    }

                }
            }
        }
    }
</style>