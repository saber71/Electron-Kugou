export function getWindow() {
    return require('electron').remote.getCurrentWindow()
}

export function getLocalStorageItem(key, defaultValue) {
    const val = localStorage.getItem(key)
    return val ? val : defaultValue
}