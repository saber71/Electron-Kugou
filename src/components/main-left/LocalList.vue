<template>
    <div id="local-list">
        <music-list v-for="v in $store.state.localMusicList" :list-name="v.name" :array="v.musics"
                    :removeable="checkName(v)"
                    :key="v.name" :renameable="checkName(v)"></music-list>
    </div>
</template>

<script>
    import MusicList from "@/components/main-left/MusicList";

    export default {
        name: "LocalList",
        components: {MusicList},
        props: {},
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {
            checkName(v) {
                return v.name !== '默认列表' && v.name !== '第三方歌曲' && v.name !== '最近播放'
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
    #local-list {
        width: 100%;
    }
</style>