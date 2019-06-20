<template>
    <div id="account-security">
        <account-setting-container :active-label="3">
            <section class="content">
                <section class="line">
                    <div class="left">
                        <div class="icon" :class="{'icon-active':email}">
                            <img src="../../../assets/message-white.png">
                        </div>
                        <div class="label">
                            <div class="top">安全邮箱<label>（安全邮箱可用于找回密码和登录帐号）</label></div>
                            <label class="bottom">{{email}}</label>
                        </div>
                    </div>
                    <div class="right">
                        <label>状态：<span :class="[email?'already-set':'no-set']">{{email?'已设置':'未设置'}}</span></label>
                        <button class="to-unbind" v-if="email">解除绑定</button>
                        <button class="to-set" v-else>立即设置</button>
                    </div>
                </section>
                <section class="line">
                    <div class="left">
                        <div class="icon" :class="{'icon-active':phone}">
                            <img src="../../../assets/mobile.png">
                        </div>
                        <div class="label">
                            <div class="top">安全手机<label>（验证后可以用于找回密码和登录帐号）</label></div>
                            <label class="bottom">{{phone}}</label>
                        </div>
                    </div>
                    <div class="right">
                        <label>状态：<span :class="[phone?'already-set':'no-set']">{{phone?'已验证':'未设置'}}</span></label>
                        <button class="to-unbind" v-if="phone">解除绑定</button>
                        <button class="to-set" v-else>立即设置</button>
                    </div>
                </section>
                <section class="line">
                    <div class="left">
                        <div class="icon" :class="{'icon-active':question}">
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
                        <button class="to-unbind" v-if="question">解除绑定</button>
                        <button class="to-set" v-else>立即设置</button>
                    </div>
                </section>
            </section>
        </account-setting-container>
    </div>
</template>

<script>
    import AccountSettingContainer from "@/components/main-right/account-setting/AccountSettingContainer";
    import ajax from "@/js/ajax";

    export default {
        name: "AccountSecurity",
        components: {AccountSettingContainer},
        props: {},
        data() {
            return {
                email: undefined,
                phone: undefined,
                question: undefined
            }
        },
        watch: {},
        computed: {},
        methods: {},
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

                    .icon-active {
                        background-color: #EBA83F;
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
                }
            }
        }
    }
</style>