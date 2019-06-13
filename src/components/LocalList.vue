<template>
    <div id="local-list">

    </div>
</template>

<script>
    export default {
        name: "LocalList",
        props: {},
        data() {
            return {
                list1: [
                    {
                        name: '默认列表',
                        array: []
                    },
                ],
                list2: []
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
    #local-list {
        width: 100%;

    }
</style>