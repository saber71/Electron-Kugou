<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="music-list">
        <list :name="listName" :size="array.length" v-model="visiblePopup"
              :popup-hidden-option="popupHiddenOption">
            <template v-slot:header>
                <div class="header-items">
                    <img src="../assets/update.png" v-if="update" title="一键升级无损音质">
                    <img src="../assets/share.png" title="分享">
                    <img src="../assets/menu-music-list.png" title="列表菜单" @click.stop="clickMenu">
                </div>
            </template>
            <template v-slot:items>
                <div class="items">
                    <div class="item" v-for="(v) in array">
                        <div class="content">
                            <span class="text">{{name(v)}}</span>
                            <img src="../assets/mv.png" v-if="v.mv" title="观看MV">
                            <img src="../assets/love-red.png" v-if="isLove(v)" title="我不喜欢">
                            <img src="../assets/love.png" v-else title="我喜欢">
                            <img src="../assets/remove.png" title="删除">
                            <img src="../assets/more.png" title="更多">
                            <span class="duration">{{v.duration}}</span>
                        </div>
                        <div class="popup">
                            <h6>{{name(v)}}</h6>
                            <div class="info">
                                <img :src="v.img">
                                <div>
                                    <div class="part">
                                        <label>大小：</label>
                                        <span>{{v.size}}</span>
                                    </div>
                                    <div class="part">
                                        <label>音质：</label>
                                        <span>{{v.quality}}</span>
                                    </div>
                                    <div class="part">
                                        <label>来源：</label>
                                        <span>{{v.source}}</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="part">
                                        <label>格式：</label>
                                        <span>{{v.type}}</span>
                                    </div>
                                    <div class="part">
                                        <label>播放：</label>
                                        <span>{{v.times+'次'}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </list>
    </div>
</template>

<script>
    import List from "@/components/List";

    export default {
        name: "MusicList",
        components: {List},
        props: {
            array: {
                type: Array,
                required: true
            },
            listName: {
                type: String,
                required: true
            },
            update: {
                type: Boolean,
                default: true
            },
            renameable: {
                type: Boolean,
                default: false
            },
            removeable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visiblePopup: false,
                popupHiddenOption: {},
            }
        },
        watch: {},
        computed: {},
        methods: {
            clickMenu() {
                this.visiblePopup = !this.visiblePopup;
            },
            isLove(music) {
                // todo
            },
            name(music) {
                return music.name + ' - ' + music.singer
            }
        },
        mounted() {
        },
        created() {
            this.popupHiddenOption.remove = !this.removeable
            this.popupHiddenOption.rename = !this.renameable
            this.popupHiddenOption.addList = true
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    #music-list {
        .header-items {
            display: flex;
            align-items: center;

            img {
                width: 16px;
                height: 16px;
                margin: 0 5px;
                cursor: pointer;
                opacity: 0.5;

                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }
</style>