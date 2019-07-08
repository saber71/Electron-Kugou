<template>
    <div id="NetMusicListCard">
        <div class="img">
            <img class="icon" :src="musicList.img">
            <div class="top">
                <img src="../../assets/listen.png">{{formatNumber(musicList.collectCount)}}
            </div>
            <div class="hover-bottom">
                <div class="love" title="收藏歌单">
                    <img src="../../assets/love-white-all.png">
                </div>
                <div class="play" title="播放全部">
                    <img src="../../assets/triangle-white.png">
                </div>
            </div>
        </div>
        <p class="name">{{musicList.name}}</p>
        <p class="author">{{musicList.author}}</p>
    </div>
</template>

<script>
    export default {
        name: "NetMusicListCard",
        props: {
            musicList: {
                type: Object,
                required: true
            }
        },
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
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
            }
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
    @import "../../style/main-right/net-music-list-card";
</style>