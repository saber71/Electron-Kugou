import {LOGIN} from "@/js/url";

const ajax = {
    async login(accountObj) {
        return axios.post(LOGIN, accountObj)
    }
}

export default ajax