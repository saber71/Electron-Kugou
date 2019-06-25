import Vue from 'vue'

const vue = new Vue()

window.eventBus = vue

export const LOADING = 'loading'
export const SUCCESS = 'success'
export const FAIL = 'fail'
export const ADD_TO_PLAY_LIST = 'addToPlayList'
export const SET_PLAY_LIST = 'setPlayList'
export const INPUT = 'input'