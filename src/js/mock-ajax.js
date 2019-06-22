import Mock from 'mockjs'
import {
    FETCH_KU_MONEY,
    LOGIN,
    MSG_LOGIN,
    REGISTER,
    UPLOAD_AVATAR,
    USER_DATA,
    USER_DATA_SAVE,
    PHONE_VALIDATOR, EMAIL_VALIDATOR, MUSIC_SPACE_DATA
} from "@/js/url";
import {
    ranBoolean,
    ranCity, ranCTitle,
    ranDataImage, ranEmail,
    ranInteger,
    ranParagraph,
    ranProvince,
    ranWord
} from "@/js/mock-random";
import {formatDate} from "@/js/util";
import {generateMusicSpaceData, maxAccount, maxPassword, minAccount, minPassword} from "@/js/_const";
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
    const isVip = ranBoolean()
    let vipStatus = '0'
    const date = new Date()
    if (isVip) {
        vipStatus = date.getUTCFullYear() + '-' + (ranBoolean() ? date.getMonth() + 2 : date.getMonth()) + '-' + date.getDate()
    }
    return {
        id: ranInteger(0, Number.MAX_SAFE_INTEGER),
        name: ranWord(minAccount, maxAccount),
        password: ranBoolean() ? '' : ranWord(minPassword, maxPassword),
        phone: ranBoolean() ? undefined : generatePhone(),
        securityQuestion: ranBoolean() ? ranCTitle(7, 9) : undefined,
        answer: ranCTitle(1, 10),
        email: ranBoolean() ? ranEmail() : undefined,
        avatar: ranDataImage('25x25'),
        type: isVip ? 1 : 0,
        score: ranInteger(0, 20000),
        vipStatus,
        birthday: formatDate(new Date()),
        sex: ranInteger(0, 1),
        opinion: ranParagraph(1, 3),
        province: ranProvince(),
        city: ranCity()
    }
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