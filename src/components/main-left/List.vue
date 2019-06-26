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
                        <div class="sub-item" @click="toSelectFiles"><label>添加本地歌曲...</label></div>
                        <div class="sub-item" @click="toSelectDirectory"><label>添加本地歌曲文件夹...</label></div>
                    </div>
                </div>
                <div class="item"
                     v-if="!popupHiddenOptions.addList">
                    <label>
                        添加到列表
                    </label>
                    <div class="sub">
                        <h5 class="type">本地列表</h5>
                        <div class="sub-item" v-for="(v) in $store.getters.localList"
                             @click="addToMusicList(true,v.name)"><label>{{v.name}}</label></div>
                        <h5 class="type">网络列表</h5>
                        <div class="sub-item" v-for="(v) in $store.state.netMusicList"
                             @click="addToMusicList(false,v.name)"><label>{{v.name}}</label></div>
                    </div>
                </div>
                <div class="item" v-if="!popupHiddenOptions.later" @click="later"><label>稍后播</label></div>
                <div class="item" v-if="!popupHiddenOptions.addPlayList" @click="pushToPlayList"><label>添加到播放列表</label>
                </div>
                <div class="item"
                     v-if="!popupHiddenOptions.sort">
                    <label>
                        排序
                    </label>
                    <div class="sub">
                        <div class="sub-item" @click="orderBy(constant.ORDER_BY_NAME)"><label>按文件名</label></div>
                        <div class="sub-item" @click="orderBy(constant.ORDER_BY_SINGER)"><label>按歌手</label></div>
                        <div class="sub-item" @click="orderBy(constant.ORDER_BY_TIME)"><label>按添加时间</label></div>
                        <div class="sub-item" @click="orderBy(constant.ORDER_BY_TIMES)"><label>按播放次数</label></div>
                        <div class="sub-item" @click="orderBy(constant.ORDER_BY_RANDOM)"><label>随机排序</label></div>
                    </div>
                </div>
                <div class="item" v-if="!popupHiddenOptions.collection" @click="loveAll"><label>收藏整个列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.clear" @click="clearList"><label>清空列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.remove" @click="removeList"><label>删除列表</label></div>
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
    import {isReachMainLeftBottom, objNoVal, toSelectDirectory, toSelectMusicFiles} from "@/js/util";
    import {
        CLEAR_MUSIC,
        INPUT,
        LATER_PLAY,
        LOVE_ALL_MUSIC,
        PARENT_ADD_ALL_TO_LIST,
        PARENT_ADD_TO_LIST,
        PARENT_PUSH_TO_PLAY_LIST,
        SORT_ORDER_BY
    } from "@/js/event-bus";
    import {
        CREATE_MUSIC_LIST,
        REMOVE_MUSIC_IN_LIST,
        REMOVE_MUSIC_LIST,
        RENAME_MUSIC_LIST,
        SAVE_LOCAL_MUSIC_LIST
    } from "@/js/store/mutations_name";
    import {
        musicFromTags,
        ORDER_BY_NAME,
        ORDER_BY_RANDOM,
        ORDER_BY_SINGER,
        ORDER_BY_TIME,
        ORDER_BY_TIMES
    } from "@/js/_const";

    const mm = require('music-metadata')
    const fs = require('fs')

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
            },
            local: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                visibleContainer: false,
                popupHiddenOptions: {},
                popupTop: 0,
                constant: {
                    ORDER_BY_NAME,
                    ORDER_BY_RANDOM,
                    ORDER_BY_SINGER,
                    ORDER_BY_TIME,
                    ORDER_BY_TIMES
                }
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
            async read(path) {
                const tag = await mm.parseFile(path, {native: true, duration: true})
                const music = musicFromTags(tag, path)
                this.$parent.$emit(PARENT_ADD_TO_LIST, music)
            },
            toSelectFiles() {
                this.closePopup()
                toSelectMusicFiles((paths) => {
                    for (let i = 0; i < paths.length; i++) {
                        this.read(paths[i])
                    }
                }, true)
            },
            toSelectDirectory() {
                this.closePopup()
                toSelectDirectory(true, (paths) => {
                    for (let i = 0; i < paths.length; i++) {
                        const dir = paths[i]
                        const files = fs.readdirSync(dir)
                        for (let j = 0; j < files.length; j++) {
                            this.read(dir + '\\' + files[j])
                        }
                    }
                })
            },
            closePopup() {
                this.$emit('change', false)
            },
            removeMusic(index) {
                store.commit(REMOVE_MUSIC_IN_LIST, {
                    name: this.name,
                    index,
                    count: 1,
                    local: this.local
                })
            },
            orderBy(index) {
                this.closePopup()
                this.$parent.$emit(SORT_ORDER_BY, index)
            },
            addToMusicList(local, name) {
                this.closePopup()
                this.$parent.$emit(PARENT_ADD_ALL_TO_LIST, local, name)
            },
            later() {
                this.closePopup()
                this.$parent.$emit(LATER_PLAY)
            },
            pushToPlayList() {
                this.closePopup()
                this.$parent.$emit(PARENT_PUSH_TO_PLAY_LIST)
            },
            rename() {
                this.closePopup()
                eventBus.$emit(INPUT, {
                    title: '为' + this.name + '重命名',
                    placeholder: '请输入新的名字',
                    checkInput: (input) => {
                        let list = store.state.localMusicList
                        if (!this.local) {
                            list = store.state.netMusicList
                        }
                        if (objNoVal(list[input])) {
                            return ''
                        } else {
                            return '与现有列表名字重复'
                        }
                    },
                    onSave: (input) => {
                        store.commit(RENAME_MUSIC_LIST, {
                            local: this.local,
                            oldName: this.name,
                            newName: input
                        })
                    }
                })
            },
            clickMask() {
                this.closePopup()
            },
            newList() {
                this.closePopup()
                eventBus.$emit(INPUT, {
                    title: '新建列表',
                    placeholder: '请输入列表的名字',
                    onSave: (input) => {
                        store.commit(CREATE_MUSIC_LIST, {
                            name: input,
                            local: this.local
                        })
                        store.commit(SAVE_LOCAL_MUSIC_LIST)
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
            clearList() {
                this.closePopup()
                this.$parent.$emit(CLEAR_MUSIC)
            },
            removeList() {
                this.closePopup()
                store.commit(REMOVE_MUSIC_LIST, {
                    name: this.name,
                    local: this.local
                })
                store.commit(SAVE_LOCAL_MUSIC_LIST)
            },
            loveAll() {
                this.closePopup()
                this.$parent.$emit(LOVE_ALL_MUSIC)
            }
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