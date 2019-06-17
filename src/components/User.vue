<template>
    <div id="user">
        <div class="common-loading" v-if="!userData"></div>
        <div class="user-content" v-else @click="visiblePopup=!visiblePopup">
            <div class="user-content-avatar">
                <img :src="getAvatar()">
            </div>
            <label class="user-content-name" :title="getName()">{{getName()}}</label>
            <div class="user-content-vip" :class="{'vip-active':getType()===1}" :title="getTypeText()">SVIP</div>
        </div>
        <section class="user-popup" v-show="visiblePopup&&userData">
            <div class="mask" @click="visiblePopup=false"></div>
            <div class="user-popup-content">
                <div class="angle"></div>
                <div class="line1">
                    <div class="left">
                        <div class="avatar">
                            <img :src="getAvatar()">
                        </div>
                        <div class="text">
                            <div class="top">
                                <label class="name">{{getName()}}</label>
                                <img class="option-icon" src="../assets/option.png" @click="visibleOptionPopup=true">
                                <div class="option-popup" v-show="visibleOptionPopup">
                                    <div class="option-popup-mask" @click="visibleOptionPopup=false"></div>
                                    <div class="option-popup-content">
                                        <div class="option-popup-element" @click="toEditAccount">修改资料</div>
                                        <div class="option-popup-element" @click="exchangeAccount">切换账号</div>
                                        <div class="option-popup-element" @click="toMusicSpace">音乐空间</div>
                                    </div>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="user-content-vip" :class="{'vip-active':getType()===1}">SVIP</div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="my-music">已购音乐</div>
                    </div>
                </div>
                <div class="line2">
                    <div class="left">
                        积分：{{getScore()}}
                    </div>
                    <div class="divide"></div>
                    <div class="right">
                        <span class="fetch-money" v-show="kuMoney<0"
                              @click="fetchKuMoney">查询酷币余额</span>
                        <div class="common-loading" v-if="kuMoneyLoading"></div>
                        <label class="ku-money" v-show="kuMoney>=0&&!kuMoneyLoading">酷币余额：{{kuMoney}}</label>
                    </div>
                </div>
                <div class="line3">
                    <div class="line3-content">
                        <label class="text">{{isOpenedSVIP()?overTime()?'您的豪华VIP已过期':'豪华VIP将于'+getVipStatus()+'过期':'您还未开通豪华VIP'}}</label>
                        <label class="buy-svip">{{isOpenedSVIP()?'续费豪华VIP':'开通豪华VIP'}} >></label>
                    </div>
                </div>
                <div class="user-popup-bottom" @click="logout">退出当前账号</div>
            </div>
        </section>
    </div>
</template>

<script>
    import ajax from "@/js/ajax";
    import {overDate} from "@/js/util";
    import {MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT, MAIN_RIGHT_ACTIVE_MUSIC_SPACE} from "@/js/_const";

    export default {
        name: "User",
        props: {},
        data() {
            return {
                userData: undefined,
                visiblePopup: false,
                visibleOptionPopup: false,
                kuMoney: -1,
                kuMoneyLoading: false
            }
        },
        watch: {},
        computed: {},
        methods: {
            toEditAccount() {
                this.mainRightActive(MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT)
            },
            toMusicSpace() {
                this.mainRightActive(MAIN_RIGHT_ACTIVE_MUSIC_SPACE)
            },
            exchangeAccount() {
                this.visibleOptionPopup = false
                this.visiblePopup = false
                this.logout()
                store.commit('visibleLogin', true)
            },
            logout() {
                store.commit('onlineUser', undefined)
                store.commit('userData', undefined)
            },
            fetchKuMoney() {
                this.kuMoneyLoading = true
                this.kuMoney = 0
                setTimeout(async () => {
                    this.kuMoney = (await ajax.getKuMoney()).data
                    this.kuMoneyLoading = false
                })
            },
            overTime() {
                return overDate(this.getVipStatus())
            },
            isOpenedSVIP() {
                return this.getVipStatus() !== '0'
            },
            getAvatar() {
                return this.userData ? this.userData.avatar : ''
            },
            getName() {
                return this.userData ? this.userData.name : ''
            },
            getScore() {
                return this.userData ? this.userData.score : ''
            },
            getVipStatus() {
                return this.userData ? this.userData.vipStatus : ''
            },
            getType() {
                return this.userData ? this.userData.type : ''
            },
            getTypeText() {
                return this.getType() === 0 ? '普通用户' : '豪华VIP用户'
            }
        },
        mounted() {
        },
        async created() {
            this.userData = (await ajax.getUserData()).data
            store.commit('userData', this.userData)
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/user";
</style>