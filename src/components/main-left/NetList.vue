<template>
    <div id="NetList">
        <div class="type">
            <div class="banner" @click="expandIndex=expandIndex===0?-1:0">
                <div class="left">我的设备 [{{deviceMusicList.length}}]</div>
                <div class="right">
                    <img class="angle" src="../../assets/arrow-down-dark.png" :class="{'angle-active':expandIndex===0}" title="展开列表">
                </div>
            </div>
            <div class="type-content" v-show="expandIndex===0">
                <music-list v-for="(vv,index) in deviceMusicList" :key="index" :list-name="vv.name" :array="vv.musics" :removeable="vv.removeable"
                            :renameable="vv.renamable"></music-list>
            </div>
        </div>
        <div class="type">
            <div class="banner" @click="expandIndex=expandIndex===1?-1:1">
                <div class="left">自建歌单 [{{myMusicList.length}}]</div>
                <div class="right">
                    <img class="create-new" src="../../assets/create-new.png" title="新建列表" @click="newList">
                    <img class="angle" src="../../assets/arrow-down-dark.png" :class="{'angle-active':expandIndex===1}" title="展开列表">
                </div>
            </div>
            <div class="type-content" v-show="expandIndex===1">
                <music-list v-for="(vv,index) in myMusicList" :key="index" :list-name="vv.name" :array="vv.musics" :removeable="vv.removeable"
                            :renameable="vv.renamable"></music-list>
            </div>
        </div>
        <div class="type">
            <div class="banner" @click="expandIndex=expandIndex===2?-1:2">
                <div class="left">收藏歌单 [{{favoriteMusicList.length}}]</div>
                <div class="right">
                    <img class="angle" src="../../assets/arrow-down-dark.png" :class="{'angle-active':expandIndex===2}" title="展开列表">
                </div>
            </div>
            <div class="type-content" v-show="expandIndex===2">
                <music-list v-for="(vv,index) in favoriteMusicList" :key="index" :list-name="vv.name" :array="vv.musics" :removeable="vv.removeable"
                            :renameable="vv.renamable"></music-list>
            </div>
        </div>
    </div>
</template>

<script>
    import {emptyMusicList, generateMusicList} from "@/js/_const";
    import MusicList from "@/components/main-left/MusicList";
    import {INPUT} from "@/js/event-bus";
    import {CREATE_MUSIC_LIST} from "@/js/store/mutations_name";
    import {objNoVal} from "@/js/util";

    export default {
        name: "NetList",
        components: {MusicList},
        props: {},
        data() {
            return {
                expandIndex: -1,
                deviceMusicList: [
                    generateMusicList(undefined, 10, 20, false, false),
                    generateMusicList(undefined, 10, 20, false, false),
                    generateMusicList(undefined, 10, 20, false, false),
                ]
            }
        },
        watch: {},
        computed: {
            myMusicList() {
                const list = store.state.myMusicSpaceData
                if (list && list.customMusicList) {
                    return list.customMusicList
                } else {
                    return []
                }
            },
            favoriteMusicList() {
                const list = store.state.myMusicSpaceData
                if (list && list.favoriteMusicList) {
                    return list.favoriteMusicList
                } else {
                    return []
                }
            },
        },
        methods: {
            newList() {
                eventBus.$emit(INPUT, {
                    title: '新建列表',
                    placeholder: '请输入列表的名字',
                    onSave: (input) => {
                        this.myMusicList.push(emptyMusicList(input))
                        store.commit(CREATE_MUSIC_LIST, {
                            name: input,
                            local: false
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
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/main-left/NetList";
</style>