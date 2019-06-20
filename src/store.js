import Vue from 'vue'
import Vuex from 'vuex'
import {getLocalStorageItem, objNoVal, setLocalStorageItem} from "@/js/util";
import {ranBoolean, ranDataImage, ranInteger, ranName, ranTitle, ranWord} from "@/js/mock-random";
import {
    autoLoginKey,
    customListKey,
    defaultListKey, onlineUserKey, loginHistoryKey,
    maxPassword,
    minPassword,
    otherSourceListKey,
    recentMusicListKey,
    recentMVListKey, rememberPasswordKey, HOME_COMMON_BG, MAIN_RIGHT_ACTIVE_DEFAULT, minAccount, maxAccount
} from "@/js/_const";
import {USER_DATA_CHANGE} from "@/js/event-bus";
import {generatePhone} from "@/js/reg";

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
        account: ranBoolean() ? ranWord(minAccount, maxAccount) : generatePhone(),
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
        userData: undefined,

        homeBg: HOME_COMMON_BG,
        mainBg: 'white',
        mainLeftY: 0,
        mainLeftHeight: 0,
        visibleLogin: false,
        visibleRegister: false,
        mainRightActive: MAIN_RIGHT_ACTIVE_DEFAULT,
        mainRightActiveHistory: [MAIN_RIGHT_ACTIVE_DEFAULT]
    },
    mutations: {
        /**
         * 回退
         * @param st
         */
        goBack(st) {
            if (st.mainRightActiveHistory.length > 0) {
                st.mainRightActive = st.mainRightActiveHistory.pop()
            }
        },
        /**
         * 设置MainRightActive，添加MainRightActive历史记录
         * @param st
         * @param val
         */
        mainRightActive(st, val) {
            st.mainRightActive = val
            st.mainRightActiveHistory.push(val)
        },
        /**
         * 从MainRightActive的历史记录中取出最新的记录
         * @param st
         */
        mainRightActiveBack(st) {
            st.mainRightActive = st.mainRightActiveHistory.pop()
        },
        setMainLeft(state, rect) {
            state.mainLeftY = rect.y;
            state.mainLeftHeight = rect.height;
        },
        visibleLogin(state, val) {
            if (objNoVal(val)) {
                val = !state.visibleLogin
            }
            state.visibleLogin = val
        },
        visibleRegister(state, val) {
            if (objNoVal(val)) {
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
        },
        userData(state, val) {
            state.userData = val
            eventBus.$emit(USER_DATA_CHANGE, val)
        },
        mainBg(state, val) {
            if (objNoVal(val)) {
                val = 'white'
            }
            state.mainBg = val
        },
        homeBg(st, val) {
            if (objNoVal(val)) {
                val = HOME_COMMON_BG
            }
            st.homeBg = val
        },
    },
    actions: {}
})
