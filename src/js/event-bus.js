import Vue from 'vue'

const vue = new Vue()

window.eventBus = vue

export const USER_DATA_CHANGE = 'user-data-change'
export const VISIBLE_POPUP = 'visible-popup'
export const LOADING = 'loading'
export const SUCCESS = 'success'
export const FAIL = 'fail'
export const ADD_TO_PLAY_LIST = 'addToPlayList'
export const SET_PLAY_LIST = 'setPlayList'