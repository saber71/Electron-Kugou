import Vue from 'vue'

const vue = new Vue()

window.eventBus = vue

export const USER_DATA_CHANGE = 'user-data-change'
export const VISIBLE_POPUP = 'visible-popup'