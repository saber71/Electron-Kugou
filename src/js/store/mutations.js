import {getPlayTimes, objNoVal, setLocalStorageItem} from "@/js/util";
import {
    autoLoginKey,
    emptyMusicList,
    HOME_COMMON_BG,
    localListKey,
    loginHistoryKey,
    onlineUserKey,
    ORDER_BY_NAME,
    ORDER_BY_RANDOM,
    ORDER_BY_SINGER,
    ORDER_BY_TIME,
    ORDER_BY_TIMES,
    rememberPasswordKey
} from "@/js/_const";
import Vue from 'vue'
import {
    ADD_ALL_TO_MUSIC_LIST,
    CREATE_MUSIC_LIST,
    GO_BACK,
    REMOVE_MUSIC_IN_LIST,
    REMOVE_MUSIC_LIST,
    RENAME_MUSIC_LIST,
    SAVE_LOCAL_MUSIC_LIST,
    SET_HOME_BG,
    SET_MAIN_BG,
    SET_MUSIC_LIST_ORDER_BY
} from "@/js/store/mutations_name";
import {ranBoolean} from "@/js/mock-random";

function getMusicList(name, local) {
    let list = store.state.localMusicList[name]
    if (!local) {
        list = store.state.netMusicList[name]
    }
    return list
}

export default {
    /**
     * 音乐列表重命名
     * @param s
     * @param obj{
     *    local   boolean 【true：本地列表，false：网络列表】
     *     oldName  string  原本的名字
     *     newName  string  新的名字
     * }
     */
    [RENAME_MUSIC_LIST](s, obj) {
        let list
        if (obj.local) {
            list = s.localMusicList
        } else {
            list = s.netMusicList
        }
        const l = list[obj.oldName]
        l.name = obj.newName
        list[obj.oldName] = null
        list[obj.newName] = l
        if (obj.local) {
            store.commit(SAVE_LOCAL_MUSIC_LIST)
        }
    },
    /**
     *将数组中的music加入指定的列表
     * @param s
     * @param obj{
     *     name string  列表名字
     *    local   boolean 【true：本地列表，false：网络列表】
     *    musics    array   music数组
     * }
     */
    [ADD_ALL_TO_MUSIC_LIST](s, obj) {
        const list = getMusicList(obj.name, obj.local)
        const arr = obj.musics
        for (let i = 0; i < arr.length; i++) {
            list.music.push(arr[i])
        }
        if (obj.local) {
            store.commit(SAVE_LOCAL_MUSIC_LIST)
        }
    },
    /**
     * 设置一个音乐列表的排序依据
     * @param st
     * @param obj   {
     *     name string  音乐列表名字
     *     orderBy  number  排序编号
     *     local    boolean 【true：本地音乐列表，false：网络音乐列表】
     * }
     */
    [SET_MUSIC_LIST_ORDER_BY](st, obj) {
        const orderBy = obj.orderBy
        let list = getMusicList(obj.name, obj.local)
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
                    return (a.name.localeCompare(b.name)) * direction
                }
                break
            case ORDER_BY_SINGER:
                func = (a, b) => {
                    return (a.singer.localeCompare(b.singer)) * direction
                }
                break
            case ORDER_BY_TIME:
                func = (a, b) => {
                    return (a.time.localeCompare(b.time)) * direction
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
        if (obj.local) {
            store.commit(SAVE_LOCAL_MUSIC_LIST)
        }
    },
    /**
     * 删除一个音乐列表
     * @param st
     * @param obj {
     *     name string  音乐列表名字
     *     local    boolean 【true：本地音乐列表，false：网络音乐列表】
     * }
     */
    [REMOVE_MUSIC_LIST](st, obj) {
        Vue.delete(obj.local ? st.localMusicList : st.netMusicList, obj.name)
        if (obj.local) {
            store.commit(SAVE_LOCAL_MUSIC_LIST)
        }
    },
    /**
     * 创建新的音乐列表
     * @param st
     * @param obj {
     *     name string  音乐列表名字
     *     local    boolean 【true：本地音乐列表，false：网络音乐列表】
     * }
     */
    [CREATE_MUSIC_LIST](st, obj) {
        Vue.set(obj.local ? st.localMusicList : st.netMusicList, obj.name, emptyMusicList(obj.name))
        if (obj.local) {
            store.commit(SAVE_LOCAL_MUSIC_LIST)
        }
    },
    /**
     * 删除音乐列表中的指定歌曲
     * @param st
     * @param obj   {
     *     name     string  列表名字
     *     index    number  歌曲序号
     *     count    number  删除的数目
     *     local    boolean 【true：本地音乐列表，false：网络音乐列表】
     * }
     */
    [REMOVE_MUSIC_IN_LIST](st, obj) {
        const list = (obj.local ? st.localMusicList : st.netMusicList)[obj.name].musics
        list.splice(obj.index, obj.count)
        if (obj.local) {
            store.commit(SAVE_LOCAL_MUSIC_LIST)
        }
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
        st.netMusicList = {}
        const fun = function (list) {
            for (let i = 0; i < list.length; i++) {
                Vue.set(st.netMusicList, list[i].name, list[i])
                // st.netMusicList[list[i].name] = list[i]
            }
        }
        fun(val.customMusicList)
        fun(val.favoriteMusicList)
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