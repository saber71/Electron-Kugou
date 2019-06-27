<template>
    <div id="HomeFooter">
        <div class="prev" @click="prev" title="上一首">
            <img src="../assets/triangle-white.png">
        </div>
        <div class="play" @click="play" title="播放">
            <img src="../assets/triangle-white.png" v-show="!playing">
            <div class="two-line" v-show="playing"></div>
        </div>
        <div class="next" @click="next" title="上一首">
            <img src="../assets/triangle-white.png">
        </div>
        <div class="progress-bar">
            <div class="top" @click.stop="">
                <div class="name">
                    <div class="music-name" v-if="playingMusic">
                        <label class="quality">{{playingMusic.quality}}</label>
                        <div class="banner" ref="banner">
                            <div class="text" ref="text">{{playingMusic.name}}</div>
                            <div class="text-move" ref="text1" id="text1"
                                 :style="{left:text1Left+'px'}">
                                {{playingMusic.name}}
                            </div>
                            <div class="text-move" v-if="bannerCanScroll" ref="text2" id="text2"
                                 :style="{left:text2Left+'px'}">
                                {{playingMusic.name}}
                            </div>
                        </div>
                    </div>
                    <span v-else>酷狗音乐</span>
                </div>
                <div class="speed" tabindex="0" @click="visibleSpeedPopup=!visibleSpeedPopup"
                     @blur="visibleSpeedPopup=false">
                    倍速
                    <div class="popup" v-show="visibleSpeedPopup" @click.stop="">
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="line" title="调整歌曲进度条" @click="clickProgressBar" ref="progressBar" @mouseup="onCircleMouseUp"
                     @mousedown="onCircleMouseDown" @mousemove="onCircleMove($event)" @mouseleave="onCircleMouseLeave">
                    <div class="passed" v-if="playingMusic" :style="{width:progressBarPassedWidth+'px'}">
                        <div class="circle"></div>
                    </div>
                </div>
                <label>{{formatDuration(duration.now)}} / {{duration.total}}</label>
            </div>
        </div>
        <img class="love" src="../assets/love-red.png" v-if="isLove">
        <img class="love" src="../assets/love.png" v-else title="我喜欢">
        <img class="download" src="../assets/download-white.png" title="下载">
        <img class="more" src="../assets/more-white.png" title="更多">
        <div class="loop">
            <img src="../assets/loop-white.png" title="列表循环">
        </div>
        <div class="sound" @mouseleave="visibleSoundPopup=false" @mouseenter="visibleSoundPopup=true">
            <img src="../assets/sound-white.png" title="音量" @click="clickSound">
            <div class="popup" v-show="visibleSoundPopup">
                <div class="content">
                    <div class="line">
                        <div class="inner" :style="{height:soundInnerHeight+'px'}"></div>
                    </div>
                    <div class="circle" :style="{bottom:soundCircleTop+'px'}" :title="volumeValue"></div>
                </div>
                <div class="down"></div>
            </div>
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
    import {SET_PLAYING_INDEX} from "@/js/store/mutations_name";
    import {getLocalStorageItem, setLocalStorageItem} from "@/js/util";

    let audio = undefined
    let playList = []
    let activeIndex = 0

    const volumeValueKey = 'volumeValue'
    const playbackRateKey = 'playbackRate'
    export default {
        name: "HomeFooter",
        props: {},
        data() {
            return {
                visibleSpeedPopup: false,
                visibleSoundPopup: false,
                duration: {
                    now: 0,
                    total: '00:00'
                },
                playing: false,
                playingMusicCount: 0,
                bannerCanScroll: false,
                text1Left: 0,
                text2Left: 0,
                progressBarPassedWidth: 120,
                durationHandler: 0,
                circleMouseDown: false,
                oldWidth: 0,
                progressBarEl: undefined,
                oldVolumeValue: 0,
                volumeValue: getLocalStorageItem(volumeValueKey, 1),
                playbackRate: getLocalStorageItem(playbackRateKey, 1),
                soundCircleTop: 5,
                soundInnerHeight: 0
            }
        },
        watch: {
            playbackRate() {
                audio.playbackRate = this.playbackRate
                setLocalStorageItem(playbackRateKey, this.playbackRate)
            },
            volumeValue(newVal, oldVal) {
                this.oldVolumeValue = oldVal
                audio.volumeValue = newVal
                setLocalStorageItem(volumeValueKey, this.volumeValue)
            },
            playingMusicCount() {
                this.canScroll()
                this.playing = false
                this.play()
                this.progressBarPassedWidth = 0
                this.duration.now = 0
                this.duration.total = this.formatDuration(this.playingMusic.duration)
                this.progressBarPassedWidth = 0
                this.onAudioEnded()
            },
            'duration.now'(newVal) {
                const progressBar = this.$refs.progressBar
                this.progressBarPassedWidth = parseInt((newVal / this.playingMusic.duration * progressBar.getBoundingClientRect().width) + '')
            }
        },
        computed: {
            playingMusic() {
                const music = store.state.playingMusic
                if (music) {
                    this.playingMusicCount++
                }
                return music
            },
        },
        methods: {
            clickSound() {
                if (this.volumeValue === 0) {
                    this.volumeValue = this.oldVolumeValue
                } else {
                    this.volumeValue = 0
                }
            },
            setAudioPlayDuration() {
                //    todo 音频的播放位置
                if (audio) {
                    audio.currentTime = this.duration.now % this.playingMusic.duration
                    this.playing = true
                }
            },
            onCircleMouseDown() {
                this.oldWidth = this.progressBarPassedWidth
                this.circleMouseDown = true
            },
            onCircleMove(ev) {
                if (this.circleMouseDown) {
                    const x = ev.clientX
                    this.setProgressBar(x - this.progressBarEl.getBoundingClientRect().x)
                }
            },
            onCircleMouseUp() {
                this.circleMouseDown = false
                this.setAudioPlayDuration()
            },
            onCircleMouseLeave() {
                if (this.circleMouseDown) {
                    this.onCircleMouseUp()
                }
            },
            setDurationNow() {
                this.duration.now = parseInt((this.progressBarPassedWidth / this.progressBarEl.getBoundingClientRect().width * this.playingMusic.duration) + '')
            },
            setProgressBar(position) {
                const progressBar = this.progressBarEl
                position = progressBar.getBoundingClientRect().width > position ? position : progressBar.getBoundingClientRect().width
                this.progressBarPassedWidth = position
                this.setDurationNow()
            },
            clickProgressBar(ev) {
                const progressBar = this.progressBarEl
                const x = ev.clientX
                const position = x - progressBar.getBoundingClientRect().x
                this.setProgressBar(position)
            },
            canScroll() {
                const banner = this.$refs.banner
                const text = this.$refs.text1
                this.text1Left = 0
                if (banner && text) {
                    this.bannerCanScroll = text.getBoundingClientRect().width > banner.getBoundingClientRect().width
                    if (this.bannerCanScroll) {
                        this.$nextTick(() => {
                            this.text2Left = text.getBoundingClientRect().width + 20
                        })
                    }
                }
            },
            isLove() {
                return playList[activeIndex].love
            },
            prev() {
                if (activeIndex > 0) {
                    activeIndex--
                    store.commit(SET_PLAYING_INDEX, activeIndex)
                    this.play(true)
                }
            },
            next() {
                if (activeIndex < playList.length) {
                    activeIndex++
                    store.commit(SET_PLAYING_INDEX, activeIndex)
                    this.play(true)
                }
            },
            play() {
                this.playing = !this.playing
                if (this.playing) {
                    if (!audio) {
                        audio = new Audio(this.playingMusic.file)
                        audio.controls = false
                        audio.autoplay = true
                        audio.onended = this.onAudioEnded
                        audio.loop = true
                        audio.volume = this.volumeValue
                        audio.playbackRate = this.playbackRate
                    }
                    audio.play()
                    this.durationHandler = setInterval(() => {
                        if (this.circleMouseDown) {
                            return
                        }
                        if (this.duration.now >= this.playingMusic.duration) {
                            this.onAudioEnded()
                        } else {
                            if (audio.readyState === 4) {
                                this.duration.now++
                            }
                        }
                    }, 1000)
                } else {
                    audio.pause()
                    clearInterval(this.durationHandler)
                }
            },
            onAudioEnded() {
                if (audio && audio.duration >= this.playingMusic.duration) {
                    audio.pause()
                    audio = undefined
                    this.playing = false
                    clearInterval(this.durationHandler)
                    this.next()
                }
            }
        },
        mounted() {
            this.progressBarEl = this.$refs.progressBar
            let text1 = undefined, text2 = undefined
            let banner = undefined
            setInterval(() => {
                if (this.bannerCanScroll) {
                    if (!banner) {
                        banner = this.$refs.banner
                    }
                    if (!text1) {
                        text1 = this.$refs.text1
                    }
                    if (!text2) {
                        text2 = this.$refs.text2
                    }
                    const bound1 = text1.getBoundingClientRect()
                    const bound2 = text2.getBoundingClientRect()
                    this.text1Left -= 10
                    if (this.text1Left < -bound1.width) {
                        console.log((bound2.width + bound2.x - banner.getBoundingClientRect().x) + ' ' + bound2.width + '  ' + bound2.x + ' ' + banner.getBoundingClientRect().x)
                        this.text1Left = bound2.width + bound2.x - banner.getBoundingClientRect().x + 20
                    }
                    this.text2Left -= 10
                    if (this.text2Left < -bound2.width) {
                        console.log((bound1.width + bound1.x - banner.getBoundingClientRect().x) + ' ' + bound1.width + '  ' + bound1.x + ' ' + banner.getBoundingClientRect().x)
                        this.text2Left = bound1.width + bound1.x - banner.getBoundingClientRect().x + 20
                    }
                }
            }, 500)
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