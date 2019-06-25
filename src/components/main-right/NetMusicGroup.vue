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
        <div class="pager">
            <button class="to-first" :class="{disabled:page===1}" @click="toStart">首页</button>
            <img class="prev" :class="{'img-disabled':page===1}"
                 @click="prev"
                 src="../../assets/arrow-down-dark.png">
            <label>{{page}} / {{totalPage}}</label>
            <img class="next" :class="{'img-disabled':page===totalPage}"
                 @click="next"
                 src="../../assets/arrow-down-dark.png">
            <button class="to-end" :class="{disabled:page===totalPage}" @click="toEnd">尾页</button>
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
                totalPage: 0
            }
        },
        watch: {
            allRight(newVal) {
                for (let i = 0; i < this.itemsRight.length; i++) {
                    this.itemsRight[i] = newVal
                }
            },
            page() {
                this.allRight = false
            }
        },
        computed: {
            musicArray() {
                const array = this.musics
                return array.slice((this.page - 1) * this.size, this.size * this.page)
            }
        },
        methods: {
            prev() {
                if (this.page > 1) {
                    this.page--
                }
            },
            next() {
                if (this.page < this.totalPage) {
                    this.page++
                }
            },
            toStart() {
                this.page = 1
            },
            toEnd() {
                this.page = this.totalPage
            },
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
            this.totalPage = parseInt(len / this.size)
            if (len % this.size > 0) {
                this.totalPage++
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
            margin-bottom: 5px;

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

        .pager {
            display: flex;
            align-items: center;
            justify-content: center;
            color: $black;
            font-size: 14px;
            margin-top: 10px;

            * {
                margin: 0 5px;
            }

            .to-first, .to-end {
                color: white;
                padding: 2px 10px;
                background-color: $blue;
                border-radius: 3px;

                &:hover {
                    background-color: $dark-blue;
                }
            }

            .disabled {
                cursor: default;
                opacity: 0.5;
                background-color: gray;

                &:hover {
                    background-color: gray;
                }
            }

            .prev, .next {
                width: 16px;
                height: 16px;
                cursor: pointer;
            }

            .prev {
                transform: rotate(90deg);
            }

            .next {
                transform: rotate(-90deg);
            }

            .img-disabled {
                cursor: default;
                opacity: 0.7;
            }

        }
    }
</style>