<template>
    <div id="MusicRadio">
        <section class="radio-item" v-for="(v,index) in myRadioList" @mouseleave="hoverIndex=-1" @mouseenter="hoverIndex=index"
                 :class="{'radio-item-active':playingIndex===index}">
            <div class="left">
                <img :src="v.img">
            </div>
            <section class="center">
                <div class="top">
                    {{v.name}}
                    <div class="right">
                        <img class="triangle" title="播放" src="../../assets/sanjiao-gray.png" @click="play(index)" v-if="playingIndex!==index">
                        <div class="playing" title="暂停" @click="pause" v-else></div>
                        <div class="remove-icon" title="删除电台" @click="remove(index)"></div>
                    </div>
                </div>
                <div class="bottom">
                    <label :class="{'active-label':hoverIndex===index||playingIndex===index}">{{v.playing.name}}</label>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
    import ajax from "@/js/ajax";
    import {remove} from "@/js/util";
    import {PAUSE_RADIO, PLAY_RADIO, RADIO_NEXT, RADIO_PREV} from "@/js/event-bus";

    export default {
        name: "MusicRadio",
        props: {},
        data() {
            return {
                myRadioList: [],
                hoverIndex: -1,
                playingIndex: -1
            }
        },
        watch: {},
        computed: {},
        methods: {
            play(index) {
                this.playingIndex = index
                eventBus.$emit(PLAY_RADIO, this.myRadioList[index].playing)
            },
            pause() {
                this.playingIndex = -1
                eventBus.$emit(PAUSE_RADIO)
            },
            remove(index) {
                if (index === this.playingIndex) {
                    index = -1
                }
                remove(this.myRadioList, index)
            }
        },
        mounted() {
            eventBus.$on(RADIO_NEXT, (music) => {
                this.myRadioList[this.playingIndex].playing = music
            })
            eventBus.$on(RADIO_PREV, (music) => {
                this.myRadioList[this.playingIndex].playing = music
            })
        },
        async created() {
            this.myRadioList = (await ajax.getMyRadioList()).data
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/main-left/MusicRadio";
</style>