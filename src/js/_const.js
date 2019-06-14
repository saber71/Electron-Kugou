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
export const inlineUserKey = '在线用户'
export const rememberPasswordKey = '记住密码'
export const autoLoginKey = '自动登陆'

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