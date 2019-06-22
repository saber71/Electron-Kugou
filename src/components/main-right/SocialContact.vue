<template>
    <div id="SocialContactContainer">
        <h1 class="title">{{banner}}[{{userDataArray?userDataArray.length:0}}]</h1>
        <section class="content" v-if="userDataArray">
            <section class="zero" v-if="userDataArray.length===0">
                <div class="card">
                    <img src="../../assets/no-friend.png"><br/>
                    {{zeroMsg}}
                </div>
            </section>
            <section class="user-brief-data" v-else>
                <div class="item" v-for="(v,index) in userDataArray" @click="remove(index)">
                    <user-brief-data :user-data="v"></user-brief-data>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
    import {LOADING} from "@/js/event-bus";
    import ajax from "@/js/ajax";
    import UserBriefData from "@/components/main-right/UserBriefData";
    import {remove} from "@/js/util";

    export default {
        name: "SocialContact",
        components: {UserBriefData},
        props: {},
        data() {
            return {
                userDataArray: undefined,
                banner: '',
                zeroMsg: ''
            }
        },
        watch: {},
        computed: {},
        methods: {
            remove(index) {
                remove(this.userDataArray, index)
            }
        },
        mounted() {
        },
        async created() {
            const type = store.state.socialContactType
            const account = store.state.musicSpaceUser
            eventBus.$emit(LOADING, true)
            switch (type) {
                case 0:
                    this.banner = account + '的好友'
                    this.zeroMsg = '还没有好友哦'
                    this.userDataArray = (await ajax.getFriends()).data
                    break
                case 1:
                    this.banner = account + '的关注'
                    this.zeroMsg = '还没有关注其他人哦'
                    this.userDataArray = (await ajax.getFocusUser()).data
                    break
                case 2:
                    this.banner = account + '的粉丝'
                    this.zeroMsg = '还没有粉丝哦'
                    this.userDataArray = (await ajax.getFans()).data
                    break
                case 3:
                    this.banner = account + '的访客'
                    this.zeroMsg = '还没有访客哦'
                    this.userDataArray = (await ajax.getSpaceVisitors()).data
                    break
            }
            eventBus.$emit(LOADING, false)
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";

    #SocialContactContainer {
        width: 100%;
        height: $main-right-height;
        padding: 20px;
        overflow: auto;
        box-sizing: border-box;

        .title {
            font-size: 18px;
            margin-top: 0;
            color: rgba(0, 0, 0, 0.7);
        }

        .content {
            .zero {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                .card {
                    font-size: 13px;
                    color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        margin-bottom: 20px;
                    }
                }
            }

            .user-brief-data {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 10px;

                .item {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>