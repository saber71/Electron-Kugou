import Mock from 'mockjs'
import {
    FETCH_KU_MONEY,
    LOGIN,
    MSG_LOGIN,
    REGISTER,
    UPLOAD_AVATAR,
    USER_DATA,
    USER_DATA_SAVE,
    VERIFICATION_PHONE
} from "@/js/url";
import {
    getUrlParam,
    ranBoolean,
    ranCity,
    ranDataImage,
    ranInteger,
    ranParagraph,
    ranProvince,
    ranWord
} from "@/js/mock-random";
import {objNoVal, formatDate} from "@/js/util";
import {maxAccount, minAccount} from "@/js/_const";

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

m(LOGIN, 'post', () => {
    return mayFalse()
})
m(MSG_LOGIN, 'post', () => {
    return mayFalse()
})
regm(VERIFICATION_PHONE + '?', 'get', (option) => {
    const {phone} = getUrlParam(option.url)
    return !objNoVal(store.state.loginHistory.find((obj) => {
        return obj.account == phone
    }))
})
m(REGISTER, 'post', () => {
    return true
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