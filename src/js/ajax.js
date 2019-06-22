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
    async phoneValidator(phone) {
        return axios.get(PHONE_VALIDATOR, phone)
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
    /**
     * 判断邮箱是否被绑定
     * @param email
     * @returns {Promise<AxiosPromise<any>>}    true，已被绑定；false，未被绑定
     */
    async emailValidator(email) {
        return axios.get(EMAIL_VALIDATOR, email)
    },
    /**
     * 获取指定用户的音乐空间的数据
     * @param userAccount
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getMusicSpaceData(userAccount) {
        return axios.get(MUSIC_SPACE_DATA, userAccount)
    },
}

export default ajax