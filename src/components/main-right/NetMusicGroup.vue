<template>
    <div id="NetMusicGroup">
        <div class="banner">
            <div class="left" @click="allRight=!allRight">
                <div class="rect">
                    <img v-if="allRight" src="../../assets/right.png">
                </div>
                全选
            </div>
            <div class="right">
                <div class="play" @click="play">
                    <img src="../../assets/sanjiao-white.png">播放
                </div>
                <div class="add" @click="add">添加</div>
                <div class="download" @click="download">下载</div>
            </div>
        </div>
        <div class="content">
            <net-music v-for="(v,index) in musicArray" :music="v" :index="index"
                       :key="index+''" v-model="itemsRight[index]"></net-music>
        </div>
    </div>
</template>

<script>
    import NetMusic from "@/components/main-right/NetMusic";

    export default {
        name: "NetMusicGroup",
        components: {NetMusic},
        props: {
            musics: {
                type: Array,
                required: true
            },
            size: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                allRight: false,
                itemsRight: [],
                page: 1,
                size: 10,
            }
        },
        watch: {
            allRight(newVal) {
                for (let i = 0; i < this.itemsRight.length; i++) {
                    this.itemsRight[i] = newVal
                }
            }
        },
        computed: {
            musicArray() {
                const array = this.musics
                return array.slice((this.page - 1) * this.size, this.size)
            }
        },
        methods: {
            add() {
                //    todo add
            },
            play() {
                //    todo play
            },
            download() {
                //   todo download
            }
        },
        mounted() {
        },
        created() {
            const len = this.musics.length
            for (let i = 0; i < len; i++) {
                this.itemsRight.push(false)
            }
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../style/common";

    #NetMusicGroup {
        width: 100%;
        height: 100%;
        overflow: auto;

        .banner {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: $black;
                cursor: pointer;
                margin-left: 5px;

                .rect {
                    border: 1px solid $light-black;
                    border-radius: 1px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 12px;
                    height: 12px;
                    margin-right: 5px;

                    img {
                        width: 80%;
                        height: 80%;
                    }
                }
            }

            .right {
                font-size: 13px;
                color: $black;
                display: flex;
                align-items: center;

                .play, .add, .download {
                    padding: 5px 8px;
                    border: 1px solid #dddddd;
                    cursor: pointer;
                    margin: 0 5px;
                    border-radius: 3px;

                    &:hover {
                        color: $blue;
                    }
                }

                .play {
                    display: flex;
                    align-items: center;
                    color: white;
                    background-color: $blue;
                    border-color: transparent;

                    img {
                        width: 12px;
                        height: 12px;
                        margin-right: 5px;
                        transform: rotate(90deg);
                    }

                    &:hover {
                        background-color: $dark-blue;
                        color: white;
                    }
                }
            }
        }
    }
</style>