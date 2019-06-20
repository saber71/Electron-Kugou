<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from "vue";
    import {getPlayTimes} from "@/js/util";

    export default {
        name: 'app',
        errorCaptured(err, vm, info) {
            alert(info);
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
                        let minute = parseInt(seconds / 60)
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
        }
    }
</script>

<style>
    #app, html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
</style>
