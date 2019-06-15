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
                    <music v-for="(v,i) in array" :music="v" :key="''+i"></music>
                </div>
            </template>
        </list>
    </div>
</template>

<script>
    import List from "@/components/List";
    import {isReachMainLeftBottom} from "@/js/util";
    import Music from "@/components/Music";

    export default {
        name: "MusicList",
        components: {Music, List},
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
                musicPopupActive: -1
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
    @import "../style/common";

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

        .items {
        }
    }
</style>