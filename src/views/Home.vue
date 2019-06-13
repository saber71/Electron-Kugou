<template>
    <div id="home">
        <header>
            <div class="left">
                <img class="logo" src="../assets/logo.png">
                <label class="login">登陆</label>
                <div class="divide"></div>
                <label class="register">注册</label>
                <img class="yun-pan" src="../assets/cloud.png" title="私人音乐云盘">
            </div>
            <div class="right">
                <div class="search">
                    <img class="return" src="../assets/arrow-down.png" title="返回">
                    <img class="refresh" src="../assets/refresh.png">
                    <input v-model="searchText">
                    <img src="../assets/hua-tong.png" title="听歌识曲">
                    <img class="search-icon" src="../assets/search.png">
                </div>
                <div class="close-other">
                    <img class="can-hidden" src="../assets/cd.png" title="CD抓轨">
                    <img class="can-hidden" src="../assets/menu.png" title="工具">
                    <img class="can-hidden" src="../assets/message.png" title="消息中心">
                    <img class="can-hidden" src="../assets/clothes.png" title="更换皮肤">
                    <img class="can-hidden" src="../assets/tool.png" title="主菜单">
                    <div class="divide"></div>
                    <img class="remote-controller" src="../assets/remote-controller.png" title="开启遥控器">
                    <div class="hidden-left" @click="hiddenLeft" title="隐藏音乐库">
                        <div class="rect"></div>
                        <img src="../assets/left.png">
                    </div>
                    <div class="hidden-right" @click="hiddenRight" title="显示音乐库">
                        <div class="rect"></div>
                        <img src="../assets/left.png">
                    </div>
                    <img class="min" src="../assets/yi.png" title="最小化" @click="min">
                    <img class="close" src="../assets/close.png" title="关闭" @click="close">
                </div>
            </div>
        </header>
        <main>
            <section class="left">
                <main-left></main-left>
            </section>
            <section class="right">
                <main-right></main-right>
            </section>
        </main>
        <footer></footer>
    </div>
</template>

<script>
    import {getWindow} from "@/js/util";
    import {minHeight, minWidth} from "@/js/_const";
    import MainLeft from "@/components/MainLeft";
    import MainRight from "@/components/MainRight";

    let width = 1024;

    export default {
        name: "Home",
        components: {MainRight, MainLeft},
        props: {},
        data() {
            return {
                searchText: ''
            }
        },
        watch: {},
        computed: {},
        methods: {
            close() {
                const win = getWindow();
                win.close();
            },
            min() {
                const win = getWindow();
                win.minimize();
            },
            hiddenLeft() {
                const win = getWindow();
                let w=310;
                width = win.getBounds().width;
                win.setMinimumSize(w, minHeight);
                win.setResizable(false);
                win.setBounds({width: w});
            },
            hiddenRight() {
                const win = getWindow();
                win.setResizable(true);
                win.setBounds({width})
                setTimeout(() => {
                    win.setMinimumSize(minWidth, minHeight);
                })
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
    @import "../style/home";
</style>