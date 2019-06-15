import Vue from 'vue'
import Vuex from 'vuex'
import {getLocalStorageItem, setLocalStorageItem} from "@/js/util";
import {ranBoolean, ranDataImage, ranInteger, ranName, ranSentence, ranTitle, ranWord} from "@/js/mock-random";
import {
    autoLoginKey,
    customListKey,
    defaultListKey, onlineUserKey, loginHistoryKey,
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
        account: ranBoolean() ? ranWord(6, 20) : ranInteger(10000000000, 20000000000),
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
        onlineUser: getLocalStorageItem(onlineUserKey, undefined),
        rememberPassword: getLocalStorageItem(rememberPasswordKey, false),
        autoLogin: getLocalStorageItem(autoLoginKey, false),

        mainLeftY: 0,
        mainLeftHeight: 0,
        visibleLogin: false,
        visibleRegister: false,
        verificationCode: -21321321
    },
    mutations: {
        verificationCode(state, val) {
            state.verificationCode = val
        },
        setMainLeft(state, rect) {
            state.mainLeftY = rect.y;
            state.mainLeftHeight = rect.height;
        },
        visibleLogin(state, val) {
            if (val === undefined || val === null) {
                val = !state.visibleLogin
            }
            state.visibleLogin = val
        },
        visibleRegister(state, val) {
            if (val === undefined || val === null) {
                val = !state.visibleRegister
            }
            state.visibleRegister = val
        },
        defaultListPush(state, val) {
            state.defaultList.push(val)
            setLocalStorageItem(defaultListKey, state.defaultList)
        },
        autoLogin(state, val) {
            state.autoLogin = val
            setLocalStorageItem(autoLoginKey, val)
        },
        rememberPassword(state, val) {
            state.rememberPassword = val
            setLocalStorageItem(rememberPasswordKey, val)
        },
        onlineUser(state, val) {
            state.onlineUser = val
            setLocalStorageItem(onlineUserKey, val)
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
            setLocalStorageItem(loginHistoryKey, state.loginHistory)
        }
    },
    actions: {}
})
