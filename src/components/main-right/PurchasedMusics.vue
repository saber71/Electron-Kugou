<template>
    <div id="PurchasedMusics" v-if="purchasedMusics">
        <section class="header">
            <div class="content">
                <div class="item" :class="{'item-active':activeLabel===0}"
                     @click="activeLabel=0">音乐包( {{purchasedMusics.musicBag.length}} )
                </div>
                <div class="item" :class="{'item-active':activeLabel===1}"
                     @click="activeLabel=1">付费单曲( {{purchasedMusics.singleSings.length}} )
                </div>
                <div class="item" :class="{'item-active':activeLabel===2}"
                     @click="activeLabel=2">已购专辑( {{purchasedMusics.albums.length}} )
                </div>
            </div>
            <div class="line"></div>
        </section>
        <section class="main">
            <div class="music-bag-warn"
                 v-if="activeLabel===0&&purchasedMusics.musicBag.length>0&&!purchasedMusics.isSVIP">
                音乐包已过期，<span class="buy-vip" @click="buyVIP">续费音乐包</span>可再次下载
            </div>
            <net-music-group v-if="activeLabel===0" :musics="purchasedMusics.musicBag"></net-music-group>
            <net-music-group v-if="activeLabel===1" :musics="purchasedMusics.singleSings"></net-music-group>
        </section>
    </div>
</template>

<script>
    import ajax from "@/js/ajax";
    import {LOADING} from "@/js/event-bus";
    import {ranInteger} from "@/js/mock-random";
    import NetMusicGroup from "@/components/main-right/NetMusicGroup";

    export default {
        name: "PurchasedMusics",
        components: {NetMusicGroup},
        props: {},
        data() {
            return {
                purchasedMusics: undefined,
                activeLabel: 0
            }
        },
        watch: {},
        computed: {},
        methods: {
            buyVIP() {
                //    todo 续费SVIP
            }
        },
        mounted() {
        },
        async created() {
            eventBus.$emit(LOADING, true)
            this.purchasedMusics = (await ajax.getPurchasedMusics()).data
            eventBus.$emit(LOADING, false)
            this.purchasedMusics.isSVIP = false
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";

    #PurchasedMusics {
        width: 100%;
        height: $main-right-height;
        padding: 10px 20px;
        box-sizing: border-box;
        overflow: auto;

        .header {
            .content {
                display: flex;
                align-items: center;

                .item {
                    font-size: 14px;
                    color: $black;
                    padding: 5px 20px;
                    border-bottom: 2px solid transparent;
                    cursor: pointer;

                    &:hover {
                        color: $blue;
                    }
                }

                .item-active {
                    color: $blue;
                    border-bottom-color: $blue;
                }
            }

            .line {
                width: 100%;
                height: 1px;
                background-color: #dddddd;
                margin-top: -2px;
            }
        }

        .main {
            .music-bag-warn {
                font-size: 14px;
                color: $black;
                padding: 10px 0;
                margin-left: 5px;

                .buy-vip {
                    color: $blue;
                    cursor: pointer;
                }
            }
        }
    }
</style>