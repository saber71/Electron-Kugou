import {LOGIN, MSG_LOGIN} from "@/js/url";

const ajax = {
    async login(accountObj) {
        return axios.post(LOGIN, accountObj)
    },
    async msgLogin(account) {
        return axios.post(MSG_LOGIN, account)
    }
}

export default ajax