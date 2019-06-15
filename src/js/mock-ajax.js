import Mock from 'mockjs'
import {LOGIN, MSG_LOGIN} from "@/js/url";
import {ranBoolean} from "@/js/mock-random";

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

m(LOGIN, 'post', () => {
    return ranBoolean(false, 1, 2)
})

m(MSG_LOGIN, 'post', () => {
    return ranBoolean(false, 1, 2)
})