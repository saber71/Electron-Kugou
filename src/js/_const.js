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
*   sex     性别  【0：男，1：女】
*   birthday    生日  string  【xxxx-xx-xx】
*   opinion     个性签名    string
*   province    省份  string
*   city    城市  string
*   avatar  头像img  string
*   type    用户类型    number  【0：普通，1：vip】
*   score   积分  number|string
*   vipStatus   开通vip的情况    string 【0：从未开通过，具体日期：表示vip到期时间】
* }
* */