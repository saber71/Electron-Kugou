import {
    autoLoginKey,
    generateMultiLoginObj,
    generateMusicList, HOME_COMMON_BG,
    localListKey,
    loginHistoryKey, MAIN_RIGHT_ACTIVE_DEFAULT,
    onlineUserKey,
    rememberPasswordKey
} from "@/js/_const";
import {getLocalStorageItem} from "@/js/util";

const randomLoginHistory = generateMultiLoginObj(1, 20);
const randomLocalMusicList = {
    '默认列表': generateMusicList('默认列表', 0, 40),
    '第三方歌曲': generateMusicList('第三方歌曲', 0, 40),
    '最近播放': generateMusicList('最近播放', 0, 40),
}

export default {
    localMusicList: getLocalStorageItem(localListKey, randomLocalMusicList),//本地音乐列表
    netMusicList: [],//网络音乐列表

    loginHistory: getLocalStorageItem(loginHistoryKey, randomLoginHistory),//登陆历史
    onlineUser: getLocalStorageItem(onlineUserKey, undefined),//在线用户
    rememberPassword: getLocalStorageItem(rememberPasswordKey, false),//记住密码
    autoLogin: getLocalStorageItem(autoLoginKey, false),//自动登陆
    userData: undefined,//用户数据

    homeBg: HOME_COMMON_BG,//Home的背景
    alreadyLogin: false,//是否已登录
    mainBg: 'white',//主界面的背景
    mainLeftY: 0,
    mainLeftHeight: 0,
    visibleLogin: false,//是否显示登陆界面
    visibleRegister: false,//是否显示注册界面
    mainRightActive: MAIN_RIGHT_ACTIVE_DEFAULT,//当前正在显示的页面
    mainRightActiveHistory: [],//页面显示历史

    musicSpaceUser: '',//正在查看的音乐空间用户
    socialContactType: 0,//要进入的社交界面的类型【0：好友，1：关注，2：粉丝，3：访客】
}