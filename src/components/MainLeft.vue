<template>
    <div id="main-left">
        <section class="banner">
            <div :class="[activeBanner===0?'music-active':'music']" @click="activeBanner=0" title="本地列表"></div>
            <div :class="[activeBanner===1?'cloud-active':'cloud']" @click="activeBanner=1" title="网络收藏"></div>
            <div :class="[activeBanner===2?'radio-active':'radio']" @click="activeBanner=2" title="音乐电台"></div>
        </section>
        <div class="arrow" :style="{left:arrowLeft}"></div>
        <section class="content" @scroll="onScroll" ref="content">
            <div class="item1" :style="{left:itemLeft(0,activeBanner)}">
                <local-list></local-list>
            </div>
            <div class="item2" :style="{left:itemLeft(1,activeBanner)}">
                <net-list></net-list>
            </div>
            <div class="item3" :style="{left:itemLeft(2,activeBanner)}">
                <music-radio></music-radio>
            </div>
        </section>
    </div>
</template>

<script>
    import LocalList from "@/components/main-left/LocalList";
    import {MAIN_LEFT_ON_SCROLL} from "@/js/event-bus";
    import NetList from "@/components/main-left/NetList";
    import MusicRadio from "@/components/main-left/MusicRadio";

    export default {
        name: "MainLeft",
        components: {MusicRadio, NetList, LocalList},
        props: {},
        data() {
            return {
                activeBanner: 0,
            }
        },
        watch: {
            activeBanner(newVal) {
                if ((newVal === 1 || newVal === 2) && !store.state.onlineUser) {
                    store.commit('visibleLogin', true)
                }
            }
        },
        computed: {
            arrowLeft() {
                switch (this.activeBanner) {
                    case 0:
                        return '60px';
                    case 1:
                        return "147px";
                    case 2:
                        return '237px';
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