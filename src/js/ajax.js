import {LOGIN, MSG_LOGIN, REGISTER, VERIFICATION_PHONE} from "@/js/url";

const ajax = {
    async login(accountObj) {
        return axios.post(LOGIN, accountObj)
    },
    async msgLogin(account) {
        return axios.post(MSG_LOGIN, account)
    },
    async verificationPhone(phone) {
        return axios.get(VERIFICATION_PHONE, phone)
    }
    async register(account) {
        return axios.post(REGISTER, account)
    }
}

export default ajax