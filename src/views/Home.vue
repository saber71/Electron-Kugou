<template>
    <div id="home">
        <header>
            <div class="left">
                <img class="logo" src="../assets/logo.png">
                <div class="login">
                    <label @click="clickLogin">登陆</label>
                    <section class="login-sec" v-show="$store.state.visibleLogin">
                        <div class="mask" @click="clickLogin(false)"></div>
                        <div class="region">
                            <h3 class="title">登陆账号<img src="../assets/close.png" @click="clickLogin(false)"></h3>
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
                        <div class="mask" @click="clickRegister(false)"></div>
                        <div class="region">
                            <h3 class="title">快速注册<img src="../assets/close.png" @click="clickRegister(false)"></h3>
                            <form class="body">
                                <div class="element">
                                    <label>手机号码</label>
                                    <input class="form-input" :class="{'input-warn':registerWarn.phone}"
                                           @blur="()=>this.registerInput.phoneValidator()"
                                           maxlength="11" placeholder="请输入手机号码" v-model="registerInput.phone">
                                    <img class="sigh" src="../assets/sigh.png" v-show="registerWarn.phone">
                                </div>
                                <p class="warn" :class="{'warn-active':registerWarn.phone}">
                                    {{registerWarn.phoneMsg}}</p>
                                <div class="element">
                                    <label>短信验证</label>
                                    <input class="form-input-code" :class="{'input-warn':registerWarn.code}"
                                           @blur="()=>this.registerInput.codeValidator()"
                                           maxlength="6" v-model="registerInput.code">
                                    <button class="send-message" @click="()=>this.registerMethod.sendVerificationCode()"
                                            :class="{'send-message-disabled':!registerCanSendMessage}">
                                        {{registerCanSendMessage?'获取短信':`重新获取(${registerCountDown}秒)`}}
                                    </button>
                                    <img class="sigh" src="../assets/sigh.png" v-show="registerWarn.code">
                                </div>
                                <p class="warn" :class="{'warn-active':registerWarn.code}">{{registerWarn.codeMsg}}</p>
                                <div class="element">
                                    <label>密码</label>
                                    <div class="password-input">
                                        <input class="form-input" :class="{'input-warn':registerWarn.password}"
                                               @blur="()=>this.registerInput.passwordValidator()"
                                               :maxlength="accountInputLimit.maxPassword"
                                               placeholder="请输入密码" v-model="registerInput.password">
                                    </div>
                                    <img class="sigh" src="../assets/sigh.png" v-show="registerWarn.password">
                                </div>
                                <p class="warn" :class="{'warn-active':registerWarn.password}">
                                    {{registerWarn.passwordMsg}}</p>
                                <div class="element">
                                    <label>重复密码</label>
                                    <input class="form-input" :class="{'input-warn':registerWarn.twicePassword}"
                                           :maxlength="accountInputLimit.maxPassword"
                                           @blur="()=>this.registerInput.twicePasswordValidator()"
                                           placeholder="请再次输入密码" v-model="registerInput.twicePassword">
                                    <img class="sigh" src="../assets/sigh.png" v-show="registerWarn.twicePassword">
                                </div>
                                <p class="warn" :class="{'warn-active':registerWarn.twicePassword}">
                                    {{registerWarn.twicePasswordMsg}}</p>
                                <div class="element">
                                    <label>性别</label>
                                    <div class="radio-group">
                                        <input id="radio-man" type="radio" name="sex" :value="true"
                                               v-model="registerInput.man"><label for="radio-man">男</label>
                                        <input id="radio-woman" type="radio" name="sex" :value="true"
                                               v-model="registerInput.woman"><label for="radio-woman">女</label>
                                    </div>
                                </div>
                                <p class="warn" :class="{'warn-active':registerWarn.sex}">{{registerWarn.sexMsg}}</p>
                                <div class="element">
                                    <label></label>
                                    <div class="read">
                                        <input type="checkbox" class="form-checked" v-model="registerInput.read">
                                        我已阅读并同意<span class="with-underline">用户协议</span>、<span class="with-underline">隐私政策</span>
                                    </div>
                                </div>
                                <div class="element">
                                    <label></label>
                                    <div class="button-register">注册</div>
                                </div>
                                <p class="warn" :class="{'warn-active':registerWarn.register}">
                                    {{registerWarn.registerMsg}}</p>
                                <div class="element">
                                    <label></label>
                                    <div class="text">
                                        已注册，<span class="to-login" @click="toLogin">去登录</span>
                                    </div>
                                </div>
                            </form>
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
    import {getWindow, objNoVal, strNoVal} from "@/js/util";
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
                registerCanSendMessage: true,
                countDown: 60,
                registerCountDown: 0,
                registerWarn: {
                    phone: false,
                    phoneMsg: '',
                    code: false,
                    codeMsg: '',
                    password: false,
                    passwordMsg: '',
                    twicePassword: false,
                    twicePasswordMsg: '',
                    sex: false,
                    sexMsg: '',
                    register: false,
                    registerMsg: ''
                },
                registerInput: {
                    phone: '',
                    phoneValidator: async () => {
                        const val = this.registerInput.phone
                        this.registerWarn.phone = false
                        this.registerWarn.phoneMsg = ''
                        if (strNoVal(val)) {
                            this.registerWarn.phone = true
                            this.registerWarn.phoneMsg = '请输入手机号'
                        } else if (!validPhone(val)) {
                            this.registerWarn.phone = true
                            this.registerWarn.phoneMsg = '无效的手机号'
                        } else {
                            const res = (await ajax.verificationPhone(val)).data
                            if (!res) {
                                this.registerWarn.phone = true
                                this.registerWarn.phoneMsg = '该手机号已被注册'
                            }
                        }
                    },
                    code: '',
                    codeValidator: () => {
                        this.registerWarn.code = false
                        this.registerWarn.codeMsg = ''
                        const code = this.registerInput.code
                        if (strNoVal(code)) {
                            this.registerWarn.code = true
                            this.registerWarn.codeMsg = '请输入验证码'
                        } else if (code != this.registerInput.verificationCode) {
                            this.registerWarn.code = true
                            this.registerWarn.codeMsg = '验证码错误'
                        }
                    },
                    verificationCode: '1234567',
                    password: '',
                    passwordLevel: 0,
                    passwordValidator: () => {
                        const maxPassword = maxPassword
                        const minPassword = minPassword
                        const password = this.registerInput.password
                        this.registerWarn.password = false
                        this.registerWarn.passwordMsg = ''
                        this.registerInput.passwordLevel = 0
                        if (strNoVal(password)) {
                            this.registerWarn.password = true
                            this.registerWarn.passwordMsg = '请输入密码'
                        } else if (!password.match(this.accountInputLimit.passwordPattern)) {
                            this.registerWarn.password = true
                            this.registerWarn.passwordMsg = "请输入6-20位的数字或字符"
                        } else {
                            const strongPassword = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*!@#).{10,${maxPassword}}`
                            const middlePassword = `^(?=.*[a-z])(?=.*\\d).{${minPassword},${maxPassword}}`
                            if (password.match(strongPassword)) {
                                this.registerInput.passwordLevel = 3
                            } else if (password.match(middlePassword)) {
                                this.registerInput.passwordLevel = 2
                            } else {
                                this.registerInput.passwordLevel = 1
                            }
                        }
                    },
                    twicePassword: '',
                    twicePasswordValidator: () => {
                        const password = this.registerInput.password
                        const twicePassword = this.registerInput.twicePassword
                        this.registerWarn.twicePassword = false
                        this.registerWarn.twicePasswordMsg = ''
                        if (strNoVal(twicePassword)) {
                            this.registerWarn.twicePassword = true
                            this.registerWarn.twicePasswordMsg = '请再次输入密码'
                        } else if (password != twicePassword) {
                            this.registerWarn.twicePassword = true
                            this.registerWarn.twicePasswordMsg = '密码不一致'
                        }
                    },
                    man: false,
                    woman: false,
                    read: false,
                },
                registerMethod: {
                    sendVerificationCode: () => {
                        if (!this.registerCanSendMessage || this.registerWarn.phone) {
                            return;
                        }
                        const code = generateVerificationCode()
                        this.registerInput.verificationCode = code
                        setTimeout(() => {
                            alert('验证码：' + code)
                        }, ranInteger(500, 1500))
                        this.registerCanSendMessage = false
                        this.registerCountDown = 60
                        const handler = setInterval(() => {
                            if (this.registerCountDown <= 0) {
                                clearInterval(handler)
                                this.registerCanSendMessage = true
                                return
                            }
                            this.registerCountDown--
                        }, 1000)
                    },
                    register: async () => {
                        const input = this.registerInput
                        const warn = this.registerWarn
                        if (warn.phone || warn.code || warn.password || warn.twicePassword) {
                        } else if (!input.man && !input.woman) {
                            warn.sex = true
                            warn.sexMsg = '请选择性别'
                        } else {
                            const obj = {}
                            obj.account = input.phone
                            obj.password = input.password
                            obj.sex = input.sex
                            const res = (await ajax.register(obj)).data
                            if (res) {
                                loginSuccessful(obj)
                                this.clickRegister()
                            } else {
                                warn.register = true
                                warn.registerMsg = '注册失败'
                            }
                        }
                    },
                }
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
            },
            'registerInput.man': function (newVal) {
                if (newVal) {
                    this.registerInput.woman = false
                }
            },
            'registerInput.woman': function (newVal) {
                if (newVal) {
                    this.registerInput.man = false
                }
            }
        },
        computed: {},
        methods: {
            registerSendVerificationCode() {
                if (!this.registerCanSendMessage || this.registerWarn.phone) {
                    return;
                }
                const code = generateVerificationCode()
                this.registerInput.verificationCode = code
                setTimeout(() => {
                    alert('验证码：' + code)
                }, ranInteger(500, 1500))
                this.registerCanSendMessage = false
                this.registerCountDown = 60
                const handler = setInterval(() => {
                    if (this.registerCountDown <= 0) {
                        clearInterval(handler)
                        this.registerCanSendMessage = true
                        return
                    }
                    this.registerCountDown--
                }, 1000)
            },
            sendVerificationCode() {
                if (!this.canSendMessage) {
                    return;
                }
                this.warnMessage = ''
                this.accountInvalid = false
                if (strNoVal(this.account)) {
                    this.accountInvalid = true
                    this.warnMessage = '请输入手机号'
                    return
                }
                const account = parseInt(this.account)
                if (!validPhone(account)) {
                    this.accountInvalid = true
                    this.warnMessage = '无效的手机号'
                    return
                }
                const code = generateVerificationCode()
                store.commit('verificationCode', code)
                setTimeout(() => {
                    alert(code)
                }, ranInteger(500, 2000))
                this.canSendMessage = false
                this.countDown = 60
                const handler = setInterval(() => {
                    if (this.countDown <= 0) {
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
                if (strNoVal(account, this.password)) {
                    this.warnMessage = '请输入手机号和验证码'
                    this.accountInvalid = account === ''
                    this.passwordInvalid = this.password === ''
                    return
                }
                if (!validPhone(account)) {
                    this.accountInvalid = true
                    this.warnMessage = '无效的手机号'
                    return
                }
                if (!validVerificationCode(this.password)) {
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
                if (strNoVal(this.account, this.password)) {
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
            this.accountInputLimit.accountPattern = `^([^\\s/=-\\\\+\\\\'\\\\"]*[a-zA-Z0-9]){${minAccount},${maxAccount}}$`
        },
        destroyed() {
        }
    }

    function validPhone(phone) {
        phone = parseInt(phone)
        return phone > 10000000000 && phone < 20000000000
    }

    function validVerificationCode(code) {
        return parseInt(code) === store.state.verificationCode
    }

    function generateVerificationCode() {
        return ranInteger(100000, 999999) + ''
    }

    function loginSuccessful(account) {

    }
</script>

<style scoped lang="scss">
    @import "../style/home";
</style>