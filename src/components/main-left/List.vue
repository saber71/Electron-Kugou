<template>
    <div id="list">
        <section class="header" @click="visibleContainer=!visibleContainer" ref="header">
            <div class="left">
                <img :class="{'arrow-down':visibleContainer}" src="../../assets/arrow-down-dark.png">
                <label class="name">{{name}}</label>
                <span class="size"> [{{size}}]</span>
            </div>
            <div class="right">
                <slot name="header"></slot>
            </div>
        </section>
        <div class="list-popup" v-show="visiblePopup">
            <div class="mask" @click="clickMask"></div>
            <div class="content" :style="{top:popupTop}" ref="popup">
                <div class="item" v-if="!popupHiddenOptions.newList"
                     @click="newList"><label>新建列表</label></div>
                <div class="item"
                     v-if="!popupHiddenOptions.addMusic">
                    <label>
                        添加歌曲
                    </label>
                    <div class="sub">
                        <div class="sub-item"><label>添加本地歌曲...</label></div>
                        <div class="sub-item"><label>添加本地歌曲文件夹...</label></div>
                    </div>
                </div>
                <div class="item"
                     v-if="!popupHiddenOptions.addList">
                    <label>
                        添加到列表
                    </label>
                    <div class="sub">
                        <div class="sub-item"><label>默认列表</label></div>
                        <div class="sub-item"><label>第三方列表</label></div>
                        <div class="sub-item" v-for="(v) in $store.state.customList"><label>{{v.name}}</label></div>
                    </div>
                </div>
                <div class="item" v-if="!popupHiddenOptions.later"><label>稍后播</label></div>
                <div class="item" v-if="!popupHiddenOptions.addPlayList"><label>添加到播放列表</label></div>
                <div class="item"
                     v-if="!popupHiddenOptions.sort">
                    <label>
                        排序
                    </label>
                    <div class="sub">
                        <div class="sub-item"><label>按文件名</label></div>
                        <div class="sub-item"><label>按歌手</label></div>
                        <div class="sub-item"><label>按添加时间</label></div>
                        <div class="sub-item"><label>按播放次数</label></div>
                        <div class="sub-item" @click="randomSort"><label>随机排序</label></div>
                    </div>
                </div>
                <div class="item" v-if="!popupHiddenOptions.collection"><label>收藏整个列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.clear"><label>清空列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.remove"><label>删除列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.rename" @click="rename"><label>重命名</label>
                </div>
            </div>
        </div>
        <section class="container" :style="{height:visibleContainer?'fit-content':'0'}">
            <div class="music-content" ref="music-content">
                <slot name="items"></slot>
            </div>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {isReachMainLeftBottom, objNoVal} from "@/js/util";
    import {INPUT} from "@/js/event-bus";

    export default {
        name: "List",
        model: {
            prop: 'visiblePopup',
            event: 'change'
        },
        props: {
            name: {
                type: String,
                required: true
            },
            size: {
                type: Number,
                default: 0
            },
            visiblePopup: Boolean,
            popupHiddenOption: {
                type: Object,
                required: false
            }
        },
        data() {
            return {
                visibleContainer: false,
                popupHiddenOptions: {},
                popupTop: 0,
            }
        },
        watch: {
            visiblePopup(newVal) {
                if (newVal) {
                    this.$nextTick(() => {
                        const popup = this.$refs['popup']
                        const header = this.$refs['header']
                        const toTop = header.getBoundingClientRect().y
                        const height = popup.getBoundingClientRect().height
                        if (isReachMainLeftBottom(toTop + header.getBoundingClientRect().height, height)) {
                            this.popupTop = (store.state.mainLeftY + store.state.mainLeftHeight - height) + 'px'
                        } else {
                            this.popupTop = (toTop + header.getBoundingClientRect().height) + 'px'
                        }
                    })
                }
            }
        },
        computed: {},
        methods: {
            removeMusic(index) {
                store.commit('removeMusicInLocalList', {
                    name: this.name,
                    index,
                    count: 1
                })
            },
            randomSort() {
            },
            rename() {
            },
            clickMask() {
                this.$emit('change', false)
            },
            newList() {
                this.visiblePopup = false
                eventBus.$emit(INPUT, {
                    title: '新建列表',
                    placeholder: '请输入列表的名字',
                    onSave: (input) => {
                        Vue.set(store.state.localMusicList, input, {
                            name: input,
                            musics: []
                        })
                    },
                    checkInput: (input) => {
                        if (objNoVal(store.state.localMusicList[input])) {
                            return ''
                        } else {
                            return '与现有列表的名字重复'
                        }
                    }
                })
            },
        },
        mounted() {
        },
        created() {
            if (!this.popupHiddenOption) {
                this.popupHiddenOptions = {};
            } else {
                this.popupHiddenOptions = this.popupHiddenOption
            }
            this.$on('remove', this.removeMusic)
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/list";
</style>