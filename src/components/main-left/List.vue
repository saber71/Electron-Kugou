<template>
    <div id="list">
        <section class="header" @click="visibleContainer=!visibleContainer">
            <div class="left">
                <img :class="{'arrow-down':visibleContainer}" src="../../assets/arrow-down-dark.png">
                <label class="name">{{name}}</label>
                <span class="size"> [{{size}}]</span>
            </div>
            <div class="right">
                <slot name="header"></slot>
            </div>
        </section>
        <div class="list-popup" :class="{'list-popup-active':visiblePopup}">
            <div class="mask" @click="clickMask"></div>
            <div class="content">
                <h3 class="title">{{name}} - 菜单</h3>
                <div class="item" v-if="!popupHiddenOptions.newList"><label>新建列表</label></div>
                <div class="item"
                     v-if="!popupHiddenOptions.addMusic">
                    <label :class="{'item-active':visibleSub1}"
                           @mouseup="visibleSub1=!visibleSub1">
                        添加歌曲
                        <img src="../../assets/arrow-down-dark.png">
                    </label>
                    <div class="sub" :style="{height:sub1Height}">
                        <div class="sub-item"><label>添加本地歌曲...</label></div>
                        <div class="sub-item"><label>添加本地歌曲文件夹...</label></div>
                    </div>
                </div>
                <div class="item"
                     v-if="!popupHiddenOptions.addList" @mouseup="visibleSub2=!visibleSub2">
                    <label :class="{'item-active':visibleSub2}">
                        添加到列表
                        <img src="../../assets/arrow-down-dark.png">
                    </label>
                    <div class="sub" :style="{height:sub2Height}">
                        <div class="sub-item"><label>默认列表</label></div>
                        <div class="sub-item"><label>第三方列表</label></div>
                        <div class="sub-item" v-for="(v) in $store.state.customList"><label>{{v.name}}</label></div>
                    </div>
                </div>
                <div class="item" v-if="!popupHiddenOptions.later"><label>稍后播</label></div>
                <div class="item" v-if="!popupHiddenOptions.addPlayList"><label>添加到播放列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.sendToMobile"><label>全部发送到移动设备</label></div>
                <div class="item" v-if="!popupHiddenOptions.downloadAll"><label>下载本列表全部歌曲</label></div>
                <div class="item"
                     v-if="!popupHiddenOptions.sort">
                    <label :class="{'item-active':visibleSub3}"
                           @mouseup="visibleSub3=!visibleSub3">
                        排序
                        <img src="../../assets/arrow-down-dark.png">
                    </label>
                    <div class="sub" :style="{height:sub3Height}">
                        <div class="sub-item"><label>按文件名</label></div>
                        <div class="sub-item"><label>按歌手</label></div>
                        <div class="sub-item"><label>按添加时间</label></div>
                        <div class="sub-item"><label>按播放次数</label></div>
                        <div class="sub-item" v-if="!popupHiddenOptions.sortByDownload"><label>按是否已下载</label></div>
                        <div class="sub-item"><label>随机排序</label></div>
                    </div>
                </div>
                <div class="item" v-if="!popupHiddenOptions.matchMV"><label>匹配MV</label></div>
                <div class="item" v-if="!popupHiddenOptions.collection"><label>收藏整个列表</label></div>
                <div class="item-border" v-if="!popupHiddenOptions.share"><label>分享</label></div>
                <div class="item" v-if="!popupHiddenOptions.restore"><label>恢复列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.clear"><label>清空列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.remove"><label>删除列表</label></div>
                <div class="item" v-if="!popupHiddenOptions.rename"><label>重命名</label></div>
            </div>
        </div>
        <section class="container" :style="{height:containerHeight}">
            <div class="music-content">
                <slot name="items"></slot>
            </div>
        </section>
    </div>
</template>

<script>
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
                visibleSub1: false,
                visibleSub2: false,
                visibleSub3: false,
            }
        },
        watch: {},
        computed: {
            containerHeight() {
                if (this.visibleContainer) {
                    const content = document.getElementsByClassName('music-content').item(0);
                    if (content) {
                        return content.getBoundingClientRect().height + 'px'
                    }
                }
                return '0';
            },
            sub1Height() {
                if (this.visibleSub1) {
                    return '74px'
                } else {
                    return '0'
                }
            },
            sub2Height() {
                if (this.visibleSub2) {
                    let len = store.state.customList.length
                    return (len * 37 + 74) + 'px'
                } else {
                    return '0'
                }
            },
            sub3Height() {
                if (this.visibleSub3) {
                    if (this.popupHiddenOptions.sortByDownload)
                        return '170px'
                    else {
                        return '222px'
                    }
                } else {
                    return '0'
                }
            },
        },
        methods: {
            clickMask() {
                this.$emit('change', false)
                this.visibleSub1 = false
                this.visibleSub2 = false
                this.visibleSub3 = false
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
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/list";
</style>