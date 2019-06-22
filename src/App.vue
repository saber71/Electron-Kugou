<template>
    <div id="app">
        <router-view></router-view>
        <div class="big-loading" v-show="visibleLoading"></div>
        <div class="success-img" v-show="visibleSuccess">
            <img src="./assets/success.png">
            <p>成功</p>
        </div>
        <div class="app-fail" v-show="visibleFail">
            <div class="dialog">
                <div class="banner">提示</div>
                <div class="top">
                    <img src="./assets/fail.png">
                    <span>{{failMessage}}</span>
                </div>
                <div class="bottom">
                    <button @click="visibleFail=false">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import {getPlayTimes, strNoVal} from "@/js/util";
    import {FAIL, LOADING, SUCCESS} from "@/js/event-bus";

    export default {
        name: 'app',
        errorCaptured(err, vm, info) {
            alert(info);
        },
        data() {
            return {
                visibleLoading: false,
                visibleSuccess: false,
                visibleFail: false,
                failMessage: ''
            }
        },
        created() {
            window.router = this.$router;
            window.store = this.$store;
            window.axios = this.$axios;
            window.state = store.state;
            Vue.mixin({
                methods: {
                    //格式化时间，参数单位秒
                    formatDuration(seconds) {
                        let minute = parseInt((seconds / 60) + '')
                        let second = seconds - minute * 60
                        return (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
                    },
                    //获取歌曲的播放次数
                    musicPlayTimes(music) {
                        return getPlayTimes(music)
                    },
                    //设置MainRight显示的页面
                    mainRightActive(val) {
                        store.commit('mainRightActive', val)
                    }
                }
            })
            eventBus.$on(LOADING, (val) => {
                this.visibleLoading = val
            })
            eventBus.$on(SUCCESS, () => {
                this.visibleSuccess = true
                setTimeout(() => {
                    this.visibleSuccess = false
                }, 1500)
            })
            eventBus.$on(FAIL, (msg) => {
                if (strNoVal(msg)) {
                    this.failMessage = '无法连接服务器，请检查网络'
                } else {
                    this.failMessage = msg
                }
                this.visibleFail = true
            })
        }
    }
</script>

<style lang="scss">
    @import "./style/common.scss";

    #app, html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

        .success-img {
            position: fixed;
            left: calc(50% - 50px);
            top: calc(50% - 50px);
            width: 100px;
            height: 100px;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            border-radius: 5px;
            border: 1px solid #BCBCBC;

            p {
                width: 100%;
                text-align: center;
                margin: 0;
            }
        }

        .app-fail {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);

            .dialog {
                width: 400px;
                margin: 170px auto 0;
                background-color: white;
                border-radius: 3px;
                overflow: hidden;

                .banner {
                    padding: 10px;
                    background-color: $blue;
                    color: white;
                    font-size: 12px;
                }

                .top {
                    display: flex;
                    align-items: center;
                    color: rgba(0, 0, 0, 0.7);
                    font-size: 15px;
                    padding: 20px 10px;

                    img {
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        margin-left: 10px;
                    }
                }

                .bottom {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding: 10px;

                    button {
                        font-size: 14px;
                        color: white;
                        padding: 5px 20px;
                        background-color: $blue;
                        border-radius: 3px;

                        &:hover {
                            background-color: #148bdc;
                        }
                    }
                }
            }
        }
    }

    * {
        list-style: none;
        outline: none;
    }

    img {
        display: block;
        width: fit-content;
    }

    button {
        border: none;
        cursor: pointer;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #D0D0D0;
        border-radius: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: rgba(242, 242, 242, 1);
    }

    ::-webkit-scrollbar-button {
        display: none;
    }

    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }
</style>
