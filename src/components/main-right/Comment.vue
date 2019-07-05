<template>
    <div id="Comment">
        <section class="input">
            <textarea v-model="commentInput" :cols="4" maxlength="140"></textarea>
            <div class="bottom">
                <span>剩余{{surplusWordNumber}}字</span>
                <button :class="{'disabled':commentInput.length===0}">发表评论</button>
            </div>
        </section>
        <p class="banner">最新评论（{{comments.length}}）</p>
        <div class="item" v-for="v in comment">
            <div class="left">
                <img :src="v.img">
            </div>
            <div class="right">
                <div class="top">
                    <span class="author">{{v.author}}</span>：<span class="content">{{v.content}}</span>
                </div>
                <div class="center" v-if="v.reply">
                    <span class="author">@{{v.reply}}</span>：<span class="content">{{v.replyContent}}</span>
                </div>
                <div class="bottom">
                    <label class="datetime">{{v.datetime}}</label>
                    <div class="opt">
                        <img src="../../assets/good.png" @click="v.goodNumber++">({{v.goodNumber}})
                    </div>
                </div>
            </div>
        </div>
        <div class="pager">
            <img class="prev" src="../../assets/arrow-down-dark.png" @click="prev" :class="{disabled:currentPage===1}">
            <label>{{currentPage}} / {{totalPage}}</label>
            <img class="next" src="../../assets/arrow-down-dark.png" @click="next" :class="{disabled:currentPage===totalPage}">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Comments",
        props: {
            comments: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                commentInput: '',
                currentPage: 1,
                size: 10,
            }
        },
        watch: {},
        computed: {
            surplusWordNumber() {
                return 140 - this.commentInput.length
            },
            comment() {
                return this.comments.slice((this.currentPage - 1) * this.size, this.currentPage * this.size)
            },
            totalPage() {
                let res = parseInt(this.comments.length / this.size)
                if (this.comments.length % this.size > 0) {
                    res++
                }
                return res
            }
        },
        methods: {
            prev() {
                if (this.currentPage === 1) {
                    return
                }
                this.currentPage--
            },
            next() {
                if (this.currentPage === this.totalPage) {
                    return
                }
                this.currentPage++
            }
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
    @import "../../style/main-right/comments";
</style>