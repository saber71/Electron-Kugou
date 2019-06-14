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
                                <form class="form0" v-show="activeLogin===0">
                                    <div class="input-account">
                                        <input class="input" v-model="account" placeholder="用户名/手机/邮箱"
                                               required
                                               :maxlength="accountInputLimit.maxAccount"
                                               :pattern="accountInputLimit.accountPattern">
                                        <div class="popup">
                                            <div class="item" v-for="v in matchAccountList" @click="clickLoginObj(v)">
                                                {{v.account}}
                                            </div>
                                        </div>
                                    </div>
                                    <input class="input" type="password" v-model="password" placeholder="请输入密码"
                                           required
                                           :maxlength="accountInputLimit.maxPassword"
                                           :pattern="accountInputLimit.passwordPattern">
                                    <div class="option">
                                        <div class="checked-group">
                                            <div class="checkbox">
                                                <input id="rememberPassword" type="checkbox" v-model="rememberPassword">
                                                <label for="rememberPassword">记住密码</label>
                                            </div>
                                            <div class="checkbox">
                                                <input id="autoLogin" type="checkbox" v-model="autoLogin">
                                                <label for="autoLogin">自动登陆</label>
                                            </div>
                                        </div>
                                        <div class="to-register" @click="toRegister">注册账号</div>
                                    </div>
                                    <p class="warn" :class="{'warn-active':visibleWarn}">用户名或密码不正确</p>
                                    <button type="submit" class="button" @submit="login">登陆</button>
                                </form>
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
    import {maxAccount, maxPassword, minAccount, minHeight, minPassword, minWidth} from "@/js/_const";
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
                accountInputLimit: {
                    maxPassword: maxPassword,
                    maxAccount: maxAccount,
                    passwordPattern: '',
                    accountPattern: ''
                },
                account: '',
                password: '',
                rememberPassword: this.$store.state.rememberPassword,
                autoLogin: store.state.autoLogin,
                visibleWarn: false,
                matchAccountList: []
            }
        },
        watch: {
            rememberPassword(newVal) {
                if (!newVal) {
                    this.autoLogin = false
                }
                store.commit('rememberPassword', newVal)
            },
            autoLogin(newVal) {
                if (newVal) {
                    this.rememberPassword = true
                }
                store.commit('autoLogin', newVal)
            },
            account(newVal) {
                this.matchAccountList = []
                if (newVal !== '') {
                    const list = store.state.loginHistory
                    for (let i = 0; i < list.length; i++) {
                        const obj = list[i]
                        if (typeof obj.account === 'string' && obj.account.indexOf(newVal) >= 0) {
                            this.matchAccountList.push(obj)
                        }
                    }
                    if (this.matchAccountList.length === 1) {
                        const obj = this.matchAccountList[0]
                        if (obj.account === newVal) {
                            this.matchAccountList = []
                        }
                    }
                }
            }
        }
        ,
        computed: {}
        ,
        methods: {
            login() {
                return false
            },
            clickLoginObj(obj) {
                this.account = obj.account;
                this.password = obj.password;
            },
            toRegister() {
                this.clickLogin()
                this.clickRegister()
            }
            ,
            toLogin() {
                this.clickRegister()
                this.clickLogin()
            }
            ,
            clickLogin() {
                store.commit('visibleLogin')
            }
            ,
            clickRegister() {
                store.commit('visibleRegister')
            }
            ,
            close() {
                const win = getWindow();
                win.close();
            }
            ,
            min() {
                const win = getWindow();
                win.minimize();
            }
            ,
            hiddenLeft() {
                const win = getWindow();
                let w = 310;
                width = win.getBounds().width;
                win.setMinimumSize(w, minHeight);
                win.setResizable(false);
                win.setBounds({width: w});
            }
            ,
            hiddenRight() {
                const win = getWindow();
                win.setResizable(true);
                win.setBounds({width})
                setTimeout(() => {
                    win.setMinimumSize(minWidth, minHeight);
                })
            }
        }
        ,
        mounted() {
        }
        ,
        created() {
            this.accountInputLimit.passwordPattern = `^\\w{${minPassword},${maxPassword}}$`
            this.accountInputLimit.accountPattern = `^([^\\s=-\\\\+\\\\'\\\\"]*[a-zA-Z0-9]){${minAccount},${maxAccount}}$`
        }
        ,
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/home";
</style>