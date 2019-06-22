import {
    ranBoolean,
    ranCity,
    ranCTitle,
    ranDataImage,
    ranInteger, ranName,
    ranProvince, ranSentence,
    ranTitle,
    ranWord
} from "@/js/mock-random";

export const minWidth = 1024
export const minHeight = 600

export const minAccount = 6
export const maxAccount = 20
export const minPassword = 6
export const maxPassword = 20

export const defaultListKey = '默认列表'
export const otherSourceListKey = '第三方列表'
export const recentMusicListKey = '最近播放'
export const recentMVListKey = '最近播放视频'
export const customListKey = '自定义列表'
export const loginHistoryKey = '登陆历史'
export const onlineUserKey = '在线用户'
export const rememberPasswordKey = '记住密码'
export const autoLoginKey = '自动登陆'

export const HOME_COMMON_BG = ' linear-gradient(to right, #0186E1, #0298f4 50%, #0186E1), linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1))'

export const MAIN_RIGHT_ACTIVE_DEFAULT = 0//默认页面
export const MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY = 0//乐库
export const MAIN_RIGHT_ACTIVE_RADIO = 1//电台
export const MAIN_RIGHT_ACTIVE_MUSIC_LIST = 2//歌单
export const MAIN_RIGHT_ACTIVE_MV = 3//MV
export const MAIN_RIGHT_ACTIVE_LIVE_BROADCAST = 4//直播
export const MAIN_RIGHT_ACTIVE_KTV = 5//KTV
export const MAIN_RIGHT_ACTIVE_LYRIC = 6//歌词
export const MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT = 7//设置个人信息
export const MAIN_RIGHT_ACTIVE_MUSIC_SPACE = 8//音乐空间
export const MAIN_RIGHT_ACTIVE_BUY_SVIP = 9//开通SVIP
export const MAIN_RIGHT_ACTIVE_UPLOAD_AVATAR = 10//上传头像
export const MAIN_RIGHT_ACTIVE_EDIT_PASSWORD = 11//修改密码
export const MAIN_RIGHT_ACTIVE_SECURITY = 12//安全设置
export const MAIN_RIGHT_ACTIVE_SECURITY_EMAIL = 13//绑定邮箱
export const MAIN_RIGHT_ACTIVE_SECURITY_QUESTION = 14//设置安全问题

/*
* music {   歌曲对象
*   name    String,
*   singer  String,
*   img
*   duration    Integer（单位秒）
*   source 【本地资源，网络资源】
*   quality 【高品，标准】
*   type    格式  String
*   file    文件路径
* }
* */
/**
 * 随机生成music对象
 * @returns {{duration, img, file, singer, name, source: string, type: string, quality: string}}
 */
export function generateMusic(isNetSource, filePath) {
    return {
        name: ranTitle(1, 3),
        singer: ranName(),
        img: ranDataImage('50x50'),
        duration: ranBoolean(30, 300),
        source: isNetSource ? '网络资源' : '本地资源',
        quality: ranBoolean() ? '高品' : '标准',
        type: ranBoolean() ? 'MP3' : 'FLAC',
        file: filePath ? filePath : ranWord()
    }
}

/*
* loginObj  {   登陆账号对象
*   account 账号  String
*   password    密码  String
*   byMessage   是否通过短信登陆    Boolean
* }
* */

/*
* customList  { 自定义歌曲/视频列表
*   name    列表名字 string
*   array   music / video 对象数组   array
* }
* */

/*
* userData  {  从服务器返回的用户数据
*   id  用户ID    number
*   name    用户名 string
*   password    密码  string
*   email   邮箱  string
*   sex     性别  【0：男，1：女】
*   birthday    生日  string  【xxxx-xx-xx】
*   opinion     个性签名    string
*   securityQuestion    安全问题    string
*   answer  安全问题答案  sting
*   province    省份  string
*   city    城市  string
*   avatar  头像img  string
*   type    用户类型    number  【0：普通，1：vip】
*   score   积分  number|string
*   vipStatus   开通vip的情况    string 【0：从未开通过，具体日期：表示vip到期时间】
* }
* */

/*
* music-space-data  {  音乐空间数据
*   name    string  用户昵称
*   avatar  string  用户头像
*   opinion string  个性签名
*   province    string  所处省份
*   city    string  所处城市
*   sex     number  性别  【0：男，1：女】
*   friends     number  好友的数量
*   focus       number  关注的人的数量
*   fans        number  粉丝的数量
*   visitors    number  音乐空间访客的数量
*   customMusicList     array      创建的歌单，net-music-list数组
*   favoriteMusicList    array       收藏的歌单，net-music-list数组
* }
* */
/**
 * 随机生成用户的音乐空间数据
 * @returns {{visitors, customMusicList: {img, author, name: *, musics: Array}[], province, city, sex, favoriteMusicList: Array, name, focus, avatar, friends, fans}}
 */
export function generateMusicSpaceData() {
    const favoriteMusicList = []
    const len = ranInteger(0, 20)
    for (let i = 0; i < len; i++) {
        favoriteMusicList.push(generateNetMusicList(undefined))
    }
    return {
        name: ranWord(minAccount, maxAccount),
        avatar: ranDataImage('100x100', 'Avatar'),
        opinion: ranCTitle(0, 60),
        province: ranProvince(),
        city: ranCity(),
        sex: ranInteger(0, 1),
        friends: ranInteger(0, 100),
        focus: ranInteger(0, 100),
        fans: ranInteger(0, 100),
        visitors: ranInteger(0, 100),
        customMusicList: [
            generateNetMusicList("我喜欢"),
            generateNetMusicList("默认列表"),
        ],
        favoriteMusicList
    }
}

/*
* net-music-list  {  网络歌单
*   name    string  歌单名字
*   author  string  歌单创建者的昵称
*   img string  歌单的封面图片
*   musics  array   歌单包含的音乐，music数组
* }
* */
/**
 * 随机生成网络歌单
 * @param name  歌单名字
 * @returns {{img, author, name: *, musics: Array}}
 */
export function generateNetMusicList(name) {
    const musics = []
    const len = ranInteger(1, 20)
    for (let i = 0; i < len; i++) {
        musics.push(generateMusic(true, undefined))
    }
    return {
        name: name ? name : ranTitle(1, 3),
        author: ranWord(minAccount, maxAccount),
        img: ranDataImage('100x100'),
        musics
    }
}