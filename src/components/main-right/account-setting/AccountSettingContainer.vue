<template>
    <div id="account-setting-container">
        <section class="account-setting-container-header">
            <section class="account-setting-container-banner">
                <label>账号设置</label>
                <div class="my-music-space">
                    <img src="../../../assets/my-music-space.png">
                    我的音乐空间
                </div>
            </section>
            <section class="labels">
                <div class="labels-element" :class="{'labels-element-active':activeLabel===0}"
                     @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT)">个人资料
                </div>
                <div class="labels-element" :class="{'labels-element-active':activeLabel===1}"
                     @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_UPLOAD_AVATAR)">修改头像
                </div>
                <div class="labels-element" :class="{'labels-element-active':activeLabel===2}"
                     @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_EDIT_PASSWORD)">修改密码
                </div>
                <div class="labels-element" :class="{'labels-element-active':activeLabel===3}"
                     @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_SECURITY)">账号安全
                </div>
            </section>
        </section>
        <section class="account-setting-container-body">
            <slot></slot>
        </section>
        <div class="big-loading" v-show="visibleLoading"></div>
        <div class="success-img" v-show="visibleSuccess">
            <img src="../../../assets/success.png">
            <p>成功</p>
        </div>
    </div>
</template>

<script>
    import {
        MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT,
        MAIN_RIGHT_ACTIVE_EDIT_PASSWORD,
        MAIN_RIGHT_ACTIVE_SECURITY, MAIN_RIGHT_ACTIVE_UPLOAD_AVATAR
    } from "@/js/_const";

    export default {
        name: "AccountSettingContainer",
        props: {
            activeLabel: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                visibleLoading: false,
                visibleSuccess: false,
                constant: {
                    MAIN_RIGHT_ACTIVE_EDIT_PASSWORD,
                    MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT,
                    MAIN_RIGHT_ACTIVE_SECURITY,
                    MAIN_RIGHT_ACTIVE_UPLOAD_AVATAR
                },
            }
        },
        watch: {},
        computed: {},
        methods: {},
        mounted() {
        },
        created() {
            this.$on("loading", (val) => {
                this.visibleLoading = val
            })
            this.$on("success", (val) => {
                this.visibleSuccess = val
                if (val) {
                    setTimeout(() => {
                        this.visibleSuccess = false
                    }, 1500)
                }
            })
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../style/common";

    #account-setting-container {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: $lighter-gray;

        .account-setting-container-header {
            .account-setting-container-banner {
                width: 100%;
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 20px;
                box-sizing: border-box;
                font-size: 11px;
                border-bottom: 1px solid #dddddd;

                label {
                    color: #777777;
                }

                .my-music-space {
                    color: $light-blue;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 16px;
                        height: 16px;
                    }

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .labels {
                width: $account-setting-labels-width;
                margin: 10px auto;
                display: flex;
                align-items: center;
                border-bottom: 1px solid $light-blue;

                .labels-element {
                    color: white;
                    background-color: $light-gray;
                    font-size: 14px;
                    padding: 5px 20px;
                    margin-right: 10px;
                    cursor: pointer;

                    &:hover {
                        background-color: gray;
                    }
                }

                .labels-element-active {
                    background-color: $light-blue;
                }
            }
        }

        .account-setting-container-body {
            width: 100%;
        }

        .success-img {
            position: absolute;
            left: calc(50% - 50px);
            top: calc(50% - 100px);
            width: 100px;
            height: 100px;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            border-radius: 5px;

            p {
                width: 100%;
                text-align: center;
                margin: 0;
            }
        }
    }
</style>