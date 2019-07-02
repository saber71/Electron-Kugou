import {ranBoolean, ranCity, ranCTitle, ranCWord, ranDataImage, ranDatetime, ranEmail, ranInteger, ranName, ranParagraph, ranProvince, ranTitle, ranWord} from "@/js/mock-random";
import {generatePhone} from "@/js/reg";
import {formatDate, getFileName, objNoVal, strNoVal} from "@/js/util";

export const minWidth = 1024
export const minHeight = 600

export const minAccount = 6
export const maxAccount = 20
export const minPassword = 6
export const maxPassword = 20

export const ORDER_BY_NAME = 1
export const ORDER_BY_SINGER = 2
export const ORDER_BY_TIME = 3
export const ORDER_BY_TIMES = 4
export const ORDER_BY_RANDOM = 5

export const localListKey = '本地列表'
export const loginHistoryKey = '登陆历史'
export const onlineUserKey = '在线用户'
export const rememberPasswordKey = '记住密码'
export const autoLoginKey = '自动登陆'
export const localMusicListNamesKey = '本地音乐列表名字'
export const playListKey = '播放列表'
export const playingIndexKey = '播放序号'

// export const HOME_COMMON_BG = ' linear-gradient(to right, #0186E1, #0298f4 50%, #0186E1), linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1))'
export const HOME_COMMON_BG = `url(${require('../assets/default-bg.jpg')}) no-repeat center center`

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
export const MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT = 14//用户的社交信息
export const MAIN_RIGHT_ACTIVE_PURCHASED_MUSICS = 15//已购音乐

/*
* music {   歌曲对象
*   name    String,
*   singer  String,
*   img
*   album   string  专辑
*   love    boolean 是否喜欢
*   time    string  添加时间
*   mv  boolean 是否匹配MV
*   duration    Integer（单位秒）
*   source 【本地资源，网络资源】
*   quality     【高品，标准】
*   bitrate    number  码率
*   type    格式  String
*   size    string  文件大小（单位:M）
*   file    文件路径
* }
* */
const DEFAULT_MUSIC_FILE = '/default-music.mp3'

export function generateMusic(isNetSource, filePath) {
    const singerName = ranName()
    return {
        name: ranTitle(1, 3) + ' - ' + singerName,
        singer: singerName,
        img: ranDataImage('50x50'),
        album: ranTitle(1, 3),
        love: ranBoolean(),
        duration: ranInteger(30, 300),
        mv: ranBoolean(),
        time: ranDatetime(),
        source: isNetSource ? '网络资源' : '本地资源',
        quality: ranBoolean() ? '高品' : '标准',
        bitrate: ranBoolean() ? '128kbs' : '320kbs',
        type: ranBoolean() ? 'MP3' : 'FLAC',
        file: filePath ? filePath : DEFAULT_MUSIC_FILE,
        size: (ranInteger(1, 50) / 10) + 'M',
    }
}

export function musicFromTags(tag, path) {
    // const pics = tag.common.picture
    const fs = require('fs')
    const bitrate = parseInt('' + tag.format.bitrate / 1000)
    const res = {
        name: getFileName(path),
        singer: tag.common.artist ? tag.common.artist : '未知',
        img: ranDataImage('50x50'),
        album: tag.common.album ? tag.common.album : '未知',
        love: false,
        duration: parseInt((tag.format.duration + 1) + ''),
        time: formatDate(new Date()),
        source: '本地资源',
        quality: bitrate >= 320 ? '高品' : '标准',
        bitrate: bitrate + 'kbs',
        type: tag.format.codec,
        file: path,
    }
    fs.stat(path, (err, stat) => {
        if (!err) {
            res.size = (parseInt((stat.size / 1024 / 1024 * 10) + '') / 10) + "M"
        }
    })
    return res
}

export function generateMultiMusic(min, max) {
    const res = []
    const len = ranInteger(min, max)
    for (let i = 0; i < len; i++) {
        res.push(generateMusic(true))
    }
    return res
}

/*
* music-list  {  音乐列表
*   name    string  列表名字
*   musics  array   music数组
*   removeable  boolean 是否能够被用户删除
*   renamable   boolean 是否能够被用户重命名
*   orderBy number  排序方式【1：按文件名，2：按歌手，3：按添加时间，4：按播放次数，5：随机排序】
*   direction   number  排序方向【1：从小到大，-1：从大到小】
* }
* */
export function emptyMusicList(name) {
    return {
        name: name ? name : ranTitle(1, 3),
        musics: [],
        orderBy: 3,
        renameable: true,
        removeable: true,
        direction: 1
    }
}

export function generateMusicList(name, minMusic, maxMusic, renamable, removeable) {
    const obj = emptyMusicList(name)
    obj.musics = generateMultiMusic(minMusic, maxMusic)
    obj.renamable = renamable
    obj.removeable = removeable
    return obj
}

export function generateMultiMusicList(minList, maxList, minMusic, maxMusic) {
    const res = []
    const len = ranInteger(minList, maxList)
    for (let i = 0; i < len; i++) {
        res.push(generateMusicList(undefined, minMusic, maxMusic))
    }
    return res
}

/*
* loginObj  & onlineUser {   登陆账号对象  &   在线用户对象
*   account 账号  String
*   password    密码  String
*   byMessage   是否通过短信登陆    Boolean
* }
* */
export function generateLoginObj() {
    return {
        account: ranBoolean() ? ranWord(minAccount, maxAccount) : generatePhone(),
        password: ranWord(minPassword, maxPassword),
        byMessage: ranBoolean()
    }
}

export function generateMultiLoginObj(min, max) {
    const res = []
    const len = ranInteger(min, max)
    for (let i = 0; i < len; i++) {
        res.push(generateLoginObj())
    }
    return res
}

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
export function generateUserData() {
    const isVip = ranBoolean()
    let vipStatus = '0'
    const date = new Date()
    if (isVip) {
        vipStatus = date.getUTCFullYear() + '-' + (ranBoolean() ? date.getMonth() + 2 : date.getMonth()) + '-' + date.getDate()
    }
    return {
        id: ranInteger(0, Number.MAX_SAFE_INTEGER),
        name: ranWord(minAccount, maxAccount),
        password: ranBoolean() ? '' : ranWord(minPassword, maxPassword),
        phone: ranBoolean() ? undefined : generatePhone(),
        securityQuestion: ranBoolean() ? ranCTitle(7, 9) : undefined,
        answer: ranCTitle(1, 10),
        email: ranBoolean() ? ranEmail() : undefined,
        avatar: ranDataImage('25x25'),
        type: isVip ? 1 : 0,
        score: ranInteger(0, 20000),
        vipStatus,
        birthday: formatDate(new Date()),
        sex: ranInteger(0, 1),
        opinion: ranParagraph(1, 3),
        province: ranProvince(),
        city: ranCity()
    }
}

/*
* music-space-data  {  音乐空间数据
*   name    string  用户昵称
*   avatar  string  用户头像
*   opinion string  个性签名
*   province    string  所处省份
*   city    string  所处城市
*   sex     number  性别  【0：男，1：女】
*   isFocus boolean 自己是否已关注
*   friends     number  好友的数量
*   focus       number  关注的人的数量
*   fans        number  粉丝的数量
*   visitors    number  音乐空间访客的数量
*   customMusicList     array      创建的歌单，net-music-list数组
*   favoriteMusicList    array       收藏的歌单，net-music-list数组
* }
* */
export function generateMusicSpaceData() {
    const favoriteMusicList = []
    const len = ranInteger(0, 20)
    for (let i = 0; i < len; i++) {
        favoriteMusicList.push(generateNetMusicList(undefined, true, true))
    }
    return {
        name: ranWord(minAccount, maxAccount),
        avatar: ranDataImage('100x100', 'Avatar'),
        opinion: ranCTitle(0, 60),
        province: ranProvince(),
        city: ranCity(),
        sex: ranInteger(0, 1),
        isFocus: ranBoolean(),
        friends: ranInteger(0, 20000),
        focus: ranInteger(0, 20000),
        fans: ranInteger(0, 20000),
        visitors: ranInteger(0, 20000),
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
*   musics  array   歌单包含的音乐，music数组,
*   renameable  boolean 是否能够重命名
*   removeable  boolean 是否能够删除
* }
* */
export function generateNetMusicList(name, renameable, removeable) {
    return {
        name: name ? name : ranTitle(1, 3),
        author: ranWord(minAccount, maxAccount),
        img: ranDataImage('100x100'),
        musics: generateMultiMusic(1, 20),
        renameable: objNoVal(renameable) ? ranBoolean() : renameable,
        removeable: objNoVal(removeable) ? ranBoolean() : removeable
    }
}

/*
* user-brief-data  {  其他用户的简短信息
*   name    string  昵称
*   avatar  string  头像
*   focus   Boolean 【true，已关注；false，未关注】
* }
* */
export function generateUserBriefData() {
    return {
        name: ranWord(minAccount, maxAccount),
        avatar: ranDataImage('100x100'),
        focus: ranBoolean()
    }
}

/**
 * 生成复数个user-brief-data
 * @returns {Array}
 */
export function generateMultiUserBriefData() {
    const res = []
    const len = ranInteger(0, 20)
    for (let i = 0; i < len; i++) {
        res.push(generateUserBriefData())
    }
    return res
}

/*
* purchased-musics  {  已购音乐
*   isSVIP  boolean 是否是SVIP
*   musicBag    array   音乐包，music数组
*   singleSings array   付费单曲，music数组
*   albums  array   已购专辑，album数组
* }
* */
export function generatePurchasedMusics() {
    return {
        isSVIP: ranBoolean(),
        musicBag: generateMultiMusic(0, 50),
        singleSings: generateMultiMusic(0, 50),
        albums: generateMultiAlbum(0, 20)
    }
}

/*
* album  {  专辑
*   name    string 专辑名字
*   singer  string  演唱者
*   publisher   string 发行公司
*   publishDate string  发行时间
*   lang    string  语言
*   img     string  封面
*   price   number?  价格
*   score   number  评分
*   scoreNum    number  评分人数
*   musics  array   music数组
* }
* */
export function generateAlbum(name, price) {
    return {
        name: name ? name : ranTitle(1, 3),
        singer: ranName(),
        publisher: ranCTitle(5, 10),
        lang: ranCWord(2, 2),
        img: ranDataImage('100x100'),
        price: objNoVal(price) ? null : price ? ranInteger(1, 100) : null,
        score: ranInteger(10, 100) / 10,
        scoreNumber: ranInteger(0, 20000),
        musics: generateMultiMusic(10, 50)
    }
}

export function generateMultiAlbum(min, max, price) {
    const res = []
    const len = ranInteger(min, max)
    for (let i = 0; i < len; i++) {
        res.push(generateAlbum(undefined, price))
    }
    return res
}

/*
* radio  {  音乐电台
*   name    string  电台名字
*   img string  电台封面图片
*   playing music  正在播放的音乐
* }
* */
export function generateRadio(name) {
    return {
        name: strNoVal(name) ? ranTitle(1, 2) : name,
        img: ranDataImage('50x50'),
        playing: generateMusic(true)
    }
}

export function generateMultiRadio(min, max) {
    const res = []
    const len = ranInteger(min, max)
    for (let i = 0; i < len; i++) {
        res.push(generateRadio())
    }
    return res
}

/*
* mv  { MV
*   name    string  名字
*   author  string  上传者
*   img string  封面图片
*   description string  描述
* }
* */
export function generateMV() {
    return {
        name: ranCTitle(5, 10),
        author: ranTitle(),
        img: ranDataImage('100x100'),
        description: ranCTitle(5, 10)
    }
}

export function generateMultiMV(min, max) {
    const res = []
    const len = ranInteger(min, max)
    for (let i = 0; i < len; i++) {
        res.push(generateMV())
    }
    return res
}

/*
* mv-radio  {  MV电台
*   description    string  电台描述
*   type    string  种类
*   img string  封面图片
*   playing mv  正在播放的MV
* }
* */
export function generateMVRadio() {
    const type = ranCTitle(3, 5)
    return {
        description: ranCTitle(4, 10),
        type,
        img: ranDataImage('100x100', ''),
        playing: generateMV()
    }
}
