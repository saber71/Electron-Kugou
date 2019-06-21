<template>
    <div id="BindEmail">
        <account-setting-container :active-label="3" ref="container">
            <form class="content">
                <br/>
                <section class="form-line">
                    <label class="label">邮箱地址：</label>
                    <div class="right">
                        <input :class="{'input-invalid':warn.email.length>0}" v-model="input.email"
                               @blur="emailValidator">
                        <img class="success" src="../../../assets/success.png" v-show="success.email">
                        <div class="warn" v-show="warn.email.length>0">
                            <img src="../../../assets/sigh.png">{{warn.email}}
                        </div>
                    </div>
                </section>
                <section class="form-line">
                    <label></label>
                    <label class="message" :style="{opacity:alreadySend?1:0}">
                        已发送验证码到您的安全邮箱<span>{{input.email}}</span>
                    </label>
                </section>
                <section class="form-line">
                    <label class="label"><span>*</span>验证码：</label>
                    <div class="right">
                        <input class="input-code" :class="{'input-invalid':warn.code.length>0}"
                               v-model="input.code" placeholder="请输入邮件中的验证码"
                               @blur="codeValidator"
                               :maxLength="input.verificationCode.length">
                        <div class="send-msg" :class="{'cannot-send-msg':countDown>=0}"
                             @click="sendMsg">
                            {{countDown<0?'发送验证码':`重新发送(${countDown}s)`}}
                        </div>
                        <img class="success" src="../../../assets/success.png" v-show="success.code">
                        <div class="warn" v-show="warn.code.length>0">
                            <img src="../../../assets/sigh.png">{{warn.code}}
                        </div>
                    </div>
                </section>
                <br/>
                <section class="form-line">
                    <label class="label">密码：</label>
                    <div class="right">
                        <input :class="{'input-invalid':warn.password.length>0}" v-model="input.password"
                               @blur="passwordValidator">
                        <img class="success" src="../../../assets/success.png" v-show="success.password">
                        <div class="warn" v-show="warn.password.length>0">
                            <img src="../../../assets/sigh.png">{{warn.password}}
                        </div>
                    </div>
                </section>
                <br/>
                <section class="form-line">
                    <label></label>
                    <div class="right">
                        <div class="save" @click="save">确定</div>
                        <div class="back" @click="goBack">返回</div>
                        <div class="warn" :style="{'margin-top':0}" v-show="warn.result.length>0">
                            <img src="../../../assets/sigh.png">{{warn.result}}
                        </div>
                    </div>
                </section>
            </form>
        </account-setting-container>
    </div>
</template>

<script>
    import AccountSettingContainer from "@/components/main-right/account-setting/AccountSettingContainer";
    import {boolNoVal, generateCode, strNoVal} from "@/js/util";
    import {generateVerificationCode, validEmail} from "@/js/reg";
    import ajax from "@/js/ajax";

    export default {
        name: "BindEmail",
        components: {AccountSettingContainer},
        props: {},
        data() {
            return {
                maxEmailLength: 20,
                countDown: -1,
                alreadySend: false,
                userData: store.state.userData,
                input: {
                    email: '',
                    code: '',
                    verificationCode: '',
                    password: ''
                },
                warn: {
                    email: '',
                    code: '',
                    password: '',
                    result: ''
                },
                success: {
                    email: false,
                    code: false,
                    password: false
                }
            }
        },
        watch: {
            'input.email'() {
                this.alreadySend = false
            }
        },
        computed: {},
        methods: {
            goBack() {
                store.commit('goBack')
            },
            async emailValidator() {
                const val = this.input.email
                this.warn.email = ''
                this.success.email = false
                if (strNoVal(val)) {
                    this.warn.email = '不能为空'
                } else if (!validEmail(val)) {
                    this.warn.email = '无效的邮箱'
                } else {
                    const res = (await ajax.emailValidator(val)).data
                    if (res) {
                        this.warn.email = '邮箱已被绑定'
                    } else {
                        this.success.email = true
                    }
                }
            },
            codeValidator() {
                const val = this.input.code
                this.warn.code = ''
                this.success.code = false
                if (strNoVal(val)) {
                    this.warn.code = '不能为空'
                } else if (val !== this.input.verificationCode) {
                    this.warn.code = '验证码错误'
                } else {
                    this.success.code = true
                }
            },
            async passwordValidator() {
                const val = this.input.password
                this.warn.password = ''
                this.success.password = false
                if (strNoVal(val)) {
                    this.warn.password = '不能为空'
                } else if (val !== this.userData.password) {
                    this.warn.password = '密码错误'
                } else {
                    this.success.password = true
                }
            },
            sendMsg() {
                if (this.countDown > 0 || !this.success.email) {
                    return
                }
                this.countDown = 60
                this.alreadySend = true
                this.input.verificationCode = generateVerificationCode()
                alert("验证码：" + this.input.verificationCode)
                const handler = setInterval(() => {
                    this.countDown--
                    if (this.countDown < 0) {
                        clearInterval(handler)
                    }
                }, 1000)
            },
            async save() {
                const success = this.success
                if (boolNoVal(success.code, success.password, success.email)) {
                    return
                }
                this.userData.email = this.input.email
                store.state.userData = this.userData
                const container = this.$refs.container
                container.$emit('loading', true)
                const res = (await ajax.saveUserData()).data
                container.$emit('loading', false)
                if (res) {
                    container.$emit('success', true)
                } else {
                    this.warn.result = '无法连接服务器'
                }
            },
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
    @import "../../../style/main-right/bind-email";
</style>