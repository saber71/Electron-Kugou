import Mock from 'mockjs'
import {LOGIN} from "@/js/url";
import {ranBoolean} from "@/js/mock-random";

Mock.setup({
    timeout: '500-1500'
})

const mock = Mock.mock;

function reg(match) {
    return '^' + baseUrl + match + '$';
}

mock(baseUrl + LOGIN, 'post', () => {
    return ranBoolean(false, 1, 2)
})