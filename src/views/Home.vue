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
                                        <input class="input" :class="{'input-invalid':accountInvalid}"
                                               v-model="account" placeholder="用户名/手机/邮箱" required
                                               :maxlength="accountInputLimit.maxAccount">
                                        <div class="down" @click="clickAccountInputDown"></div>
                                        <div class="popup">
                                            <div class="item" v-for="v in matchAccountList" @click="clickLoginObj(v)">
                                                {{v.account}}
                                            </div>
                                        </div>
                                    </div>
                                    <input class="input" :class="{'input-invalid':passwordInvalid}"
                                           type="password" v-model="password" placeholder="请输入密码"
                                           required :maxlength="accountInputLimit.maxPassword">
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
                                    <p class="warn">{{warnMessage}}</p>
                                    <button type="button" class="button" @click="login">登陆</button>
                                </form>
                                <form class="form1" v-show="activeLogin===1">
                                    <input class="input" :class="{'input-invalid':accountInvalid}"
                                           v-model="account" placeholder="请输入手机号" maxlength="11" required>
                                    <div class="line2">
                                        <input class="input verification-code"
                                               :class="{'input-invalid':passwordInvalid}"
                                               v-model="password" placeholder="请输入验证码"
                                               required maxlength="6">
                                        <button type="button" class="send-message"
                                                :class="{'send-message-disabled':!canSendMessage}"
                                                @click="sendVerificationCode">
                                            {{canSendMessage?'短信获取':`重新发送(${countDown}秒)`}}
                                        </button>
                                    </div>
                                    <p class="warn">{{warnMessage}}</p>
                                    <button type="button" class="button" @click="messageLogin">登陆</button>
                                </form>
                            </section>
                        </div>
                        <div class="loading" v-show="loading">
                            <div class="bg">
                                <img src="../assets/loading.png">
                            </div>
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
                        <div class="loading" v-show="loading">
                            <div class="bg">
                                <img src="../assets/loading.png">
                            </div>
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
    import ajax from "@/js/ajax";
    import {ranInteger} from "@/js/mock-random";

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
                accountInvalid: false,
                passwordInvalid: false,
                rememberPassword: this.$store.state.rememberPassword,
                autoLogin: store.state.autoLogin,
                visibleWarn: false,
                matchAccountList: [],
                loading: false,
                warnMessage: '',
                canSendMessage: true,
                countDown: 60
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
            },
            activeLogin() {
                this.account = ''
                this.password = ''
                this.warnMessage = ''
                this.accountInvalid = false
                this.passwordInvalid = false
            }
        },
        computed: {},
        methods: {
            sendVerificationCode() {
                if (!this.canSendMessage) {
                    return;
                }
                this.warnMessage = ''
                this.accountInvalid = false
                if (this.account === '') {
                    this.accountInvalid = true
                    this.warnMessage = '请输入手机号'
                    return
                }
                const account = parseInt(this.account)
                if (account <= 10000000000 || account >= 20000000000) {
                    this.accountInvalid = true
                    this.warnMessage = '无效的手机号'
                    return
                }
                const code = ranInteger(100000, 999999)
                store.commit('verificationCode', code)
                setTimeout(() => {
                    alert(code)
                }, ranInteger(500, 2000))
                this.canSendMessage = false
                this.countDown = 60
                const handler = setInterval(() => {
                    if (this.countDown < 0) {
                        this.canSendMessage = true
                        clearInterval(handler)
                        return
                    }
                    this.countDown--
                }, 1000)
            },
            clickAccountInputDown() {
                this.matchAccountList = store.state.loginHistory
            },
            async messageLogin() {
                this.warnMessage = ''
                this.accountInvalid = false
                this.passwordInvalid = false
                const account = this.account
                if (account === '' || this.password === '') {
                    this.warnMessage = '请输入手机号和验证码'
                    this.accountInvalid = account === ''
                    this.passwordInvalid = this.password === ''
                    return
                }
                if (account <= 10000000000 || account >= 20000000000) {
                    this.accountInvalid = true
                    this.warnMessage = '无效的手机号'
                    return
                }
                if (parseInt(this.password) !== store.state.verificationCode || store.state.verificationCode < 0) {
                    this.passwordInvalid = true
                    this.warnMessage = '无效的验证码'
                    alert((this.password !== store.state.verificationCode) + '  ' + this.password + '  ' + store.state.verificationCode)
                    return
                }
                this.setLoading()
                const res = (await ajax.msgLogin(account)).data
                if (res) {
                    this.clickLogin()
                    const obj = {
                        account,
                        password: '',
                        byMessage: true
                    }
                    store.commit('onlineUser', obj)
                    store.commit('loginHistoryPush', obj)
                } else {
                    this.clickLogin(true)
                    this.accountInvalid = true
                    this.password = ''
                    this.warnMessage = '账号不存在'
                }
                this.setLoading()
            },
            async login() {
                this.warnMessage = ''
                this.accountInvalid = false
                this.passwordInvalid = false
                if (this.account === '' || this.password === '') {
                    this.warnMessage = '请输入账号和密码'
                    this.accountInvalid = this.account === ''
                    this.passwordInvalid = this.password === ''
                    return
                }
                if (new RegExp(this.accountInputLimit.accountPattern).test(this.account) === false) {
                    this.accountInvalid = true
                    this.warnMessage = '无效的账号'
                    return
                }
                if (new RegExp(this.accountInputLimit.passwordPattern).test(this.password) === false) {
                    this.passwordInvalid = true
                    this.warnMessage = '无效的密码'
                    return
                }
                const obj = {
                    account: this.account,
                    password: this.password
                }
                this.setLoading()
                const res = (await ajax.login(obj)).data
                this.setLoading()
                if (res) {
                    store.commit('onlineUser', obj)
                    store.commit('loginHistoryPush', obj)
                    this.clickLogin()
                } else {
                    this.clickLogin(true)
                    this.warnMessage = '账号或密码错误'
                }
            },
            setLoading() {
                this.loading = !this.loading
            },
            clickLoginObj(obj) {
                this.account = obj.account;
                this.password = obj.password;
            },
            toRegister() {
                this.clickLogin()
                this.clickRegister()
            },
            toLogin() {
                this.clickRegister()
                this.clickLogin()
            },
            clickLogin(val) {
                store.commit('visibleLogin', val)
            },
            clickRegister(val) {
                store.commit('visibleRegister', val)
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
            this.accountInputLimit.passwordPattern = `^\\w{${minPassword},${maxPassword}}$`
            this.accountInputLimit.accountPattern = `^([^\\s=-\\\\+\\\\'\\\\"]*[a-zA-Z0-9]){${minAccount},${maxAccount}}$`
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/home";
</style>