<template>
    <div id="edit-password">
        <account-setting-container :active-label="2" ref="container">
            <form class="content">
                <br/>
                <section class="form-line" v-show="!userData||userData.password.length>0">
                    <label><span>*</span>原密码：</label>
                    <div class="right">
                        <input :class="{'input-invalid':warn.oldPassword.length>0}"
                               @blur="oldPasswordValidator"
                               type="password" v-model="input.oldPassword" :maxLength="input.maxLength">
                        <div class="warn" v-show="warn.oldPassword.length>0">
                            <img src="../../../assets/sigh.png">
                            {{warn.oldPassword}}
                        </div>
                        <img class="success" v-show="input.oldPassword.length>0&&warn.oldPassword.length===0"
                             src="../../../assets/success.png">
                    </div>
                </section>
                <br/>
                <section class="form-line">
                    <label><span>*</span>新密码：</label>
                    <div class="input-new-password">
                        <div class="input">
                            <input :class="{'input-invalid':warn.newPassword.length>0}"
                                   @blur="newPasswordValidator"
                                   :type="input.newPasswordInputType"
                                   v-model="input.newPassword" :maxLength="input.maxLength">
                            <img class="eye" src="../../../assets/open-eye.png"
                                 v-if="input.newPasswordInputType==='text'"
                                 @click="input.newPasswordInputType='password'">
                            <img class="eye" src="../../../assets/close-eye.png" v-else
                                 @click="input.newPasswordInputType='text'">
                            <div class="warn" v-show="warn.newPassword.length>0">
                                <img src="../../../assets/sigh.png">
                                {{warn.newPassword}}
                            </div>
                            <img class="success" v-show="input.newPassword.length>0&&warn.newPassword.length===0"
                                 src="../../../assets/success.png">
                        </div>
                        <div class="password-level">
                            密码强度：弱&nbsp;
                            <div class="line">
                                <div class="inner" :class="{'inner-active':input.newPasswordLevel>=1}"></div>
                            </div>
                            <div class="line">
                                <div class="inner" :class="{'inner-active':input.newPasswordLevel>=2}"></div>
                            </div>
                            <div class="line">
                                <div class="inner" :class="{'inner-active':input.newPasswordLevel>=3}"></div>
                            </div>
                            强
                        </div>
                    </div>
                </section>
                <section class="form-line">
                    <label><span>*</span>确认密码：</label>
                    <div class="right">
                        <input :class="{'input-invalid':warn.repeatPassword.length>0}"
                               @blur="repeatPasswordValidator"
                               type="password" v-model="input.repeatPassword" :maxLength="input.maxLength">
                        <div class="warn" v-show="warn.repeatPassword.length>0">
                            <img src="../../../assets/sigh.png">
                            {{warn.repeatPassword}}
                        </div>
                        <img class="success" v-show="input.repeatPassword.length>0&&warn.repeatPassword.length===0"
                             src="../../../assets/success.png">
                    </div>
                </section>
                <br/>
                <section class="form-line">
                    <label><span>*</span>验证码：</label>
                    <div class="right">
                        <input class="input-code" :class="{'input-invalid':warn.code.length>0}" v-model="input.code"
                               @blur="codeValidator">
                        <canvas id="canvas" width="65" height="25"></canvas>
                        <span class="change" @click="drawCode">换一个</span>
                        <div class="warn" v-show="warn.code.length>0">
                            <img src="../../../assets/sigh.png">
                            {{warn.code}}
                        </div>
                        <img class="success" v-show="input.code.length>0&&warn.code.length===0"
                             src="../../../assets/success.png">
                    </div>
                </section>
                <br/>
                <section class="form-line">
                    <label></label>
                    <div class="right">
                        <div class="save" @click="save">确定</div>
                        <div class="warn" v-show="warn.save.length>0">
                            <img src="../../../assets/sigh.png">
                            {{warn.save}}
                        </div>
                    </div>
                </section>
            </form>
        </account-setting-container>
    </div>
</template>

<script>
    import AccountSettingContainer from "@/components/main-right/account-setting/AccountSettingContainer";
    import {maxPassword} from "@/js/_const";
    import {allStrNoVal, generateCode, objNoVal, strNoVal} from "@/js/util";
    import {ranColor} from "@/js/mock-random";
    import ajax from "@/js/ajax";
    import {isMiddlePassword, isStrongPassword, validPassword} from "@/js/reg";

    export default {
        name: "EditPassword",
        components: {AccountSettingContainer},
        props: {},
        data() {
            return {
                input: {
                    maxLength: maxPassword,
                    oldPassword: '',
                    newPassword: '',
                    newPasswordInputType: 'password',
                    newPasswordLevel: 0,
                    repeatPassword: '',
                    verificationCode: '',
                    validCodeTimeout: 0,
                    codeHandler: undefined,
                    code: ''
                },
                warn: {
                    oldPassword: '',
                    newPassword: '',
                    repeatPassword: '',
                    code: '',
                    save: ''
                },
                userData: undefined
            }
        },
        watch: {},
        computed: {},
        methods: {
            drawCode() {
                this.input.validCodeTimeout = 5
                if (this.input.codeHandler) {
                    clearInterval(this.input.codeHandler)
                }
                this.input.code = ''
                this.input.verificationCode = generateCode()
                const canvas = document.getElementById('canvas')
                const ctx = canvas.getContext('2d')
                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.font = 'italic 20px Arial'
                ctx.fillStyle = ranColor()
                ctx.fillText(this.input.verificationCode, 5, 20)
                this.input.codeHandler = setInterval(() => {
                    if (this.input.validCodeTimeout <= 0) {
                        clearInterval(this.input.codeHandler)
                    } else {
                        this.input.validCodeTimeout--
                    }
                }, 1000)
            },
            oldPasswordValidator() {
                if (objNoVal(this.userData)) {
                    return
                }
                const oldPassword = this.input.oldPassword
                this.warn.oldPassword = ''
                if (strNoVal(oldPassword)) {
                    this.warn.oldPassword = '不能为空'
                } else if (oldPassword != this.userData.password) {
                    this.warn.oldPassword = '密码错误'
                }
            },
            newPasswordValidator() {
                if (objNoVal(this.userData)) {
                    return
                }
                const val = this.input.newPassword
                this.warn.newPassword = ''
                if (strNoVal(val)) {
                    this.warn.newPassword = '不能为空'
                    this.setPasswordLevel(0)
                } else if (!validPassword(val)) {
                    this.warn.newPassword = '无效的密码'
                    this.setPasswordLevel(0)
                } else if (isStrongPassword(val)) {
                    this.setPasswordLevel(3)
                } else if (isMiddlePassword(val)) {
                    this.setPasswordLevel(2)
                } else {
                    this.setPasswordLevel(1)
                }
            },
            repeatPasswordValidator() {
                if (objNoVal(this.userData))
                    return
                const val = this.input.repeatPassword
                this.warn.repeatPassword = ''
                if (strNoVal(val)) {
                    this.warn.repeatPassword = '不能为空'
                } else if (val !== this.input.newPassword) {
                    this.warn.repeatPassword = '密码不一致'
                }
            },
            codeValidator() {
                if (objNoVal(this.userData))
                    return
                const val = this.input.code
                this.warn.code = ''
                if (strNoVal(val)) {
                    this.warn.code = '不能为空'
                } else if (this.input.validCodeTimeout <= 0) {
                    this.warn.code = '验证码已过期，请重新输入'
                } else if (val !== this.input.verificationCode) {
                    this.warn.code = '验证码错误'
                }
            },
            async save() {
                const warn = this.warn
                const input = this.input
                this.warn.save = ''
                if (strNoVal(input.repeatPassword, input.newPassword, input.code)) {
                    return
                }
                if (strNoVal(input.oldPassword) && !strNoVal(this.userData.password)) {
                    return
                }
                if (allStrNoVal(warn.newPassword, warn.oldPassword, warn.repeatPassword, warn.code)) {
                    const container = this.$refs.container
                    container.$emit('loading', true)
                    this.userData.password = this.input.newPassword
                    store.commit('userData', this.userData)
                    const res = (await ajax.saveUserData()).data
                    container.$emit('loading', false)
                    if (res) {
                        container.$emit('success', true)
                    } else {
                        this.warn.save = '无法连接服务器'
                    }
                }
            },
            setPasswordLevel(newVal) {
                const oldLevel = this.input.newPasswordLevel
                if (oldLevel !== newVal) {
                    this.input.newPasswordLevel = newVal
                    const innerEl = document.getElementsByClassName('inner')
                    if (oldLevel < newVal) {
                        for (let i = 0; i < 3; i++) {
                            innerEl.item(i).style.transitionDelay = (0.1 * i) + 's'
                        }
                    } else {
                        for (let i = 2; i >= 0; i--) {
                            innerEl.item(i).style.transitionDelay = (0.1 * (2 - i)) + 's'
                        }
                    }
                }
            }
        },
        mounted() {
            this.drawCode()
        },
        async created() {
            this.userData = store.state.userData
            if (!this.userData) {
                this.userData = (await ajax.getUserData()).data
            }
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../style/common";

    #edit-password {
        width: 100%;
        height: $main-right-height;

        .content {
            width: $account-setting-labels-width;
            margin: auto;
            grid-gap: 10px;
            font-size: 12px;

            .form-line {
                display: grid;
                grid-template-columns: 75px calc(100% - 85px);

                .right {
                    display: flex;
                    align-items: center;
                }

                label {
                    font-size: 13px;
                    display: inline-block;
                    width: 100%;
                    text-align: right;
                    color: #777777;

                    span {
                        margin-right: 2px;
                        color: red;
                    }
                }

                input {
                    width: 250px;
                    padding: 5px 10px;
                    box-sizing: border-box;
                    border: 1px solid #dddddd;
                    margin-top: -4px;
                    color: #BBBBBB;

                    &:hover {
                        border-color: #CECECE;
                    }

                    &:focus {
                        border-color: $light-blue;
                        color: #a7a7a7;
                    }
                }

                .input-invalid {
                    border-color: red;

                    &:focus, &:hover {
                        border-color: red;
                    }
                }

                .input {
                    display: flex;
                    align-items: center;
                    position: relative;

                    input {

                    }

                    .eye {
                        position: absolute;
                        left: 225px;
                        top: 2px;
                        width: 16px;
                        height: 16px;
                        cursor: pointer;
                        opacity: 0.5;
                    }
                }

                .success {
                    width: 12px;
                    height: 12px;
                    margin-left: 10px;
                }

                .warn {
                    padding: 5px 10px;
                    color: red;
                    margin-left: 10px;
                    margin-top: -4px;
                    display: flex;
                    align-items: center;
                    background-color: #FADADA;

                    img {
                        width: 16px;
                        height: 16px;
                        margin-right: 5px;
                    }
                }

                .password-level {
                    margin: 5px 0 10px;
                    display: flex;
                    align-items: center;
                    color: gray;

                    .line {
                        width: 50px;
                        height: 15px;
                        margin-right: 5px;
                        background-color: #E0E0E0;

                        .inner, .inner, .inner {
                            width: 0;
                            height: 100%;
                            background-color: $light-blue;
                            transition: width 0.1s ease;
                        }

                        .inner-active {
                            width: 50px;
                        }
                    }
                }

                .input-code {
                    width: 70px;
                }

                #canvas {
                    margin-top: -4px;
                    margin-left: 10px;
                    background-color: white;
                }

                .change {
                    cursor: pointer;
                    color: #a7a7a7;
                    margin-left: 10px;
                }

                .save {
                    color: white;
                    padding: 5px 20px;
                    background-color: $light-blue;
                    cursor: pointer;
                    font-size: 14px;
                    border-radius: 3px;

                    &:hover {
                        filter: brightness(1.1);
                    }
                }
            }
        }
    }
</style>