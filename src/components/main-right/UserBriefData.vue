<template>
    <div id="UserBriefData">
        <div class="top" @click.stop="">
            <div class="avatar">
                <img :src="userData.avatar">
            </div>
            <label class="name">
                {{userData.name}}<br/>
                <span class="date">{{userData.date}}</span>
            </label>
        </div>
        <div class="bottom"
             @mouseenter="hover=true" @mouseleave="hover=false">
            <div class="record" v-if="userData.date" @click="removeRecord">删除记录</div>
            <div class="focus" v-else @click.stop="focus">
                {{userData.focus?hover?'取消关注':'已关注':'关注'}}
            </div>
        </div>
    </div>
</template>

<script>

    import {FAIL, LOADING, SUCCESS} from "@/js/event-bus";
    import ajax from "@/js/ajax";

    export default {
        name: "UserBriefData",
        props: {
            userData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                hover: false
            }
        },
        watch: {},
        computed: {},
        methods: {
            async focus() {
                const data = this.userData
                eventBus.$emit(LOADING, true)
                const res = (await ajax.setFocus(data.account, !data.focus)).data
                eventBus.$emit(LOADING, false)
                if (res) {
                    eventBus.$emit(SUCCESS)
                    data.focus = !data.focus
                } else {
                    eventBus.$emit(FAIL)
                }
            },
            async removeRecord() {
                const data = this.userData
                eventBus.$emit(LOADING, true)
                const res = (await ajax.removeVisitRecord(data.account,)).data
                eventBus.$emit(LOADING, false)
                if (res) {
                    eventBus.$emit(SUCCESS)
                } else {
                    eventBus.$emit(FAIL)
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
    @import "../../style/common";

    #UserBriefData {
        height: $main-right-height;
        border: 1px solid #dddddd;

        .top {
            padding: 20px;
            display: grid;
            grid-template-columns: 50px auto;
            grid-gap: 10px;
            align-items: center;
            border-bottom: 1px solid #dddddd;
            cursor: pointer;

            .avatar {
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                }
            }

            .name {
                color: $black;
                font-size: 16px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                cursor: pointer;

                .date {
                    font-size: 12px;
                    color: gray;
                    line-height: 25px;
                }
            }

            &:hover {
                .name {
                    color: $blue;
                }
            }
        }

        .bottom {
            font-size: 14px;
            color: $light-black;
            cursor: pointer;
            text-align: center;
            padding: 10px 0;

            &:hover {
                color: $blue;
            }
        }
    }
</style>