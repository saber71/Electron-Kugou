<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="music-list">
        <list :name="listName" :size="array.length" v-model="visiblePopup"
              :popup-hidden-option="popupHiddenOption">
            <template v-slot:header>
                <div class="header-items">
                    <img src="../../assets/menu-music-list.png" title="列表菜单" @click.stop="clickMenu">
                </div>
            </template>
            <template v-slot:items>
                <div class="items">
                    <music v-for="(v,i) in array" :music="v" :key="''+i" :index="i"></music>
                </div>
            </template>
        </list>
    </div>
</template>

<script>
    import List from "@/components/main-left/List";
    import {isReachMainLeftBottom} from "@/js/util";
    import Music from "@/components/main-left/Music";
    import {SAVE_LOCAL_MUSIC_LIST, SET_LOCAL_LIST_ORDER_BY} from "@/js/store/mutations_name";
    import {CLEAR_MUSIC, LOVE_ALL_MUSIC, SORT_ORDER_BY} from "@/js/event-bus";

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
            this.$on(CLEAR_MUSIC, () => {
                const len = this.array.length
                for (let i = 0; i < len; i++) {
                    this.array.pop()
                }
                store.commit(SAVE_LOCAL_MUSIC_LIST)
            })
            this.$on(LOVE_ALL_MUSIC, () => {
                for (let i = 0; i < this.array.length; i++) {
                    this.array[i].love = true
                }
            })
            this.$on(SORT_ORDER_BY, (index) => {
                store.commit(SET_LOCAL_LIST_ORDER_BY, {
                    name: this.listName,
                    orderBy: index
                })
            })
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";

    #music-list {
        .header-items {
            display: flex;
            align-items: center;
            padding-right: 5px;
            box-sizing: border-box;

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