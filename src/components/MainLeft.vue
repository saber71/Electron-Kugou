<template>
    <div id="main-left">
        <section class="banner">
            <div :class="[activeBanner===0?'music-active':'music']" @click="activeBanner=0" title="本地列表"></div>
            <div :class="[activeBanner===1?'cloud-active':'cloud']" @click="activeBanner=1" title="网络收藏"></div>
            <div :class="[activeBanner===2?'radio-active':'radio']" @click="activeBanner=2" title="音乐电台"></div>
            <div :class="[activeBanner===3?'mobile-active':'mobile']" @click="activeBanner=3" title="手机音乐管理"></div>
            <div :class="[activeBanner===4?'download-active':'download']" @click="activeBanner=4" title="本地音乐"></div>
        </section>
        <div class="arrow" :style="{left:arrowLeft}"></div>
        <section class="content" @scroll="onScroll" ref="content">
            <div class="item1" :style="{left:itemLeft(0,activeBanner)}">
                <local-list></local-list>
            </div>
            <div class="item2" :style="{left:itemLeft(1,activeBanner)}">
                <net-list></net-list>
            </div>
            <div class="item3" :style="{left:itemLeft(2,activeBanner)}"></div>
            <div class="item4" :style="{left:itemLeft(3,activeBanner)}"></div>
            <div class="item5" :style="{left:itemLeft(4,activeBanner)}"></div>
        </section>
    </div>
</template>

<script>
    import LocalList from "@/components/main-left/LocalList";
    import {MAIN_LEFT_ON_SCROLL} from "@/js/event-bus";
    import NetList from "@/components/main-left/NetList";

    export default {
        name: "MainLeft",
        components: {NetList, LocalList},
        props: {},
        data() {
            return {
                activeBanner: 0,
            }
        },
        watch: {
            activeBanner(newVal) {
                if (newVal === 1 && !store.state.onlineUser) {
                    store.commit('visibleLogin', true)
                }
            }
        },
        computed: {
            arrowLeft() {
                switch (this.activeBanner) {
                    case 0:
                        return '25px';
                    case 1:
                        return "85px";
                    case 2:
                        return '148px';
                    case 3:
                        return '211px';
                    case 4:
                        return '273px';
                    default:
                        return 0;
                }
            }
        },
        methods: {
            onScroll() {
                eventBus.$emit(MAIN_LEFT_ON_SCROLL)
            },
            itemLeft(index, activeBanner) {
                if (index === activeBanner)
                    return "0";
                else if (index < activeBanner) {
                    return '-100%';
                } else {
                    return '100%';
                }
            }
        },
        mounted() {
            store.commit('setMainLeft', document.getElementById('main-left').getBoundingClientRect())
        },
        created() {
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/main-left";
</style>