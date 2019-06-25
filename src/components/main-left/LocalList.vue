<template>
    <div id="local-list">
        <music-list v-for="v in $store.getters.localList('最近播放')" :list-name="v.name" :array="v.musics"
                    :removeable="v.removeable" :key="v.name" :renameable="v.renameable"></music-list>
        <music-list list-name="最近播放" :array="$store.state.localMusicList['最近播放'].musics" :renameable="false"
                    :removeable="false"></music-list>
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
    #local-list {
        width: 100%;
    }
</style>