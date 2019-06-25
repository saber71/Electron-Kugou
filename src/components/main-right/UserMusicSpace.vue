<template>
    <div id="UserMusicSpace">
        <section class="header" v-if="musicSpaceData">
            <div class="header-bg"></div>
            <section class="line1">
                <div class="focus" :class="{'hidden':isMaster}"
                     @click="focus"
                     @mouseenter="hoverFocus=true" @mouseleave="hoverFocus=false">
                    <div class="content">
                        {{musicSpaceData.isFocus?hoverFocus?'取消关注':'已关注':"关注"}}
                    </div>
                </div>
                <div class="report" :class="{'hidden':isMaster}"
                     @click="report">
                    <div class="content">举报</div>
                </div>
                <div class="option" :class="{'hidden':!isMaster}" tabindex="0"
                     @blur="optionPopupCount=false">
                    <div class="content" @click="optionPopupCount=!optionPopupCount">
                        <img class="icon" src="../../assets/option-white.png">设置
                    </div>
                    <div class="popup" v-show="optionPopupCount">
                        <div class="element" @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT)">编辑资料
                        </div>
                        <div class="element" @click="securityPopupCount=true">隐私设置</div>
                    </div>
                </div>
            </section>
            <section class="line2" v-if="musicSpaceData">
                <div class="avatar">
                    <img :src="musicSpaceData.avatar">
                </div>
                <div class="text">
                    <div class="top">
                        <div class="left">
                            <div class="name">{{musicSpaceData.name}}
                                <div class="sex" :class="{'sex-bg-pink':musicSpaceData.sex!==0}">
                                    <img src="../../assets/man.png" v-if="musicSpaceData.sex===0">
                                    <img src="../../assets/woman.png" v-else>
                                </div>
                            </div>
                            <div class="position">{{musicSpaceData.province+musicSpaceData.city}}</div>
                        </div>
                        <div class="right">
                            <div class="item" @click="toFriend">
                                <span class="number">{{formatNumber(musicSpaceData.friends)}}</span>
                                <label>好友</label>
                            </div>
                            <div class="divide"></div>
                            <div class="item" @click="toFocus">
                                <span class="number">{{formatNumber(musicSpaceData.focus)}}</span>
                                <label>关注</label>
                            </div>
                            <div class="divide"></div>
                            <div class="item" @click="toFans">
                                <span class="number">{{formatNumber(musicSpaceData.fans)}}</span>
                                <label>粉丝</label>
                            </div>
                            <div class="divide"></div>
                            <div class="item" @click="toVisitor">
                                <span class="number">{{formatNumber(musicSpaceData.visitors)}}</span>
                                <label>访客</label>
                            </div>
                        </div>
                    </div>
                    <div class="bottom">{{musicSpaceData.opinion}}</div>
                </div>
            </section>
        </section>
        <section class="music-lists" v-if="musicSpaceData">
            <section class="my-create-list">
                <h2>{{isMaster?'我':'Ta'}}创建的歌单<span>[{{musicSpaceData.customMusicList.length}}]</span></h2>
                <section class="music-list-content">
                    <div class="music-list" v-for="(v) in musicSpaceData.customMusicList"
                         :title="v.name">
                        <img :src="v.img">
                        <div class="music-play">
                            <div></div>
                        </div>
                        <label class="name">{{v.name}}</label>
                        <label class="music-number">{{v.musics.length}}首</label>
                    </div>
                </section>
            </section>
            <section class="favorite-list">
                <h2>{{isMaster?'我':'Ta'}}收藏的歌单<span>[{{musicSpaceData.favoriteMusicList.length}}]</span></h2>
                <section class="music-list-content">
                    <div class="music-list" v-for="(v) in musicSpaceData.favoriteMusicList"
                         :title="v.name">
                        <img :src="v.img">
                        <div class="music-play">
                            <div></div>
                        </div>
                        <label class="name">{{v.name}}</label>
                        <label class="music-number">{{v.musics.length}}首</label>
                    </div>
                </section>
            </section>
        </section>
        <section class="security-popup" v-show="securityPopupCount"
                 @click.stop="securityPopupCount=false">
            <div class="dialog">
                <div class="title">
                    隐私设置
                    <img src="../../assets/close.png" @click="securityPopupCount=0">
                </div>
                <div class="content">
                    <div class="line">谁可以看到我的个人主页</div>
                    <div class="line" @click.stop="securitySelected=0">
                        <div class="circle" :class="{'circle-active':securitySelected===0}">
                            <div class="inner"></div>
                        </div>
                        所有人
                    </div>
                    <div class="line" @click.stop="securitySelected=1">
                        <div class="circle" :class="{'circle-active':securitySelected===1}">
                            <div class="inner"></div>
                        </div>
                        好友
                    </div>
                    <div class="line" @click.stop="securitySelected=2">
                        <div class="circle" :class="{'circle-active':securitySelected===2}">
                            <div class="inner"></div>
                        </div>
                        自己
                    </div>
                </div>
                <div class="bottom">
                    <button class="save" @click="setSecurity">确定</button>
                    <button class="cancel" @click="securityPopupCount=0">返回</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT, MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT} from "@/js/_const";
    import {FAIL, LOADING, SUCCESS} from "@/js/event-bus";
    import ajax from "@/js/ajax";

    export default {
        name: "UserMusicSpace",
        props: {},
        data() {
            return {
                constant: {
                    MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT,
                },
                optionPopupCount: false,
                securityPopupCount: false,
                securitySelected: 0,
                musicSpaceData: undefined,
                hoverFocus: false,
            }
        },
        watch: {},
        computed: {
            visibleMusicOption() {
                return store.state.visiblePopup.musicOption
            },
            isMaster() {
                return store.state.musicSpaceUser === store.state.onlineUser.account
            }
        },
        methods: {
            async focus() {
                eventBus.$emit(LOADING, true)
                const res = (await ajax.setFocus(this.musicSpaceData.name, !this.musicSpaceData.isFocus)).data
                eventBus.$emit(LOADING, false)
                if (res) {
                    this.musicSpaceData.isFocus = !this.musicSpaceData.isFocus
                    eventBus.$emit(SUCCESS, true)
                } else {
                    eventBus.$emit(FAIL)
                }
            },
            report() {
                eventBus.$emit(SUCCESS)
            },
            formatNumber(number) {
                if (number >= 1000) {
                    return '9999+'
                }
                return number
            },
            async setSecurity() {
                eventBus.$emit(LOADING, true)
                const res = (await ajax.setMusicSpaceSecurity(this.securitySelected)).data
                eventBus.$emit(LOADING, false)
                if (res) {
                    eventBus.$emit(SUCCESS, true)
                } else {
                    eventBus.$emit(FAIL, "无法连接服务器，请检查网络")
                }
            },
            toFriend() {
                store.state.socialContactType = 0
                this.mainRightActive(MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT)
            },
            toFocus() {
                store.state.socialContactType = 1
                this.mainRightActive(MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT)
            },
            toFans() {
                store.state.socialContactType = 2
                this.mainRightActive(MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT)
            },
            toVisitor() {
                store.state.socialContactType = 3
                this.mainRightActive(MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT)
            },
        },
        mounted() {
        },
        async created() {
            eventBus.$emit(LOADING, true)
            if (this.isMaster) {
                this.musicSpaceData = store.state.myMusicSpaceData
            } else
                this.musicSpaceData = (await ajax.getMusicSpaceData()).data
            eventBus.$emit(LOADING, false)
            if (this.isMaster) {
                this.securitySelected = (await ajax.getMusicSpaceSecurity()).data
            }
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";

    #UserMusicSpace {
        position: relative;
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
        height: $main-right-height;
        overflow: auto;

        .header {
            .header-bg {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 140px;
                background: url("../../assets/music-space-bg.jpg") no-repeat;
                background-size: 100% auto;
                background-position-y: -170px;
                filter: brightness(0.7)
            }

            .line1 {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                .option, .focus, .report {
                    position: relative;

                    .content {
                        padding: 3px 5px;
                        background-color: rgba(0, 0, 0, 0.5);
                        border-radius: 15px;
                        color: rgba(255, 255, 255, 0.7);
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

                .focus {
                    width: 70px;
                    margin-right: 10px;

                    .content {
                        width: 100%;
                        padding: 3px 0;
                        text-align: center;
                        justify-content: center;
                    }
                }

                .report {
                    width: 50px;

                    .content {
                        justify-content: center;
                    }
                }

                .hidden {
                    display: none;
                }
            }

            .line2 {
                display: flex;
                align-items: center;
                position: relative;

                .avatar {
                    padding: 5px;
                    background-color: white;
                    border-radius: 3px;
                    margin-right: 20px;
                    border: 1px solid #dddddd;

                    img {
                        width: 100px;
                        height: 100px;
                        border-radius: 3px;
                    }
                }

                .text {
                    flex-grow: 1;
                    color: white;

                    .top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 5px;

                        .left {
                            .name {
                                font-size: 16px;
                                display: flex;
                                align-items: center;
                                margin-bottom: 5px;

                                .sex {
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    background-color: #00B9FF;
                                    margin-left: 10px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;

                                    img {
                                        width: 13px;
                                        height: 13px;
                                    }
                                }

                                .sex-bg-pink {
                                    background-color: #FF78C7;
                                }
                            }

                            .position {
                                font-size: 13px;
                            }
                        }

                        .right {
                            display: flex;
                            align-items: center;

                            .item {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                                padding: 0 20px;
                                cursor: pointer;
                                font-size: 16px;

                                label {
                                    cursor: pointer;
                                }

                                .number {
                                    font-size: 14px;
                                }

                                label {
                                    font-size: 13px;
                                }
                            }

                            .divide {
                                width: 1px;
                                height: 35px;
                                background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
                            }
                        }
                    }

                    .bottom {
                        font-size: 12px;
                        min-height: 40px;
                    }
                }
            }
        }

        .music-lists {
            width: 100%;

            .my-create-list, .favorite-list {
                max-width: 1000px;

                h2 {
                    font-size: 14px;
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #dddddd;

                    span {
                        color: gray;
                        font-weight: normal;
                        font-size: 12px;
                    }
                }

                .music-list-content {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    box-sizing: border-box;

                    .music-list {
                        width: fit-content;
                        margin: 0 20px;
                        position: relative;
                        cursor: pointer;

                        img {
                            width: 85px;
                            height: 85px;
                            border-radius: 3px;
                        }

                        .music-play {
                            position: absolute;
                            right: 10px;
                            top: 55px;
                            display: none;
                        }

                        label {
                            display: block;
                            margin: 5px 0;
                            padding: 0 2px;
                            box-sizing: border-box;
                            cursor: pointer;
                        }

                        .name {
                            color: black;
                            font-size: 14px;
                            width: 90px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        .music-number {
                            color: gray;
                            font-size: 12px;
                        }

                        &:hover {
                            .music-play {
                                display: block;
                            }

                            .name {
                                color: $blue;
                            }
                        }
                    }
                }
            }

            .favorite-list {
                margin-top: 20px;
            }
        }

        .security-popup {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 100;

            .dialog {
                width: 400px;
                margin: 140px auto 0;
                background-color: white;
                border-radius: 3px;

                .title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: white;
                    font-size: 12px;
                    padding: 10px;
                    background-color: $blue;

                    img {
                        width: 16px;
                        height: 16px;
                        cursor: pointer;
                    }
                }

                .content {
                    color: rgba(0, 0, 0, 0.5);
                    padding: 10px;
                    font-size: 16px;

                    .line {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        padding: 10px 10px;
                        box-sizing: border-box;

                        .circle {
                            width: 14px;
                            height: 14px;
                            border-radius: 50%;
                            overflow: hidden;
                            border: 1px solid rgba(0, 0, 0, 0.5);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 10px;
                            padding: 2px;
                            box-sizing: border-box;

                            .inner {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }

                        .circle-active {
                            .inner {
                                background-color: $blue;
                            }
                        }
                    }
                }

                .bottom {
                    padding: 10px;
                    background-color: #F8F8F8;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    .save, .cancel {
                        font-size: 14px;
                        color: white;
                        padding: 5px 20px;
                        background-color: $blue;
                        border-radius: 3px;

                        &:hover {
                            background-color: #148bdc;
                        }
                    }

                    .cancel {
                        color: #999999;
                        background-color: white;
                        border: 1px solid #aaaaaa;
                        margin-left: 10px;

                        &:hover {
                            border-color: #777777;
                            color: #777777;
                            background-color: white;
                        }
                    }
                }
            }
        }
    }
</style>