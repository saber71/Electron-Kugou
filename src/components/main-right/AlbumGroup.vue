<template>
    <div id="AlbumGroup">
        <div class="item" v-for="(v) in albums">
            <img :src="v.img">
            <p class="name">{{v.name}}</p>
            <p class="singer">{{v.singer}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AlbumGroup",
        props: {
            albums: {
                type: Array,
                required: true
            }
        },
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
    @import "../../style/common";

    #AlbumGroup {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 0 30px;

        .item {
            width: 100%;
            font-size: 14px;
            cursor: pointer;
            margin-bottom: 10px;

            img {
                width: 100%;
            }

            .name {
                color: black
            }

            .singer {
                color: gray;
            }

            &:hover {
                .name, .singer {
                    color: $blue;
                }
            }
        }
    }
</style>