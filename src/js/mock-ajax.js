import Mock from 'mockjs'
import {LOGIN, MSG_LOGIN, REGISTER, VERIFICATION_PHONE} from "@/js/url";
import {getUrlParam, ranBoolean} from "@/js/mock-random";
import {objNoVal} from "@/js/util";

Mock.setup({
    timeout: '500-1500'
})

const mock = Mock.mock;

function reg(match) {
    return '^' + baseUrl + match + '$';
}

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