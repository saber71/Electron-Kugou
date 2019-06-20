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

const ajax = {
    /**
     * 通过密码登陆
     * @param accountObj
     * @returns {Promise<AxiosPromise<any>>}    如果登陆成功，返回true
     */
    async login(accountObj) {
        return axios.post(LOGIN, accountObj)
    },
    /**
     * 通过短信登陆
     * @param account
     * @returns {Promise<AxiosPromise<any>>}    如果登陆成功，返回true
     */
    async msgLogin(account) {
        return axios.post(MSG_LOGIN, account)
    },
    /**
     * 验证手机号是否已被注册
     * @param phone
     * @returns {Promise<AxiosPromise<any>>}    返回true表示已被注册
     */
    async verificationPhone(phone) {
        return axios.get(VERIFICATION_PHONE, phone)
    },
    /**
     * 注册
     * @param account
     * @returns {Promise<AxiosPromise<any>>}    返回true表示成功
     */
    async register(account) {
        return axios.post(REGISTER, account)
    },
    /**
     * 获取当前用户的数据
     * @returns {Promise<AxiosPromise<any>>}    返回UserData
     */
    async getUserData() {
        return axios.get(USER_DATA)
    },
    /**
     * 查询酷币余额
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getKuMoney() {
        return axios.get(FETCH_KU_MONEY)
    },
    /**
     * 保存个人信息
     * @returns {Promise<AxiosPromise<any>>}
     */
    async saveUserData() {
        return axios.post(USER_DATA_SAVE, store.state.userData)
    },
    /**
     * 上传用户头像
     * @param dataImage base64编码的图片
     * @returns {Promise<AxiosPromise<any>>}
     */
    async uploadAvatar(dataImage) {
        return axios.post(UPLOAD_AVATAR, dataImage)
    },
}

export default ajax