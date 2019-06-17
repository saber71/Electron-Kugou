<template>
    <div id="main-right">
        <section class="header">
            <div class="header-element"
                 :class="{'header-element-active':$store.state.mainRightActive===constant.MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY}"
                 title="最新最火歌曲尽在其中"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY)">乐库
            </div>
            <div class="header-element"
                 :class="{'header-element-active':$store.state.mainRightActive===constant.MAIN_RIGHT_ACTIVE_RADIO}"
                 title="享受随便听听的精彩"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_RADIO)">电台
            </div>
            <div class="header-element"
                 :class="{'header-element-active':$store.state.mainRightActive===constant.MAIN_RIGHT_ACTIVE_MUSIC_LIST}"
                 title="海量歌单想听就听"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_MUSIC_LIST)">歌单
            </div>
            <div class="header-element"
                 :class="{'header-element-active':$store.state.mainRightActive===constant.MAIN_RIGHT_ACTIVE_MV}"
                 title="随意点播百万MV"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_MV)">MV
            </div>
            <div class="header-element"
                 :class="{'header-element-active':$store.state.mainRightActive===constant.MAIN_RIGHT_ACTIVE_LIVE_BROADCAST}"
                 title="在线直播"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_LIVE_BROADCAST)">直播
            </div>
            <div class="header-element"
                 :class="{'header-element-active':$store.state.mainRightActive===constant.MAIN_RIGHT_ACTIVE_KTV}"
                 title="在线K歌"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_KTV)">KTV
            </div>
            <div class="header-element"
                 :class="{'header-element-active':$store.state.mainRightActive===constant.MAIN_RIGHT_ACTIVE_LYRIC}"
                 title="精准歌词搭配高清写真"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_LYRIC)">歌词
            </div>
            <div class="slide" :style="{'left':slideLeft}"
                 v-show="$store.state.mainRightActive<=constant.MAIN_RIGHT_ACTIVE_LYRIC"></div>
        </section>
    </div>
</template>

<script>
    import {
        MAIN_RIGHT_ACTIVE_BUY_SVIP,
        MAIN_RIGHT_ACTIVE_DEFAULT,
        MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT,
        MAIN_RIGHT_ACTIVE_KTV,
        MAIN_RIGHT_ACTIVE_LIVE_BROADCAST,
        MAIN_RIGHT_ACTIVE_LYRIC,
        MAIN_RIGHT_ACTIVE_MUSIC_LIST,
        MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY,
        MAIN_RIGHT_ACTIVE_MUSIC_SPACE, MAIN_RIGHT_ACTIVE_MV, MAIN_RIGHT_ACTIVE_RADIO
    } from "@/js/_const";

    export default {
        name: "MainRight",
        props: {},
        data() {
            return {
                constant: {
                    MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY,
                    MAIN_RIGHT_ACTIVE_MUSIC_SPACE,
                    MAIN_RIGHT_ACTIVE_MUSIC_LIST,
                    MAIN_RIGHT_ACTIVE_LYRIC,
                    MAIN_RIGHT_ACTIVE_LIVE_BROADCAST,
                    MAIN_RIGHT_ACTIVE_MV,
                    MAIN_RIGHT_ACTIVE_KTV,
                    MAIN_RIGHT_ACTIVE_RADIO,
                    MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT,
                    MAIN_RIGHT_ACTIVE_DEFAULT,
                    MAIN_RIGHT_ACTIVE_BUY_SVIP,
                },
            }
        },
        watch: {},
        computed: {
            slideLeft() {
                let res = '0'
                switch (store.state.mainRightActive) {
                    case MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY:
                        res = '50% - 231px';
                        break
                    case MAIN_RIGHT_ACTIVE_RADIO:
                        res = '50% - 160px';
                        break
                    case MAIN_RIGHT_ACTIVE_MUSIC_LIST:
                        res = '50% - 88px';
                        break
                    case MAIN_RIGHT_ACTIVE_MV:
                        res = '50% - 20px';
                        break
                    case MAIN_RIGHT_ACTIVE_LIVE_BROADCAST:
                        res = '50% + 48px';
                        break
                    case MAIN_RIGHT_ACTIVE_KTV:
                        res = '50% + 120px';
                        break
                    case MAIN_RIGHT_ACTIVE_LYRIC:
                        res = '50% + 190px';
                        break
                }
                return 'calc(' + res + ')'
            }
        },
        methods: {},
        mounted() {

        },
        created() {
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/main-right";
</style>