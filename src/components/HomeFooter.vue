<template>
    <div id="HomeFooter">
        <div class="prev" @click="prev" title="上一首"><img src="../assets/triangle-white.png"/></div>
        <div class="play" @click="play" title="播放">
            <img src="../assets/triangle-white.png" v-show="!playing"/>
            <div class="two-line" v-show="playing"></div>
        </div>
        <div class="next" @click="next" title="上一首"><img src="../assets/triangle-white.png"/></div>
        <div class="progress-bar">
            <div class="top" @click.stop="">
                <div class="name">
                    <div class="music-name" v-if="playingMusic">
                        <label class="quality">{{ playingMusic.quality }}</label>
                        <div class="banner" ref="banner">
                            <div class="text" ref="text">{{ playingMusic.name }}</div>
                            <div class="text-move" ref="text1" id="text1" :style="{ left: text1Left + 'px' }">{{
                                playingMusic.name }}
                            </div>
                            <div class="text-move" v-if="bannerCanScroll" ref="text2" id="text2"
                                 :style="{ left: text2Left + 'px' }">{{ playingMusic.name }}
                            </div>
                        </div>
                    </div>
                    <span v-else>酷狗音乐</span>
                </div>
                <div class="speed" tabindex="0" @click="visibleSpeedPopup = !visibleSpeedPopup"
                     @blur="visibleSpeedPopup = false">
                    倍速
                    <div class="popup" v-show="visibleSpeedPopup" @click.stop=""></div>
                </div>
            </div>
            <div class="bottom">
                <div
                        class="line"
                        title="调整歌曲进度条"
                        @click="clickProgressBar"
                        ref="progressBar"
                        @mouseup="onCircleMouseUp"
                        @mousedown="onCircleMouseDown"
                        @mousemove="onCircleMove($event)"
                        @mouseleave="onCircleMouseLeave"
                >
                    <div class="passed" v-if="playingMusic" :style="{ width: progressBarPassedWidth + 'px' }">
                        <div class="circle"></div>
                    </div>
                </div>
                <label>{{ formatDuration(duration.now) }} / {{ duration.total }}</label>
            </div>
        </div>
        <img class="love" src="../assets/love-red.png" v-if="isLove()" @click="clickLove"/>
        <img class="love" src="../assets/love-white.png" v-else title="我喜欢" @click="clickLove"/>
        <img class="download" src="../assets/download-white.png" title="下载"/>
        <img class="more" src="../assets/more-white.png" title="更多"/>
        <div class="loop" tabindex="0" @click="visibleLoopPopup = true" @blur="visibleLoopPopup = false">
            <img src="../assets/play-single.png" title="单曲播放" v-if="loopType === 0"/>
            <img src="../assets/loop-single.png" title="单曲循环" v-else-if="loopType === 1"/>
            <img src="../assets/loop-order.png" title="顺序播放" v-else-if="loopType === 2"/>
            <img src="../assets/loop-list.png" title="列表循环" v-else-if="loopType === 3"/>
            <img src="../assets/loop-random.png" title="随机播放" v-else-if="loopType === 4"/>
            <div class="popup" v-show="visibleLoopPopup" @click.stop="">
                <div class="content">
                    <div class="item" @click="loopType = 0">
                        <img src="../assets/play-single.png"/>
                        单曲播放
                    </div>
                    <div class="item" @click="loopType = 1">
                        <img src="../assets/loop-single.png"/>
                        单曲循环
                    </div>
                    <div class="item" @click="loopType = 2">
                        <img src="../assets/loop-order.png"/>
                        顺序播放
                    </div>
                    <div class="item" @click="loopType = 3">
                        <img src="../assets/loop-list.png"/>
                        列表循环
                    </div>
                    <div class="item" @click="loopType = 4">
                        <img src="../assets/loop-random.png"/>
                        随机播放
                    </div>
                </div>
                <div class="triangle"></div>
            </div>
        </div>
        <div class="sound" @mouseleave="visibleSoundPopup = false" @mouseenter="visibleSoundPopup = true">
            <img src="../assets/sound-white.png" title="音量" @click="clickSound"/>
            <div class="popup" v-show="visibleSoundPopup">
                <div class="content" @mousedown="onVolumeDown" @mouseleave="onVolumeUp"
                     @mousemove="onVolumeMove($event)" @mouseup="onVolumeUp">
                    <div class="line" ref="volumeLine" :title="volumeValue">
                        <div class="inner" :style="{ height: soundInnerHeight + 'px' }"></div>
                    </div>
                    <div class="circle" :style="{ bottom: soundCircleTop + 'px' }" :title="volumeValue"
                         ref="volumeCircle"></div>
                </div>
                <div class="down"></div>
            </div>
        </div>
        <div class="special" title="蝰蛇音效">
            音效
            <div class="popup"></div>
        </div>
        <div class="lyric">词</div>
        <img class="chat" src="../assets/chat-white.png" title="评论"/>
        <div class="play-list" tabindex="0" @blur="visiblePlayListPopup = false">
            <img src="../assets/play-list.png" title="播放列表" @click="visiblePlayListPopup = !visiblePlayListPopup"/>
            <span class="count" @click="visiblePlayListPopup = !visiblePlayListPopup">{{ playList.length >= 100 ? '99+' : playList.length }}</span>
            <div class="popup" v-show="visiblePlayListPopup">
                <div class="banner">
                    <label class="left">播放列表</label>
                    <div class="right">
                        <img src="../assets/remove.png" title="清空队列"/>
                        <img class="close" src="../assets/close-black.png" @click="visiblePlayListPopup = false"
                             title="收起队列"/>
                    </div>
                </div>
                <div class="content">
                    <div class="item" v-for="(v, index) in playList" :key="index"
                         :class="{ 'item-active': activeIndex === index }" @dblclick="onDblClickPlayListItem(v, index)">
                        <div class="left">{{ v.name }}</div>
                        <div class="right">
                            <img class="playing" src="../assets/chart-blue.png" v-if="activeIndex === index"/>
                            <div class="operation">
                                <img src="../assets/love-red.png" v-if="v.love" @click="v.love = false"/>
                                <img src="../assets/love.png" v-else @click="v.love = true" title="我喜欢"/>
                                <img src="../assets/remove.png" title="删除" @click="removeFromPlayList(index)"/>
                                <div ref="moreIcon" class="more" @click="clickMore($event)" @mouseleave="visibleMorePopup=false">
                                    <img src="../assets/more.png" title="更多"/>
                                    <div ref="morePopup" class="more-popup" v-show="visibleMorePopup" @click.stop="" :style="{top:morePopupTop+'px'}">
                                        <div class="element">相似歌曲</div>
                                        <div class="element">
                                            添加到列表
                                            <div class="sub-popup">
                                                <h6>本地列表</h6>
                                                <div class="sub-element" v-for="(v,index) in $store.getters.localList('最近播放')" :key='index'>{{v.name}}</div>
                                                <h6>网络列表</h6>
                                                <div class="sub-element" v-for="(v,index) in $store.state.netMusicList" :key='index'>{{v.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label class="duration">{{ formatDuration(v.duration) }}</label>
                        </div>
                    </div>
                </div>
                <div class="triangle"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ADD_TO_PLAY_LIST, PUSH_TO_PLAY_LIST, SET_PLAY_LIST, SET_PLAYING_MUSIC} from '@/js/event-bus';
    import {getLocalStorageItem, remove, setLocalStorageItem} from '@/js/util';
    import {ranInteger} from '@/js/mock-random';
    import {playingIndexKey, playListKey} from '@/js/_const';

    let audio = new Audio();

    const volumeValueKey = 'volumeValue';
    const playbackRateKey = 'playbackRate';
    const soundCircleTopKey = 'soundCircleTop'
    const soundInnerHeightKey = 'soundInnerHeight'
    export default {
        name: 'HomeFooter',
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
                bannerCanScroll: false,
                text1Left: 0,
                text2Left: 0,
                progressBarPassedWidth: 0,
                durationHandler: 0,
                circleMouseDown: false,
                oldWidth: 0,
                progressBarEl: undefined,
                oldVolumeValue: 0,
                volumeValue: getLocalStorageItem(volumeValueKey, 1),
                playbackRate: getLocalStorageItem(playbackRateKey, 1),
                soundCircleTop: getLocalStorageItem(soundCircleTopKey, 5),
                soundInnerHeight: getLocalStorageItem(soundInnerHeightKey, 0),
                volumeLineEl: undefined,
                volumeCircleEl: undefined,
                volumeCircleDown: false,
                loopType: 0,
                visibleLoopPopup: false,
                visiblePlayListPopup: false,
                playList: getLocalStorageItem(playListKey, []),
                activeIndex: getLocalStorageItem(playingIndexKey, 0),
                playingMusic: undefined,
                visibleMorePopup: false,
                morePopupTop: 0
            };
        },
        watch: {
            soundCircleTop() {
                setLocalStorageItem(soundCircleTopKey, this.soundCircleTop)
            },
            soundInnerHeight() {
                setLocalStorageItem(soundInnerHeightKey, this.soundInnerHeight)
            },
            playingMusic() {
                this.canScroll();
                this.playing = false;
                this.play();
                this.progressBarPassedWidth = 0;
                this.duration.now = 0;
                this.duration.total = this.formatDuration(this.playingMusic.duration);
                this.progressBarPassedWidth = 0;
                this.onAudioEnded();
            },
            activeIndex(newVal) {
                setLocalStorageItem(playingIndexKey, newVal);
            },
            playList(newVal) {
                setLocalStorageItem(playListKey, newVal);
            },
            loopType() {
                this.visibleLoopPopup = false;
            },
            playbackRate() {
                if (audio) {
                    audio.playbackRate = this.playbackRate;
                }
                setLocalStorageItem(playbackRateKey, this.playbackRate);
            },
            volumeValue(newVal, oldVal) {
                this.oldVolumeValue = oldVal;
                if (audio) {
                    audio.volumeValue = newVal;
                }
            },
            'duration.now'(newVal) {
                const progressBar = this.$refs.progressBar;
                this.progressBarPassedWidth = parseInt((newVal / this.playingMusic.duration) * progressBar.getBoundingClientRect().width + '');
            }
        },
        computed: {},
        methods: {
            clickMore(ev) {
                const y = ev.clientY
                this.morePopupTop = y
                this.visibleMorePopup = !this.visibleMorePopup
            },
            onDblClickPlayListItem(music, index) {
                this.playingMusic = music;
                this.activeIndex = index;
            },
            removeFromPlayList(index) {
                remove(this.playList, index);
                if (index === this.activeIndex) {
                    this.activeIndex = -1;
                }
            },
            onVolumeUp() {
                if (this.volumeCircleDown) {
                    this.volumeCircleDown = false;
                    setLocalStorageItem(volumeValueKey, this.volumeValue);
                }
            },
            onVolumeMove(ev) {
                if (this.volumeCircleDown) {
                    const lineBound = this.volumeLineEl.getBoundingClientRect();
                    const clientY = ev.clientY;
                    const lineTopY = lineBound.y;
                    const lineHeight = lineBound.height;
                    if (clientY <= lineTopY) {
                        this.soundCircleTop = lineHeight + 5;
                    } else if (lineTopY + lineHeight <= clientY) {
                        this.soundCircleTop = 5;
                    } else {
                        const toLineBottom = lineTopY + lineHeight - clientY;
                        this.soundCircleTop = toLineBottom + 5;
                    }
                    this.soundInnerHeight = this.soundCircleTop - 5;
                    this.volumeValue = (this.soundCircleTop - 5) / lineHeight;
                }
            },
            onVolumeDown() {
                this.volumeCircleDown = true;
            },
            clickSound() {
                if (this.volumeValue === 0) {
                    this.volumeValue = this.oldVolumeValue;
                } else {
                    this.volumeValue = 0;
                }
            },
            setAudioPlayDuration() {
                if (audio) {
                    audio.currentTime = this.duration.now % this.playingMusic.duration;
                    this.playing = true;
                }
            },
            onCircleMouseDown() {
                this.oldWidth = this.progressBarPassedWidth;
                this.circleMouseDown = true;
            },
            onCircleMove(ev) {
                if (this.circleMouseDown) {
                    const x = ev.clientX;
                    this.setProgressBar(x - this.progressBarEl.getBoundingClientRect().x);
                }
            },
            onCircleMouseUp() {
                this.circleMouseDown = false;
                this.setAudioPlayDuration();
            },
            onCircleMouseLeave() {
                if (this.circleMouseDown) {
                    this.onCircleMouseUp();
                }
            },
            setDurationNow() {
                this.duration.now = parseInt((this.progressBarPassedWidth / this.progressBarEl.getBoundingClientRect().width) * this.playingMusic.duration + '');
            },
            setProgressBar(position) {
                const progressBar = this.progressBarEl;
                position = progressBar.getBoundingClientRect().width > position ? position : progressBar.getBoundingClientRect().width;
                this.progressBarPassedWidth = position;
                this.setDurationNow();
            },
            clickProgressBar(ev) {
                const progressBar = this.progressBarEl;
                const x = ev.clientX;
                const position = x - progressBar.getBoundingClientRect().x;
                this.setProgressBar(position);
            },
            canScroll() {
                const banner = this.$refs.banner;
                const text = this.$refs.text1;
                this.text1Left = 0;
                if (banner && text) {
                    this.bannerCanScroll = text.getBoundingClientRect().width > banner.getBoundingClientRect().width;
                    if (this.bannerCanScroll) {
                        this.$nextTick(() => {
                            this.text2Left = text.getBoundingClientRect().width + 20;
                        });
                    }
                }
            },
            clickLove() {
                if (this.playingMusic) {
                    this.playingMusic.love = !this.playingMusic.love;
                }
            },
            isLove() {
                if (this.playingMusic) {
                    return this.playingMusic.love;
                }
                return false;
            },
            prev() {
                if (this.activeIndex < 0) {
                    this.activeIndex = 0;
                }
                audio.src = undefined;
                switch (this.loopType) {
                    case 0:
                    case 1:
                    case 2:
                        if (this.activeIndex > 0) {
                            this.activeIndex--;
                            this.playingMusic = this.playList[this.activeIndex];
                            this.play();
                        }
                        break;
                    case 3:
                        this.activeIndex--;
                        if (this.activeIndex < 0) {
                            this.activeIndex = this.playList.length - 1;
                        }
                        this.playingMusic = this.playList[this.activeIndex];
                        this.play();
                        break;
                    case 4:
                        this.activeIndex = ranInteger(0, this.playList.length);
                        this.playingMusic = this.playList[this.activeIndex];
                        this.play();
                        break;
                }
            },
            next() {
                if (this.activeIndex < 0) {
                    this.activeIndex = 0;
                }
                audio.src = undefined;
                switch (this.loopType) {
                    case 0:
                    case 1:
                    case 2:
                        if (this.activeIndex < this.playList.length) {
                            this.activeIndex++;
                            this.playingMusic = this.playList[this.activeIndex];
                            this.play();
                        }
                        break;
                    case 3:
                        this.activeIndex++;
                        if (this.activeIndex >= this.playList.length) {
                            this.activeIndex = 0;
                        }
                        this.playingMusic = this.playList[this.activeIndex];
                        this.play();
                        break;
                    case 4:
                        this.activeIndex = ranInteger(0, this.playList.length);
                        this.playingMusic = this.playList[this.activeIndex];
                        this.play();
                        break;
                }
            },
            play() {
                if (this.activeIndex < 0) {
                    this.activeIndex = 0;
                }
                this.playing = !this.playing;
                if (this.playing) {
                    if (!audio.src) {
                        audio.src = this.playingMusic.file;
                        audio.currentTime = 0;
                    }
                    audio.play();
                    this.durationHandler = setInterval(() => {
                        if (this.circleMouseDown) {
                            return;
                        }
                        if (this.duration.now >= this.playingMusic.duration) {
                            this.onAudioEnded();
                        } else {
                            if (audio.readyState === 4) {
                                this.duration.now++;
                            }
                        }
                    }, 1000);
                } else {
                    audio.pause();
                    clearInterval(this.durationHandler);
                }
            },
            onAudioEnded() {
                if (audio && audio.duration >= this.playingMusic.duration) {
                    audio.pause();
                    this.playing = false;
                    clearInterval(this.durationHandler);
                    switch (this.loopType) {
                        case 0:
                            break;
                        case 1:
                            this.playing = true;
                            audio.play();
                            break;
                        case 2:
                        case 3:
                        case 4:
                            this.next();
                            break;
                    }
                }
            },
            pushToPlayList(val) {
                for (let i = 0; i < val.length; i++) {
                    this.playList.push(val[i]);
                }
            },
            addToPlayList(val) {
                if (val instanceof Array) {
                    this.playList.splice(this.activeIndex, 0, ...val);
                } else {
                    this.playList.splice(this.activeIndex, 0, val);
                }
            },
            setPlayList(list, index) {
                this.playList = list;
                this.activeIndex = index;
            }
        },
        mounted() {
            this.volumeLineEl = this.$refs.volumeLine;
            this.progressBarEl = this.$refs.progressBar;
            this.volumeCircleEl = this.$refs.volumeCircle;
            let text1 = undefined,
                text2 = undefined;
            let banner = undefined;
            setInterval(() => {
                if (this.bannerCanScroll) {
                    if (!banner) {
                        banner = this.$refs.banner;
                    }
                    if (!text1) {
                        text1 = this.$refs.text1;
                    }
                    if (!text2) {
                        text2 = this.$refs.text2;
                    }
                    const bound1 = text1.getBoundingClientRect();
                    const bound2 = text2.getBoundingClientRect();
                    this.text1Left -= 10;
                    if (this.text1Left < -bound1.width) {
                        console.log(bound2.width + bound2.x - banner.getBoundingClientRect().x + ' ' + bound2.width + '  ' + bound2.x + ' ' + banner.getBoundingClientRect().x);
                        this.text1Left = bound2.width + bound2.x - banner.getBoundingClientRect().x + 20;
                    }
                    this.text2Left -= 10;
                    if (this.text2Left < -bound2.width) {
                        console.log(bound1.width + bound1.x - banner.getBoundingClientRect().x + ' ' + bound1.width + '  ' + bound1.x + ' ' + banner.getBoundingClientRect().x);
                        this.text2Left = bound1.width + bound1.x - banner.getBoundingClientRect().x + 20;
                    }
                }
            }, 500);
        },
        created() {
            audio.volume = this.volumeValue;
            audio.playbackRate = this.playbackRate;
            audio.controls = false;
            audio.autoplay = true;
            audio.onended = this.onAudioEnded;
            audio.loop = true;
            eventBus.$on(ADD_TO_PLAY_LIST, this.addToPlayList);
            eventBus.$on(SET_PLAY_LIST, this.setPlayList);
            eventBus.$on(PUSH_TO_PLAY_LIST, this.pushToPlayList);
            eventBus.$on(SET_PLAYING_MUSIC, obj => {
                this.playingMusic = obj.music;
                this.setPlayList(obj.musics, obj.index);
            });
        },
        destroyed() {
        }
    };
</script>

<style scoped lang="scss">
    @import '../style/home-footer';
</style>
