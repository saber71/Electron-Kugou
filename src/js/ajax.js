import {
    CAN_VISIT_SPACE,
    COMMENT,
    CUSTOM_RECOMMEND,
    EMAIL_VALIDATOR,
    FANS,
    FETCH_KU_MONEY,
    FOCUS_USER,
    FRIENDS,
    LOGIN,
    MSG_LOGIN,
    MUSIC_SPACE_DATA,
    MUSIC_SPACE_SECURITY,
    MY_RADIO_LIST,
    NEW_ALBUM_RECOMMEND,
    NEW_MUSIC_RECOMMEND,
    PHONE_VALIDATOR,
    PURCHASED_MUSICS,
    RECOMMEND_ALBUM,
    RECOMMEND_MUSIC_LIST,
    RECOMMEND_MV,
    REGISTER,
    REMOVE_VISIT_RECORD,
    SET_FOCUS,
    SIMILAR_ALBUMS,
    SIMILAR_MUSIC_LIST,
    SPACE_VISITORS,
    UPLOAD_AVATAR,
    USER_DATA,
    USER_DATA_SAVE
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
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getMusicSpaceData() {
        const userAccount = store.state.musicSpaceUser
        return axios.get(MUSIC_SPACE_DATA, userAccount)
    },
    /**
     * 设置自己的音乐空间的可见等级
     * @param level     0，所有人可见；1，仅好友可见；2，仅自己可见
     * @returns {Promise<AxiosPromise<any>>}
     */
    async setMusicSpaceSecurity(level) {
        return axios.post(MUSIC_SPACE_SECURITY, level)
    },
    /**
     * 获取指定用户的音乐空间的可见等级
     * @returns {Promise<AxiosPromise<any>>}    0，所有人可见；1，仅好友可见；2，仅自己可见
     */
    async getMusicSpaceSecurity() {
        const userAccount = store.state.musicSpaceUser
        return axios.get(MUSIC_SPACE_SECURITY, userAccount)
    },
    /**
     * 获取指定用户的好友
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getFriends() {
        const userAccount = store.state.musicSpaceUser
        return axios.get(FRIENDS, userAccount)
    },
    /**
     * 获取指定用户关注的用户
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getFocusUser() {
        const userAccount = store.state.musicSpaceUser
        return axios.get(FOCUS_USER, userAccount)
    },
    /**
     * 获取指定用户的粉丝
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getFans() {
        const userAccount = store.state.musicSpaceUser
        return axios.get(FANS, userAccount)
    },
    /**
     * 获取指定用户的音乐空间的访客
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getSpaceVisitors() {
        const userAccount = store.state.musicSpaceUser
        return axios.get(SPACE_VISITORS, userAccount)
    },
    /**
     * 设置对指定用户的关注与否
     * @param account
     * @param val
     * @returns {Promise<AxiosPromise<any>>}
     */
    async setFocus(account, val) {
        return axios.post(SET_FOCUS, {account, val})
    },
    /**
     * 删除指定用户的浏览记录
     * @param account
     * @returns {Promise<AxiosPromise<any>>}
     */
    async removeVisitRecord(account) {
        return axios.post(REMOVE_VISIT_RECORD, account)
    },
    /**
     * 是否能够浏览指定用户的音乐空间
     * @param account
     * @returns {Promise<AxiosPromise<any>>}
     */
    async canVisitSpace(account) {
        return axios.get(CAN_VISIT_SPACE, account)
    },
    /**
     * 获取所有已购买的音乐
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getPurchasedMusics() {
        return axios.get(PURCHASED_MUSICS)
    },
    /**
     * 获取我的音乐电台列表
     * @returns {Promise<AxiosPromise<any>>}
     */
    async getMyRadioList() {
        return axios.get(MY_RADIO_LIST)
    },
    /**
     * 获取推荐新歌
     * @returns {Promise<AxiosPromise<any>>}
     */
    getRecommendNewMusic() {
        return axios.get(NEW_MUSIC_RECOMMEND)
    },
    /**
     * 获取推荐新专辑
     * @returns {Promise<AxiosPromise<any>>}
     */
    getRecommendNewAlbum() {
        return axios.get(NEW_ALBUM_RECOMMEND)
    },
    /**
     * 获取个性化推荐
     * @returns {Promise<AxiosPromise<any>>}
     */
    getCustomRecommend() {
        return axios.get(CUSTOM_RECOMMEND)
    },
    /**
     * 获取推荐歌单
     * @returns {AxiosPromise<any>}
     */
    getRecommendMusicList() {
        return axios.get(RECOMMEND_MUSIC_LIST)
    },
    /**
     * 获取推荐专辑
     * @returns {AxiosPromise<any>}
     */
    getRecommendAlbum() {
        return axios.get(RECOMMEND_ALBUM)
    },
    /**
     * 获取推荐MV
     * @returns {AxiosPromise<any>}
     */
    getRecommendMV() {
        return axios.get(RECOMMEND_MV)
    },
    /**
     * 获取相似的专辑
     * @returns {AxiosPromise<any>}
     */
    getSimilarAlbums() {
        return axios.get(SIMILAR_ALBUMS)
    },
    /**
     * 获取评论
     * @returns {AxiosPromise<any>}
     */
    getComment() {
        return axios.get(COMMENT)
    },
    getSimilarMusicList() {
        return axios.get(SIMILAR_MUSIC_LIST)
    },
}

export default ajax