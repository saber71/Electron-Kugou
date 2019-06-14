<template>
    <div id="local-list">
        <music-list list-name="默认列表" :array="$store.state.defaultList" :removeable="false"
                    :renameable="false"></music-list>
    </div>
</template>

<script>
    import MusicList from "@/components/MusicList";
    import {ranInteger, ranName, ranTitle} from "@/js/mock-random";

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