<template>
    <div id="user">
        <div class="user-content">
            <div class="avatar">
                <img :src="getAvatar()">
            </div>
            <label class="name" :title="getName()">{{getName()}}</label>
            <div class="vip" :class="{'vip-active':getType()===1}" :title="getTypeText()">SVIP</div>
        </div>
        <section class="user-popup">
        </section>
    </div>
</template>

<script>
    import ajax from "@/js/ajax";

    export default {
        name: "User",
        props: {},
        data() {
            return {
                userData: undefined
            }
        },
        watch: {},
        computed: {},
        methods: {
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