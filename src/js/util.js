export function getWindow() {
    return require('electron').remote.getCurrentWindow()
}

export function formatDate(date) {
    const year = date.getUTCFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + '-' + (month >= 10 ? month : '0' + month) + "-" + (day >= 10 ? day : '0' + day)
}

/**
 * 当前是否已超过指定日期
 * @param date  日期字符串，分隔符‘-’
 */
export function overDate(date) {
    const now = new Date()
    const vals = date.split('-')
    const yearBias = now.getUTCFullYear() - parseInt(vals[0])
    const monthBias = now.getMonth() + 1 - parseInt(vals[1])
    const dayBias = now.getDate() - parseInt(vals[2])
    if (yearBias > 0) {
        return true
    } else if (yearBias < 0) {
        return false
    } else {
        if (monthBias > 0) {
            return true
        } else if (monthBias < 0) {
            return false
        } else {
            return dayBias > 0
        }
    }
}

//根据Key获取LocalStorage中存储的数据
export function getLocalStorageItem(key, defaultValue) {
    const val = localStorage.getItem(key)
    if (!strNoVal(val)) {
        const type = typeof defaultValue
        if (type === "object" || defaultValue === undefined || defaultValue === null) {
            return JSON.parse(val)
        } else {
            return val
        }
    } else
        return defaultValue
}

//往LocalStorage中存储数据
export function setLocalStorageItem(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
}

//获取歌曲的播放次数
export function getPlayTimes(music) {
    return getLocalStorageItem(musicKey(music), 0)
}

//存储歌曲的播放次数
export function setPlayTimes(music) {
    localStorage.setItem(musicKey(music), getPlayTimes(music) + 1)
}

//判断组件是否触及了main-left的底部
export function isReachMainLeftBottom(y, height) {
    const bottom = store.state.mainLeftY + store.state.mainLeftHeight
    // alert(y + " " + height + '  ' + bottom)
    return y + height >= bottom
}

//有一个参数为null或undefined或空字符串
export function strNoVal() {
    for (let i = 0; i < arguments.length; i++) {
        const str = arguments[i]
        if (objNoVal(str) || str === '' || str === 'undefined' || str === 'null') {
            return true
        }
    }
    return false
}

//有一个参数为null或undefined
export function objNoVal(obj) {
    if (arguments.length === 1)
        return obj === null || obj === undefined
    else {
        for (let i = 0; i < arguments.length; i++) {
            const obj = arguments[i]
            if (obj === null || obj === undefined)
                return true
        }
        return false
    }
}

//获取歌曲的key
function musicKey(music) {
    return music.name + ' - ' + music.singer
}