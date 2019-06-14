export function getWindow() {
    return require('electron').remote.getCurrentWindow()
}

export function getLocalStorageItem(key, defaultValue) {
    const val = localStorage.getItem(key)
    if (val) {
        if (typeof defaultValue === "object") {
            return JSON.parse(val)
        } else {
            return val
        }
    } else
        return defaultValue
}

//获取歌曲的播放次数
export function getPlayTimes(music) {
    return getLocalStorageItem(musicKey(music), 0)
}

//存储歌曲的播放次数
export function setPlayTimes(music) {
    localStorage.setItem(musicKey(music), getPlayTimes(music) + 1)
}

//获取歌曲的key
function musicKey(music) {
    return music.name + ' - ' + music.singer
}