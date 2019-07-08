<template>
    <div id="NetMusicList">
        <section class="breadcrumb ">
            <div class="item" v-for="v in breadcrumb">
                <span @click="v.onclick">{{v.name}}</span>
                <label>></label>
            </div>
            <label>{{musicList.name}}</label>
        </section>
        <section class="top">
            <section class="left">
                <img :src="musicList.img">
                <div class="bottom">
                    <img src="../../assets/listen.png">{{formatNumber(musicList.listenCount)}}
                </div>
            </section>
            <section class="middle">
                <div class="text">
                    <h2>{{musicList.name}}</h2>
                    <p>创建人：{{musicList.author}}</p>
                    <p>分类：
                        <button v-for="v in musicList.type">{{v}}</button>
                    </p>
                    <p>更新时间：{{musicList.updateTime}}</p>
                </div>
                <div class="button-group">
                    <button class="play">全部播放</button>
                    <button class="collect">收藏({{formatNumber(musicList.collectCount)}})</button>
                    <button class="share">分享</button>
                </div>
            </section>
            <section class="right">
                <section class="higher">
                    <div class="text">{{musicList.score}}</div>
                    <div class="rating">
                        <star-rating v-model="musicList.score" :show-rating="false" :star-size="20" :max-rating="10" :read-only="true"></star-rating>
                        <span>{{musicList.scoreNumber}}人评</span>
                    </div>
                </section>
                <div class="lower">
                    <div class="text">我要评：</div>
                    <div class="opt">
                        <star-rating v-model="rating" :show-rating="false" :star-size="20" :max-rating="10" :read-only="readOnly" @rating-selected="clickRating"></star-rating>
                    </div>
                </div>
            </section>
        </section>
        <section class="tabs">
            <div class="labels">
                <label :class="{'active-label':tabActiveIndex===0}" @click="tabActiveIndex=0">歌曲({{musicList.musics.length}}首)</label>
                <label :class="{'active-label':tabActiveIndex===1}" @click="tabActiveIndex=1">歌单介绍</label>
                <label :class="{'active-label':tabActiveIndex===2}" @click="tabActiveIndex=2">相似歌单</label>
            </div>
            <div class="content">
                <div class="musics" v-if="tabActiveIndex===0">
                    <net-music-group :musics="musicList.musics"></net-music-group>
                </div>
                <div class="description" v-else-if="tabActiveIndex===1">{{musicList.description}}</div>
                <div class="similar" v-else>
                    <div v-for="v in similarMusicList" @click="toNetMusicList(v)">
                        <NetMusicListCard :key="v.name" :music-list="v"></NetMusicListCard>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import NetMusicGroup from "@/components/main-right/NetMusicGroup";
    import NetMusicListCard from "@/components/main-right/NetMusicListCard";
    import ajax from "@/js/ajax";
    import {SET_LOOK_MUSIC_LIST} from "@/js/store/mutations_name";

    export default {
        name: "NetMusicList",
        components: {NetMusicListCard, NetMusicGroup},
        props: {},
        data() {
            return {
                rating: 0,
                readOnly: false,
                tabActiveIndex: 0,
                similarMusicList: []
            }
        },
        watch: {},
        computed: {
            breadcrumb() {
                return store.state.lookMusicList.breadcrumb
            },
            musicList() {
                return store.state.lookMusicList.musicList
            }
        },
        methods: {
            clickRating(rating) {
                this.rating = rating
                this.readOnly = true
            },
            formatNumber(num) {
                if (num > 100000000) {
                    const res = parseInt((num / 10000000) + '') / 10
                    return res + '亿'
                } else if (num > 10000) {
                    const res = parseInt((num / 1000) + '') / 10
                    return res + '万'
                } else {
                    return num
                }
            },
            toNetMusicList(musicList) {
                const lookMusicList = store.state.lookMusicList
                lookMusicList.musicList = musicList
                store.commit(SET_LOOK_MUSIC_LIST, lookMusicList)
                this.getSimilarMusicList()
                this.rating = 0
                this.readOnly = false
            },
            getSimilarMusicList() {
                ajax.getSimilarMusicList().then((value) => {
                    this.similarMusicList = value.data
                })
            },
        },
        mounted() {
        },
        created() {
            this.getSimilarMusicList()
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/main-right/net-music-list";
</style>