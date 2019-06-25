import {getPlayTimes, objNoVal, setLocalStorageItem} from "@/js/util";
import {
    autoLoginKey, emptyMusicList,
    HOME_COMMON_BG,
    localListKey,
    loginHistoryKey,
    onlineUserKey, ORDER_BY_NAME, ORDER_BY_RANDOM, ORDER_BY_SINGER, ORDER_BY_TIME, ORDER_BY_TIMES,
    rememberPasswordKey
} from "@/js/_const";
import Vue from 'vue'
import {
    CREATE_LOCAL_LIST,
    GO_BACK,
    SET_HOME_BG,
    SET_MAIN_BG,
    REMOVE_MUSIC_IN_LOCAL_LIST,
    SAVE_LOCAL_MUSIC_LIST, REMOVE_LOCAL_LIST, SET_LOCAL_LIST_ORDER_BY
} from "@/js/store/mutations_name";
import {ranBoolean} from "@/js/mock-random";

export default {
    /**
     * 设置一个本地列表的排序依据
     * @param st
     * @param obj   {
     *     name string  本地列表名字
     *     orderBy  number  排序编号
     * }
     */
    [SET_LOCAL_LIST_ORDER_BY](st, obj) {
        const orderBy = obj.orderBy
        const list = st.localMusicList[obj.name]
        let direction = list.direction
        if (list.orderBy === orderBy) {
            direction *= -1
        } else {
            list.orderBy = orderBy
            direction = 1
        }
        let func = undefined
        switch (orderBy) {
            case ORDER_BY_NAME:
                func = (a, b) => {
                    return (a.name - b.name) * direction
                }
                break
            case ORDER_BY_SINGER:
                func = (a, b) => {
                    return (a.singer - b.singer) * direction
                }
                break
            case ORDER_BY_TIME:
                func = (a, b) => {
                    return (a.time - b.time) * direction
                }
                break
            case ORDER_BY_TIMES:
                func = (a, b) => {
                    return (getPlayTimes(a.name) - getPlayTimes(b.name)) * direction
                }
                break
            case ORDER_BY_RANDOM:
                func = () => {
                    return ranBoolean() ? 1 : -1
                }
                break
        }
        list.musics.sort(func)
    },
    /**
     * 删除一个本地列表
     * @param st
     * @param name
     */
    [REMOVE_LOCAL_LIST](st, name) {
        Vue.delete(st.localMusicList, name)
    },
    /**
     * 创建新的本地列表
     * @param st
     * @param name  新列表的名字
     */
    [CREATE_LOCAL_LIST](st, name) {
        Vue.set(st.localMusicList, name, emptyMusicList(name))
    },
    /**
     * 删除本地列表中的指定歌曲
     * @param st
     * @param obj   {
     *     name     string  列表名字
     *     index    number  歌曲序号
     *     count    number  删除的数目
     * }
     */
    [REMOVE_MUSIC_IN_LOCAL_LIST](st, obj) {
        const list = st.localMusicList[obj.name].musics
        list.splice(obj.index, obj.count)
    },
    /**
     * 保存本地音乐列表
     * @param st
     */
    [SAVE_LOCAL_MUSIC_LIST](st) {
        setLocalStorageItem(localListKey, st.localMusicList)
    },
    /**
     * 设置要进入的社交界面的类型
     * @param st
     * @param val   【0：好友，1：关注，2：粉丝，3：访客】
     */
    socialContactType(st, val) {
        st.socialContactType = val
    },
    /**
     * 设置准备浏览的音乐空间的用户账号
     * @param st
     * @param val   用户的account
     */
    musicSpaceUser(st, val) {
        st.musicSpaceUser = val
    },
    /**
     * 回退
     * @param st
     */
    [GO_BACK](st) {
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
        st.mainRightActiveHistory.push(st.mainRightActive)
        st.mainRightActive = val
    },
    /**
     * 从MainRightActive的历史记录中取出最新的记录
     * @param st
     */
    mainRightActiveBack(st) {
        st.mainRightActive = st.mainRightActiveHistory.pop()
    },
    /**
     * 设置MainLeft的节点信息
     * @param state
     * @param rect
     */
    setMainLeft(state, rect) {
        state.mainLeftY = rect.y;
        state.mainLeftHeight = rect.height;
    },
    /**
     * 设置当前用户的音乐空间数据
     * @param st
     * @param val
     */
    myMusicSpaceData(st, val) {
        st.myMusicSpaceData = val
    },
    /**
     * 设置是否显示登陆页面
     * @param state
     * @param val
     */
    visibleLogin(state, val) {
        if (objNoVal(val)) {
            val = !state.visibleLogin
        }
        state.visibleLogin = val
    },
    /**
     * 设置是否显示注册页面
     * @param state
     * @param val
     */
    visibleRegister(state, val) {
        if (objNoVal(val)) {
            val = !state.visibleRegister
        }
        state.visibleRegister = val
    },
    /**
     * 设置自动登陆
     * @param state
     * @param val
     */
    autoLogin(state, val) {
        state.autoLogin = val
        setLocalStorageItem(autoLoginKey, val)
    },
    /**
     * 设置记住密码
     * @param state
     * @param val
     */
    rememberPassword(state, val) {
        state.rememberPassword = val
        setLocalStorageItem(rememberPasswordKey, val)
    },
    /**
     * 设置当前登陆的用户
     * @param state
     * @param val
     */
    onlineUser(state, val) {
        if (val) {
            state.alreadyLogin = true
        }
        state.onlineUser = val
        setLocalStorageItem(onlineUserKey, val)
    },
    /**
     * 设置用户的登陆历史
     * @param state
     * @param val
     */
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
    /**
     * 当前登陆的用户信息
     * @param state
     * @param val
     */
    userData(state, val) {
        state.userData = val
    },
    /**
     * 设置主界面的背景
     * @param state
     * @param val
     */
    [SET_MAIN_BG](state, val) {
        if (objNoVal(val)) {
            val = 'white'
        }
        state.mainBg = val
    },
    /**
     * 设置Home的背景
     * @param st
     * @param val
     */
    [SET_HOME_BG](st, val) {
        if (objNoVal(val)) {
            val = HOME_COMMON_BG
        }
        st.homeBg = val
    },
}