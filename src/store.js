import Vue from 'vue'
import Vuex from 'vuex'
import {getLocalStorageItem} from "@/js/util";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        defaultList: [],
        otherSourceList: [],
        recentMusicList: [],
        recentMVList: [],
        customList: [],
        // mainLeftY: 0,
        // mainLeftHeight: 0,
    },
    mutations: {
        initList(state) {
            state.defaultList = getLocalStorageItem("默认列表", [])
            state.otherSourceList = getLocalStorageItem("第三方歌曲", [])
            state.recentMusicList = getLocalStorageItem("最近播放", [])
            state.recentMVList = getLocalStorageItem("最近播放视频", [])
            state.customList = getLocalStorageItem("自定义列表", [])
        },
        saveList(state) {
            localStorage.setItem("默认列表", state.defaultList)
            localStorage.setItem("第三方歌曲", state.otherSourceList)
            localStorage.setItem("最近播放", state.recentMusicList)
            localStorage.setItem("最近播放视频", state.recentMVList)
            localStorage.setItem("自定义列表", state.customList)
        },
        // setMainLeft(state, rect) {
        //     state.mainLeftY = rect.y;
        //     state.mainLeftHeight = rect.height;
        // }
    },
    actions: {}
})
