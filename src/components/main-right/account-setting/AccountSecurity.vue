<template>
    <div id="account-security">
        <account-setting-container :active-label="3" ref="container">
            <section class="content">
                <section class="line">
                    <div class="left">
                        <div class="icon" :class="{'email-icon-active':email}">
                            <img src="../../../assets/message-white.png">
                        </div>
                        <div class="label">
                            <div class="top">安全邮箱<label>（安全邮箱可用于找回密码和登录帐号）</label></div>
                            <label class="bottom">{{email}}</label>
                        </div>
                    </div>
                    <div class="right">
                        <label>状态：<span :class="[email?'already-set':'no-set']">{{email?'已设置':'未设置'}}</span></label>
                        <button class="hidden" v-if="email">解除绑定</button>
                        <button class="to-set" v-else @click="mainRightActive(constant.toBindEmail)">立即设置</button>
                    </div>
                </section>
                <section class="line">
                    <div class="left">
                        <div class="icon" :class="{'phone-icon-active':phone}">
                            <img src="../../../assets/mobile.png">
                        </div>
                        <div class="label">
                            <div class="top">安全手机<label>（验证后可以用于找回密码和登录帐号）</label></div>
                            <label class="bottom">{{getPhone}}</label>
                        </div>
                    </div>
                    <div class="right">
                        <label>状态：<span :class="[phone?'already-set':'no-set']">{{phone?'已验证':'未设置'}}</span></label>
                        <button class="to-unbind" v-if="phone" @click="popupUnbindPhone=true">解除绑定</button>
                        <button class="to-set" v-else @click="popupBindPhone=true">立即设置</button>
                    </div>
                </section>
                <section class="line">
                    <div class="left">
                        <div class="icon" :class="{'question-icon-active':question}">
                            <img src="../../../assets/lock.png">
                        </div>
                        <div class="label">
                            <div class="top">安全问题<label>（通过安全问题重新设置密码）</label></div>
                            <label class="bottom">{{question}}</label>
                        </div>
                    </div>
                    <div class="right">
                        <label>状态：<span
                                :class="[question?'already-set':'no-set']">{{question?'已设置':'未设置'}}</span></label>
                        <button class="to-set" v-if="!question" @click="popupSetQuestion=true">立即设置
                        </button>
                        <button class="hidden" v-else>解除绑定</button>
                    </div>
                </section>
            </section>
        </account-setting-container>
        <section class="popup" v-show="popupUnbindPhone">
            <div class="mask" @click="popupUnbindPhone=false"></div>
            <section class="unbind-phone">
                <div class="top">
                    <span>温馨提示</span>
                    <div class="close" @click="popupUnbindPhone=false"></div>
                </div>
                <section class="body">
                    <p class="banner">解除手机绑定后，您的帐号会有极大的风险</p>
                    <p class="banner">手机号：{{getPhone}}</p>
                    <div class="line">
                        <input v-model="code" :maxLength="verificationCode.length"
                               @blur="codeValidator">
                        <button class="send-message" :class="{'cannot-send':countDown>=0}"
                                @click="sendMessage">{{countDown>=0?`重新发送(${countDown}s)`:'获取短信'}}
                        </button>
                    </div>
                    <div class="line">
                        <label class="warn" :style="{visibility:warnCode.length>0?'visible':'hidden'}">
                            <img src="../../../assets/sigh.png">{{warnCode}}
                        </label>
                        <span>手机号收不到验证码？</span>
                    </div>
                    <button class="save" @click="unbindPhone">确定</button>
                </section>
            </section>
        </section>
        <section class="popup" v-show="popupBindPhone">
            <div class="mask" @click="popupBindPhone=false"></div>
            <section class="bind-phone">
                <div class="top">
                    <span>绑定手机号</span>
                    <div class="close" @click="popupBindPhone=false"></div>
                </div>
                <section class="body">
                    <input class="input-phone" v-model="inputPhone" placeholder="请输入手机号" maxlength="11"
                           @blur="phoneValidator">
                    <div class="warn" :style="{visibility:warnPhone.length>0?'visible':'hidden'}">
                        <img src="../../../assets/sigh.png">{{warnPhone}}
                    </div>
                    <div class="line">
                        <input v-model="code" :maxLength="verificationCode.length"
                               @blur="codeValidator">
                        <button class="send-message" :class="{'cannot-send':countDown>=0}"
                                @click="sendMessage">{{countDown>=0?`重新发送(${countDown}s)`:'获取短信'}}
                        </button>
                    </div>
                    <div class="line">
                        <label class="warn" :style="{visibility:warnCode.length>0?'visible':'hidden'}">
                            <img src="../../../assets/sigh.png">{{warnCode}}
                        </label>
                        <span>手机号收不到验证码？</span>
                    </div>
                    <button class="save" @click="bindPhone">确定</button>
                </section>
            </section>
        </section>
        <section class="popup" v-show="popupSetQuestion">
            <div class="mask" @click="popupSetQuestion=false"></div>
            <section class="bind-phone">
                <div class="top">
                    <span>设置安全问题</span>
                    <div class="close" @click="popupSetQuestion=false"></div>
                </div>
                <section class="body">
                    <input class="input-question" v-model="inputQuestion" placeholder="请输入问题" maxlength="20"
                           @blur="questionValidator">
                    <div class="warn" :style="{visibility:warnQuestion.length>0?'visible':'hidden'}">
                        <img src="../../../assets/sigh.png">{{warnQuestion}}
                    </div>
                    <input class="input-answer" v-model="inputAnswer" placeholder="请输入答案"
                           maxlength="10" @blur="answerValidator">
                    <div class="warn" :style="{visibility:warnAnswer.length>0?'visible':'hidden'}">
                        <img src="../../../assets/sigh.png">{{warnAnswer}}
                    </div>
                    <button class="save" @click="setQuestion">确定</button>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    import AccountSettingContainer from "@/components/main-right/account-setting/AccountSettingContainer";
    import ajax from "@/js/ajax";
    import {
        MAIN_RIGHT_ACTIVE_EDIT_PASSWORD,
        MAIN_RIGHT_ACTIVE_SECURITY_EMAIL,
    } from "@/js/_const";
    import {strNoVal} from "@/js/util";
    import {generateVerificationCode, onlyChinese, validPhone} from "@/js/reg";

    export default {
        name: "AccountSecurity",
        components: {AccountSettingContainer},
        props: {},
        data() {
            return {
                email: undefined,
                phone: undefined,
                inputPhone: '',
                question: undefined,
                inputQuestion: '',
                inputAnswer: '',
                constant: {
                    toBindEmail: MAIN_RIGHT_ACTIVE_SECURITY_EMAIL,
                },
                popupUnbindPhone: false,
                popupBindPhone: false,
                popupSetQuestion: false,
                code: '',
                verificationCode: '',
                countDown: -1,
                warnCode: '',
                warnPhone: '',
                warnQuestion: '',
                warnAnswer: ''
            }
        },
        watch: {
            popupUnbindPhone() {
                this.code = ''
                this.verificationCode = ''
                this.warnCode = ''
            },
            popupBindPhone() {
                this.code = ''
                this.verificationCode = ''
                this.warnCode = ''
            },
            popupSetQuestion(newVal) {
                if (newVal && strNoVal(store.state.userData.password)) {
                    alert('您还未设置密码，请先设置密码')
                    // this.mainRightActive(MAIN_RIGHT_ACTIVE_EDIT_PASSWORD)
                }
            }
        },
        computed: {
            getPhone() {
                if (strNoVal(this.phone)) {
                    return undefined
                }
                const phone = this.phone + ''
                return phone.substr(0, 3) + '****' + phone.substring(phone.length - 4)
            },
        },
        methods: {
            codeValidator() {
                const val = this.code
                this.warnCode = ''
                if (strNoVal(val)) {
                    this.warnCode = '不能为空'
                } else if (val !== this.verificationCode) {
                    this.warnCode = '验证码有误'
                }
            },
            sendMessage() {
                if (this.countDown >= 0) {
                    return
                }
                this.countDown = 60
                this.verificationCode = generateVerificationCode()
                alert(this.verificationCode)
                const handler = setInterval(() => {
                    this.countDown--
                    if (this.countDown < 0) {
                        clearInterval(handler)
                    }
                }, 1000)
            },
            async phoneValidator() {
                const val = this.inputPhone
                this.warnPhone = ''
                if (strNoVal(val)) {
                    this.warnPhone = '不能为空'
                } else if (!validPhone(val)) {
                    this.warnPhone = '无效的手机号'
                } else {
                    const res = (await ajax.phoneValidator(val)).data
                    if (res) {
                        this.warnPhone = '该手机号已被绑定'
                    }
                }
            },
            questionValidator() {
                const val = this.inputQuestion
                this.warnQuestion = ''
                if (strNoVal(val)) {
                    this.warnQuestion = '不能为空'
                } else if (!onlyChinese(val, 10)) {
                    this.warnQuestion = '问题只能包含1-10个汉字'
                }
            },
            answerValidator() {
                const val = this.inputAnswer
                this.warnAnswer = ''
                if (strNoVal(val)) {
                    this.warnAnswer = '不能为空'
                } else if (!onlyChinese(val, 10)) {
                    this.warnAnswer = '答案只能包含1-10个汉字'
                }
            },
            async unbindPhone() {
                if (this.warnCode.length > 0) {
                    return
                }
                store.state.userData.phone = ''
                this.phone = ''
                this.popupUnbindPhone = false
                const container = this.$refs.container
                container.$emit('loading', true)
                const res = (await ajax.saveUserData()).data
                container.$emit('loading', false)
                if (res) {
                    container.$emit('success', true)
                } else {
                    alert('无法连接服务器')
                }
            },
            async bindPhone() {
                if (this.warnPhone.length > 0 || this.warnCode.length > 0) {
                    return
                }
                this.phone = this.inputPhone
                store.state.userData.phone = this.phone
                this.popupBindPhone = false
                const container = this.$refs.container
                container.$emit('loading', true)
                const res = (await ajax.saveUserData()).data
                container.$emit('loading', false)
                if (res) {
                    container.$emit('success', true)
                } else {
                    alert('无法连接服务器')
                }
            },
            async setQuestion() {
                if (this.warnQuestion.length > 0 || this.warnAnswer.length > 0) {
                    return
                }
                this.question = this.inputQuestion
                store.state.userData.question = this.question
                store.state.userData.answer = this.inputAnswer
                this.popupSetQuestion = false
                const container = this.$refs.container
                container.$emit('loading', true)
                const res = (await ajax.saveUserData()).data
                container.$emit('loading', false)
                if (res) {
                    container.$emit('success', true)
                } else {
                    alert('无法连接服务器')
                }
            },
        },
        mounted() {
        },
        async created() {
            let userData = undefined
            if (store.state.userData)
                userData = store.state.userData
            else {
                userData = (await ajax.getUserData()).data
            }
            this.email = userData.email
            this.phone = userData.phone
            this.question = userData.securityQuestion
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../style/common";

    #account-security {
        width: 100%;
        height: $main-right-height;
        position: relative;

        .content {
            width: $account-setting-labels-width;
            margin: auto;

            .line {
                padding: 10px 0;
                border-bottom: 1px solid #dddddd;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .left {
                    display: flex;
                    align-items: center;

                    .icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;
                        overflow: hidden;
                        border-radius: 50%;
                        background-color: #BCBCBC;

                        img {
                            width: 16px;
                            height: 16px;
                        }
                    }

                    .email-icon-active {
                        background-color: #B178DD;
                    }

                    .phone-icon-active {
                        background-color: #EBA83F;
                    }

                    .question-icon-active {
                        background-color: #5CD6D7;
                    }

                    .label {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;

                        .top {
                            font-size: 16px;
                            color: #333333;

                            label {
                                font-size: 14px;
                                color: #aaaaaa;
                            }
                        }

                        .bottom {
                            font-size: 14px;
                            color: #aaaaaa;
                            line-height: 20px;
                        }
                    }
                }

                .right {
                    display: flex;
                    align-items: center;

                    label {
                        color: #aaaaaa;
                        font-size: 14px;
                        margin-right: 10px;

                        .already-set {
                            color: #333333;
                        }
                    }

                    .to-set {
                        background-color: $blue;
                        color: white;
                        padding: 5px 20px;
                        font-size: 14px;
                        border-radius: 3px;

                        &:hover {
                            background-color: #148bdc;
                        }
                    }

                    .hidden {
                        @extend .to-set;
                        visibility: hidden;
                    }

                    .to-unbind {
                        font-size: 14px;
                        color: #444444;
                        border: 1px solid #BBBBBB;
                        padding: 5px 20px;
                        border-radius: 3px;
                        background-color: white;

                        &:hover {
                            box-shadow: 0 0 2px gray;
                        }
                    }
                }
            }
        }

        .popup {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;

            .mask {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }

            .unbind-phone, .bind-phone {
                width: 400px;
                margin: 100px auto 0;
                box-shadow: 0 0 5px gray;
                padding: 5px 10px;
                background-color: white;
                position: relative;
                z-index: 1;

                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #dddddd;

                    span {
                        font-size: 10px;
                        color: #a7a7a7;
                    }

                    .close {
                        cursor: pointer;
                        width: 14px;
                        height: 14px;
                        position: relative;

                        &:before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 50%;
                            width: 100%;
                            height: 1px;
                            background-color: #BBBBBB;
                            transform: rotate(-45deg);
                        }

                        &:after {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 50%;
                            width: 100%;
                            height: 1px;
                            background-color: #BBBBBB;
                            transform: rotate(45deg);
                        }
                    }
                }

                .body {
                    width: 300px;
                    margin: auto;
                    padding: 25px 0;

                    .banner {
                        font-size: 15px;
                        color: #666666;
                        text-align: center;
                        margin: 0;
                        padding: 0;
                        line-height: 25px;
                    }

                    .input-phone, .input-question, .input-answer {
                        width: 100%;
                        border: 1px solid #dddddd;
                        color: #666666;
                        padding: 10px;
                        box-sizing: border-box;
                    }

                    .line {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        input {
                            width: 190px;
                            padding: 10px;
                            box-sizing: border-box;
                            color: #777777;
                            border: 1px solid #dddddd;
                            font-size: 13px;
                        }

                        .send-message {
                            width: 100px;
                            border-radius: 1px;
                            text-align: center;
                            font-size: 13px;
                            background-color: white;
                            color: #666666;
                            border: 1px solid #dddddd;
                            padding: 10px 0;

                            &:hover {
                                border-color: #888888;
                                color: #555555;
                            }
                        }

                        .cannot-send {
                            color: #D0D0D0;
                            cursor: default;

                            &:hover {
                                color: #D0D0D0;
                                background-color: white;
                                border-color: #dddddd;
                            }
                        }

                        span {
                            color: $blue;
                            font-size: 12px;
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }

                    .warn {
                        font-size: 12px;
                        padding: 5px;
                        display: flex;
                        align-items: center;
                        color: red;

                        img {
                            width: 12px;
                            height: 12px;
                            margin-right: 5px;
                        }
                    }

                    .save {
                        font-size: 15px;
                        padding: 10px 0;
                        width: 100%;
                        text-align: center;
                        background-color: $blue;
                        color: white;
                        border-radius: 2px;
                        position: relative;

                        &:before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
                        }

                        &:hover {
                            filter: brightness(1.1)
                        }
                    }
                }
            }
        }
    }
</style>