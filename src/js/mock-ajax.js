import Mock from 'mockjs'
import {FETCH_KU_MONEY, LOGIN, MSG_LOGIN, REGISTER, USER_DATA, VERIFICATION_PHONE} from "@/js/url";
import {getUrlParam, ranBoolean, ranDataImage, ranInteger, ranTitle, ranWord} from "@/js/mock-random";
import {objNoVal} from "@/js/util";
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

m(LOGIN, 'post', () => {
    return ranBoolean(false, 1, 2)
})
m(MSG_LOGIN, 'post', () => {
    return ranBoolean(false, 1, 2)
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
    if (isVip) {
        const date = new Date()
        vipStatus = date.getUTCFullYear() + '-' + (ranBoolean() ? date.getUTCMonth() + 1 : date.getUTCMonth() - 1) + '-' + date.getDay()
    }
    return {
        name: ranWord(minAccount, maxAccount),
        avatar: ranDataImage('25x25'),
        type: isVip ? 1 : 0,
        score: ranInteger(0, 20000),
        vipStatus
    }
})
m(FETCH_KU_MONEY, 'get', () => {
    return ranInteger(0, 1000)
})