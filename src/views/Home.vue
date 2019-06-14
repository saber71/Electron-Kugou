<template>
    <div id="home">
        <header>
            <div class="left">
                <img class="logo" src="../assets/logo.png">
                <div class="login">
                    <label @click="clickLogin">登陆</label>
                    <section class="login-sec" v-show="$store.state.visibleLogin">
                        <div class="mask" @click="clickLogin"></div>
                        <div class="region">
                            <h3 class="title">登陆账号<img src="../assets/close.png" @click="clickLogin"></h3>
                            <section class="body">
                                <div class="label">
                                    <label :class="{'label-active':activeLogin===0}" @click="activeLogin=0">密码登陆</label>
                                    <label :class="{'label-active':activeLogin===1}" @click="activeLogin=1">短信登陆</label>
                                </div>
                                <div class="form0" v-show="activeLogin===0">
                                    <input v-model="userName" placeholder="用户名/手机/邮箱">
                                    <input type="password" v-model="password" placeholder="请输入密码">
                                    <div class="checked-group">
                                        <div class="checkbox">
                                            <input type="checkbox" v-model="rememberPassword">记住密码
                                        </div>
                                        <div class="checkbox">
                                            <input type="checkbox">自动登陆
                                        </div>
                                    </div>
                                </div>
                                <div class="form1" v-show="activeLogin===1"></div>
                            </section>
                        </div>
                    </section>
                </div>
                <div class="divide"></div>
                <div class="register">
                    <label @click="clickRegister">注册</label>
                    <section class="register-sec" v-show="$store.state.visibleRegister">
                        <div class="mask" @click="clickRegister"></div>
                        <div class="region">
                            <h3 class="title">注册账号<img src="../assets/close.png" @click="clickRegister"></h3>
                        </div>
                    </section>
                </div>
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

    let width = minWidth;

    export default {
        name: "Home",
        components: {MainRight, MainLeft},
        props: {},
        data() {
            return {
                searchText: '',
                activeLogin: 0,
                userName: '',
                password: '',
                rememberPassword: store.state.rememberPassword,
                autoLogin: store.state.autoLogin
            }
        },
        watch: {
            rememberPassword(newVal) {
                store.commit('rememberPassword', newVal)
            },
            autoLogin(newVal) {
                store.commit('autoLogin', newVal)
            }
        },
        computed: {},
        methods: {
            clickLogin() {
                store.commit('visibleLogin')
            },
            clickRegister() {
                store.commit('visibleRegister')
            },
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
                let w = 310;
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