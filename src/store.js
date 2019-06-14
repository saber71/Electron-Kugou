import Vue from 'vue'
import Vuex from 'vuex'
import {getLocalStorageItem} from "@/js/util";
import {ranBoolean, ranDataImage, ranInteger, ranName, ranTitle, ranWord} from "@/js/mock-random";
import {
    autoLoginKey,
    customListKey,
    defaultListKey, inlineUserKey, loginHistoryKey,
    maxPassword,
    minPassword,
    otherSourceListKey,
    recentMusicListKey,
    recentMVListKey, rememberPasswordKey
} from "@/js/_const";

Vue.use(Vuex);

const defaultList = [];
for (let i = 0; i < 20; i++) {
    defaultList.push({
        name: ranTitle(1, 3),
        singer: ranName(),
        duration: ranInteger(30, 240),
        mv: ranBoolean(),
        img: ranDataImage('50x50'),
        source: ranBoolean() ? '本地资源' : '网络资源',
        type: 'MP3',
        times: ranInteger(0, 300),
        quality: ranBoolean() ? '高品' : '标准',
        size: (ranInteger(10, 100) / 10) + 'M'
    })
}

const loginHistory = [];
for (let i = 0; i < 20; i++) {
    loginHistory.push({
        account: ranBoolean() ? ranName() : ranInteger(10000000000, 20000000000),
        password: ranWord(minPassword, maxPassword),
        byMessage: ranBoolean()
    })
}

export default new Vuex.Store({
    state: {
        defaultList: getLocalStorageItem(defaultListKey, defaultList),
        otherSourceList: getLocalStorageItem(otherSourceListKey, defaultList),
        recentMusicList: getLocalStorageItem(recentMusicListKey, defaultList),
        recentMVList: getLocalStorageItem(recentMVListKey, []),
        customList: getLocalStorageItem(customListKey, []),
        loginHistory: getLocalStorageItem(loginHistoryKey, loginHistory),
        inlineUser: getLocalStorageItem(inlineUserKey, {}),
        rememberPassword: getLocalStorageItem(rememberPasswordKey, false),
        autoLogin: getLocalStorageItem(autoLoginKey, false),

        mainLeftY: 0,
        mainLeftHeight: 0,
        visibleLogin: false,
        visibleRegister: false,
    },
    mutations: {
        setMainLeft(state, rect) {
            state.mainLeftY = rect.y;
            state.mainLeftHeight = rect.height;
        },
        visibleLogin(state) {
            state.visibleLogin = !state.visibleLogin
        },
        visibleRegister(state) {
            state.visibleRegister = !state.visibleRegister
        },
        defaultListPush(state, val) {
            state.defaultList.push(val)
            localStorage.setItem(defaultListKey, state.defaultList)
        },
        autoLogin(state, val) {
            state.autoLogin = val
            localStorage.setItem(autoLoginKey, val)
        },
        rememberPassword(state, val) {
            state.rememberPassword = val
            localStorage.setItem(rememberPasswordKey, val)
        },
        inlineUser(state, val) {
            state.inlineUser = val
            localStorage.setItem(inlineUserKey, val)
        },
        loginHistoryPush(state, val) {
            let i = 0;
            for (; i < state.loginHistory.length; i++) {
                const obj = state.loginHistory[i]
                if (obj.account === val.account) {
                    state.loginHistory[i] = val
                    break
                }
            }
            if (i >= state.loginHistory.length) {
                state.loginHistory.push(val)
            }
            localStorage.setItem(loginHistoryKey, state.loginHistory)
        }
    },
    actions: {}
})
