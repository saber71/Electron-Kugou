<template>
    <div id="MusicRepository">
        <section class="labels">
            <label :class="{'active-label':activeIndex===0}" @click="activeIndex=0">推荐</label>
            <label :class="{'active-label':activeIndex===1}" @click="activeIndex=1">排行榜</label>
            <label :class="{'active-label':activeIndex===2}" @click="activeIndex=2">歌手</label>
            <label :class="{'active-label':activeIndex===3}" @click="activeIndex=3">分类</label>
        </section>
        <section class="body">
            <section class="item" v-if="activeIndex===0">
                <music-recommend></music-recommend>
            </section>
            <section class="item" v-if="activeIndex===1">
                <music-ranking-board></music-ranking-board>
            </section>
            <section class="item" v-if="activeIndex===2">
                <music-singer></music-singer>
            </section>
            <section class="item" v-if="activeIndex===3">
                <music-category></music-category>
            </section>
        </section>
    </div>
</template>

<script>

    import MusicRecommend from "@/components/main-right/main/music-repository/MusicRecommend";
    import MusicRankingBoard from "@/components/main-right/main/music-repository/MusicRankingBoard";
    import MusicSinger from "@/components/main-right/main/music-repository/MusicSinger";
    import MusicCategory from "@/components/main-right/main/music-repository/MusicCategory";

    export default {
        name: "MusicRepository",
        components: {MusicCategory, MusicSinger, MusicRankingBoard, MusicRecommend},
        props: {},
        data() {
            return {
                activeIndex: 0
            }
        },
        watch: {},
        computed: {},
        methods: {},
        mounted() {
        },
        created() {
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../style/main-right/MusicRepository";
</style>