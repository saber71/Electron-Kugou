import Mock from 'mockjs'
import {
    FETCH_KU_MONEY,
    LOGIN,
    MSG_LOGIN,
    REGISTER,
    UPLOAD_AVATAR,
    USER_DATA,
    USER_DATA_SAVE,
    PHONE_VALIDATOR,
    EMAIL_VALIDATOR,
    MUSIC_SPACE_DATA,
    MUSIC_SPACE_SECURITY,
    FRIENDS,
    FOCUS_USER,
    FANS,
    SPACE_VISITORS,
    SET_FOCUS, REMOVE_VISIT_RECORD
} from "@/js/url";
import {
    ranBoolean,
    ranCity, ranCTitle,
    ranDataImage, ranDate, ranEmail,
    ranInteger,
    ranParagraph,
    ranProvince,
    ranWord
} from "@/js/mock-random";
import {formatDate} from "@/js/util";
import {
    generateMultiUserBriefData,
    generateMusicSpaceData,
    generateUserData,
    maxAccount,
    maxPassword,
    minAccount,
    minPassword
} from "@/js/_const";
import {generatePhone} from "@/js/reg";

Mock.setup({
    timeout: '500-1500'
})

const mock = Mock.mock;

function m(url, method, action) {
    mock(baseUrl + url, method, action)
}

function regm(url, method, action) {
    mock(new RegExp('^' + baseUrl + url), method, action)
}

/**
 * 25%的概率返回false
 */
function mayFalse() {
    return ranBoolean(false, 1, 3)
}

/**
 * 25%的概率返回true
 */
function mayTrue() {
    return ranBoolean(true, 1, 3)
}

m(LOGIN, 'post', () => {
    return mayFalse()
})
m(MSG_LOGIN, 'post', () => {
    return mayFalse()
})
regm(PHONE_VALIDATOR + '?', 'get', () => {
    return mayTrue()
})
regm(EMAIL_VALIDATOR + '?', 'get', () => {
    return mayTrue()
})
m(REGISTER, 'post', () => {
    return mayFalse()
})
m(USER_DATA, 'get', () => {
    return generateUserData()
})
m(FETCH_KU_MONEY, 'get', () => {
    return ranInteger(0, 1000)
})
m(USER_DATA_SAVE, 'post', () => {
    return mayFalse()
})
m(UPLOAD_AVATAR, 'post', () => {
    return mayFalse()
})
regm(MUSIC_SPACE_DATA, 'get', () => {
    return generateMusicSpaceData()
})
m(MUSIC_SPACE_SECURITY, 'post', () => {
    return mayFalse()
})
regm(MUSIC_SPACE_SECURITY, 'get', () => {
    return ranInteger(0, 2)
})
regm(FRIENDS, 'get', () => {
    return generateMultiUserBriefData()
})
regm(FOCUS_USER, 'get', () => {
    return generateMultiUserBriefData()
})
regm(FANS, 'get', () => {
    return generateMultiUserBriefData()
})
regm(SPACE_VISITORS, 'get', () => {
    const res = generateMultiUserBriefData()
    res.forEach(value => value.date = ranDate())
    return res
})
m(SET_FOCUS, 'post', () => {
    return mayFalse()
})
m(REMOVE_VISIT_RECORD, 'post', () => {
    return mayFalse()
})