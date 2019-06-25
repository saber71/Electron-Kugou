import {ranBoolean, ranInteger, ranWord} from "@/js/mock-random";

export function remove(array, index) {
    array.splice(index, 1)
}

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
        if (type === "object" || type === 'boolean' || type === 'number' || defaultValue === undefined || defaultValue === null) {
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
    // alert((y + height) + '   ' + bottom)
    return y + height > bottom
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

/**
 * 判断所有的字符串参数都为空
 * @returns {boolean}   true，都为空
 */
export function allStrNoVal() {
    for (let i = 0; i < arguments.length; i++) {
        const str = arguments[i]
        if (objNoVal(str) || str === '' || str === 'undefined' || str === 'null') {
        } else {
            return false
        }
    }
    return true
}

//有一个参数为null或undefined
export function objNoVal() {
    for (let i = 0; i < arguments.length; i++) {
        const obj = arguments[i]
        if (obj === null || obj === undefined)
            return true
    }
    return false
}

/**
 *有一个参数为null或undefined或false
 * @returns {boolean}
 */
export function boolNoVal() {
    for (let i = 0; i < arguments.length; i++) {
        const obj = arguments[i]
        if (objNoVal(obj) || obj === false)
            return true
    }
    return false
}

//获取歌曲的key
function musicKey(music) {
    return music.name + ' - ' + music.singer
}

/**
 * 字节数组转换为base64字符串
 * @param buffer
 * @returns {string}
 */
function bytesToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

/**
 * 打开对话框选择音乐文件
 * @param callback
 * @param multiSelections
 */
export function toSelectMusicFiles(callback, multiSelections) {
    openDialogToSelect('openFile', [
        {name: '音乐', extensions: ['mp3', 'flac']},
        {name: '所有文件', extensions: ['*']}
    ], multiSelections, callback)
}

/**
 * 打开对话框选择图片文件
 * @param callback
 * @param multiSelections
 */
export function toSelectImageFiles(multiSelections, callback) {
    openDialogToSelect('openFile', [
        {name: '图片', extensions: ['jpg', 'jpeg', 'png']},
        {name: '所有文件', extensions: ['*']}
    ], multiSelections, callback)
}

/**
 * 打开对话框选择文件夹
 * @param callback
 * @param multiSelections
 */
export function toSelectDirectory(multiSelections, callback) {
    openDialogToSelect('openDirectory', undefined, multiSelections, callback)
}

/**
 * 调用electron的对话框选择文件/夹，支持多选
 * @param openTarget
 * @param filters
 * @param callback
 * @param multiSelections
 */
function openDialogToSelect(openTarget, filters, multiSelections, callback) {
    const {dialog} = require('electron').remote
    dialog.showOpenDialog({
        properties: [openTarget, multiSelections ? 'multiSelections' : ''],
        filters
    }, callback)
}

/**
 * 获得文件后缀名
 * @param path
 * @returns {string}
 */
export function getSuffix(path) {
    return path.substring(path.lastIndexOf('.') + 1).toLowerCase()
}

/**
 * 将图片数据转为base64编码
 * @param imgEl
 * @returns {string}
 */
export function imageToBase64(imgEl) {
    const canvas = document.createElement("canvas");
    canvas.width = imgEl.width;
    canvas.height = imgEl.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);
    const ext = getSuffix(imgEl.src)
    return canvas.toDataURL("image/" + ext);
}

/**
 * 截取图片
 * @param imgEl
 * @param imgType
 * @param bound {x,y,width,height}
 * @returns {string}    base64编码的图片数据
 */
export function clipImg(imgEl, imgType, bound) {
    const canvas = document.createElement("canvas");
    canvas.width = bound.width;
    canvas.height = bound.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imgEl, bound.x, bound.y, bound.width, bound.height)
    return canvas.toDataURL("image/" + imgType);
}

/**
 * 以base64格式异步读取文件
 * @param path
 * @param callback
 */
export function readAsBase64(path, callback) {
    const fs = require('fs')
    fs.readFile(path, {flag: 'r+', encoding: 'base64'}, (err, data) => {
        if (err)
            alert("读取图片失败")
        else {
            const ext = getSuffix(path)
            data = 'data:image/' + ext + ';base64,' + data
            callback(data)
        }
    })
}

/**
 * 生成验证码
 * @returns {string|string}
 */
export function generateCode() {
    let res = ''
    for (let i = 0; i < 5; i++) {
        if (ranBoolean()) {
            res += ranInteger(0, 9)
        } else {
            res += ranWord(1, 1)
        }
    }
    return res
}