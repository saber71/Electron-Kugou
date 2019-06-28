import Vue from 'vue'

const vue = new Vue()

window.eventBus = vue

export const LOADING = 'loading'
export const SUCCESS = 'success'
export const FAIL = 'fail'
export const INPUT = 'input'

export const ADD_TO_PLAY_LIST = 'addToPlayList'
export const PUSH_TO_PLAY_LIST = 'pushToPlayList'
export const SET_PLAY_LIST = 'setPlayList'
export const CLEAR_MUSIC = 'clearMusic'
export const LOVE_ALL_MUSIC = 'loveAllMusic'
export const SORT_ORDER_BY = 'sortOrderBy'
export const LATER_PLAY = 'later-play'
export const SET_PLAYING_MUSIC = 'setPlayingMusic'

export const MAIN_LEFT_ON_SCROLL = 'main-left-on-scroll'
export const LIST_ON_EXPAND = 'list-on-expand'

export const PARENT_PUSH_TO_PLAY_LIST = 'parent-push-to-play-list'
export const PARENT_ADD_ALL_TO_LIST = 'parent-add-all-to-list'
export const PARENT_ADD_TO_LIST = 'parent-add-to-list'
export const PARENT_DB_CLICK = 'parent-double-click'