<template>
    <div id="HomeFooter">
        <div class="prev" @click="prev" title="上一首">
            <img src="../assets/triangle-white.png">
        </div>
        <div class="play" @click="play" title="播放">
            <img src="../assets/triangle-white.png">
        </div>
        <div class="next" @click="next" title="上一首">
            <img src="../assets/triangle-white.png">
        </div>
        <div class="progress-bar">
            <div class="top">
                <label class="name">酷狗音乐</label>
                <div class="speed" tabindex="0" @click="visibleSpeedPopup=!visibleSpeedPopup"
                     @blur="visibleSpeedPopup=false">
                    倍速
                    <div class="popup" v-show="visibleSpeedPopup" @click.stop="">

                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="line" title="调整歌曲进度条"></div>
                <label>{{duration.now}} / {{duration.total}}</label>
            </div>
        </div>
        <img class="love" src="../assets/love-red.png" v-if="isLove">
        <img class="love" src="../assets/love.png" v-else title="我喜欢">
        <img class="download" src="../assets/download-white.png" title="下载">
        <img class="more" src="../assets/more-white.png" title="更多">
        <div class="loop">
            <img src="../assets/loop-white.png" title="列表循环">
        </div>
        <div class="sound">
            <img src="../assets/sound-white.png" title="音量">
        </div>
        <div class="special" title="蝰蛇音效">
            音效
            <div class="popup">
            </div>
        </div>
        <div class="lyric">词</div>
        <img class="chat" src="../assets/chat-white.png" title="评论">
        <div class="play-list">
            <img src="../assets/play-list.png" title="播放列表">
        </div>
    </div>
</template>

<script>
    import {ADD_TO_PLAY_LIST, PUSH_TO_PLAY_LIST, SET_PLAY_LIST} from "@/js/event-bus";

    let audio = undefined
    let playList = []
    let activeIndex = 0

    export default {
        name: "HomeFooter",
        props: {},
        data() {
            return {
                visibleSpeedPopup: false,
                duration: {
                    now: '00:00',
                    total: '00:00'
                }
            }
        },
        watch: {},
        computed: {},
        methods: {
            isLove() {
                return playList[activeIndex].love
            },
            prev() {
                if (activeIndex > 0) {
                    activeIndex--
                    store.state.playingIndex--
                    this.play(true)
                }
            },
            next() {
                if (activeIndex < playList.length) {
                    activeIndex++
                    store.state.playingIndex++
                    this.play(true)
                }
            },
            play(playNewMusic) {
                if (playNewMusic || !audio) {
                    const music = playList[activeIndex]
                    audio = new Audio(music.file)
                    audio.play()
                }
            },
        },
        mounted() {
        },
        created() {
            playList = store.state.playList
            activeIndex = store.state.playingIndex
            eventBus.$on(ADD_TO_PLAY_LIST, addToPlayList)
            eventBus.$on(SET_PLAY_LIST, setPlayList)
            eventBus.$on(PUSH_TO_PLAY_LIST, pushToPlayList)
        },
        destroyed() {
        }
    }

    function pushToPlayList(val) {
        for (let i = 0; i < val.length; i++) {
            playList.push(val[i])
        }
    }

    function addToPlayList(val) {
        if (val instanceof Array) {
            playList.splice(activeIndex, 0, ...val)
        } else {
            playList.splice(activeIndex, 0, val)
        }
    }

    function setPlayList(list, index) {
        playList = list
        activeIndex = index
    }
</script>

<style scoped lang="scss">
    @import "../style/home-footer";
</style>