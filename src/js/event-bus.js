import Vue from 'vue'

const vue = new Vue()

window.eventBus = vue

export const LOADING = 'loading'
export const SUCCESS = 'success'
export const FAIL = 'fail'
export const ADD_TO_PLAY_LIST = 'addToPlayList'
export const PUSH_TO_PLAY_LIST = 'pushToPlayList'
export const SET_PLAY_LIST = 'setPlayList'
export const INPUT = 'input'
export const CLEAR_MUSIC = 'clearMusic'
export const LOVE_ALL_MUSIC = 'loveAllMusic'
export const SORT_ORDER_BY = 'sortOrderBy'
export const LATER_PLAY = 'later-play'
export const PARENT_PUSH_TO_PLAY_LIST = 'parent-push-to-play-list'
export const PARENT_ADD_ALL_TO_LIST = 'parent-add-all-to-list'
export const PARENT_ADD_TO_LIST = 'parent-add-to-list'