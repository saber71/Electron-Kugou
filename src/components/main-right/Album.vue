<template>
    <div id="Album">
        <section class="breadcrumb ">
            <div class="item" v-for="v in breadcrumb">
                <span @click="v.onclick">{{v.name}}</span>
                <label>></label>
            </div>
            <label>{{album.name}}</label>
        </section>
        <section class="info">
            <section class="left">
                <img :src="album.img">
                <span>已有{{album.collectNumber}}人收藏</span>
            </section>
            <section class="middle">
                <section class="text">
                    <h3>{{album.name}}</h3>
                    <p>演唱者：{{album.singer}}</p>
                    <p>语言：{{album.lang}}</p>
                    <p>唱片公司：{{album.publisher}}</p>
                    <p>发行时间：{{album.publishDate}}</p>
                </section>
                <div class="button-group">
                    <button class="play-all">全部播放</button>
                    <button class="other">收藏</button>
                    <button class="other">分享</button>
                </div>
            </section>
            <section class="right">
                <div class="score1">
                    <div class="text">{{album.score}}</div>
                    <div class="opt">
                        <star-rating v-model="album.score" :show-rating="false" :star-size="20" :max-rating="10" :read-only="true"></star-rating>
                        <span>{{album.scoreNumber}}人评</span>
                    </div>
                </div>
                <div class="score2">
                    <div class="text">我要评：</div>
                    <div class="opt">
                        <star-rating v-model="rating" :show-rating="false" :star-size="20" :max-rating="10" :read-only="readOnly" @rating-selected="clickRating"></star-rating>
                    </div>
                </div>
            </section>
        </section>
        <section class="tabs">
            <div class="labels">
                <label :class="{'active-label':tabActiveIndex===0}" @click="tabActiveIndex=0">歌曲({{album.musics.length}}首)</label>
                <label :class="{'active-label':tabActiveIndex===1}" @click="tabActiveIndex=1">专辑描述</label>
                <label :class="{'active-label':tabActiveIndex===2}" @click="tabActiveIndex=2">评论({{album.commentNumber}})</label>
            </div>
            <section class="content">
                <section class="musics" v-show="tabActiveIndex===0">
                    <net-music-group :musics="album.musics"></net-music-group>
                    <section class="similar-albums">
                        <h2>其他专辑</h2>
                        <section class="group">
                            <album-card v-for="v in similarAlbums" :album="v" :key="v.name"></album-card>
                        </section>
                    </section>
                </section>
                <section class="description" v-show="tabActiveIndex===1">
                    <p>{{album.description}}</p>
                </section>
                <section class="comment" v-show="tabActiveIndex===2">
                    <Comments :comments="comments"></Comments>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    import NetMusicGroup from "@/components/main-right/NetMusicGroup";
    import ajax from "@/js/ajax";
    import AlbumCard from "@/components/main-right/AlbumCard";
    import Comments from "@/components/main-right/Comment";

    export default {
        name: "Album",
        components: {Comments, AlbumCard, NetMusicGroup},
        props: {},
        data() {
            return {
                rating: 0,
                readOnly: false,
                tabActiveIndex: 0,
                similarAlbums: [],
                comments: []
            }
        },
        watch: {},
        computed: {
            breadcrumb() {
                return store.state.lookAlbum.breadcrumb
            },
            album() {
                return store.state.lookAlbum.album
            }
        },
        methods: {
            clickRating(rating) {
                this.rating = rating
                this.readOnly = true
            },
        },
        mounted() {
        },
        created() {
            ajax.getSimilarAlbums().then((value) => {
                this.similarAlbums = value.data
            })
            ajax.getComment().then((value) => {
                this.comments = value.data
            })
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/main-right/album";
</style>