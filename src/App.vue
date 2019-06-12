<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        errorCaptured(err, vm, info) {
            alert(info);
        },
        created() {
            window.router = this.$router;
            window.store = this.$store;
            window.axios = this.$axios;
            window.state = store.state;
        }
    }
</script>

<style>
    #app, html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    * {
        list-style: none;
        outline: none;
    }

    img {
        display: block;
        width: fit-content;
    }
</style>
