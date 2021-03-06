import Mock from 'mockjs'
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
import {ranBoolean, ranDatetime, ranInteger} from "@/js/mock-random";
import {
    generateMultiAlbum,
    generateMultiComment,
    generateMultiMusic,
    generateMultiMV,
    generateMultiNetMusicList,
    generateMultiRadio,
    generateMultiUserBriefData,
    generateMusicSpaceData,
    generateNetMusicList,
    generatePurchasedMusics,
    generateUserData
} from "@/js/_const";

Mock.setup({
    timeout: '500-1500'
})

const mock = Mock.mock;

function m(url, method, action) {
    mock(baseUrl + url, method, action)
}

function regm(url, method, action) {
    mock(new RegExp('^' + baseUrl + url), method, action)
}

/**
 * 25%的概率返回false
 */
function mayFalse() {
    return ranBoolean(false, 1, 3)
}

/**
 * 25%的概率返回true
 */
function mayTrue() {
    return ranBoolean(true, 1, 3)
}

m(LOGIN, 'post', () => {
    return mayFalse()
})
m(MSG_LOGIN, 'post', () => {
    return mayFalse()
})
regm(PHONE_VALIDATOR + '?', 'get', () => {
    return mayTrue()
})
regm(EMAIL_VALIDATOR + '?', 'get', () => {
    return mayTrue()
})
m(REGISTER, 'post', () => {
    return mayFalse()
})
m(USER_DATA, 'get', () => {
    return generateUserData()
})
m(FETCH_KU_MONEY, 'get', () => {
    return ranInteger(0, 1000)
})
m(USER_DATA_SAVE, 'post', () => {
    return mayFalse()
})
m(UPLOAD_AVATAR, 'post', () => {
    return mayFalse()
})
regm(MUSIC_SPACE_DATA, 'get', () => {
    return generateMusicSpaceData()
})
m(MUSIC_SPACE_SECURITY, 'post', () => {
    return mayFalse()
})
regm(MUSIC_SPACE_SECURITY, 'get', () => {
    return ranInteger(0, 2)
})
regm(FRIENDS, 'get', () => {
    return generateMultiUserBriefData()
})
regm(FOCUS_USER, 'get', () => {
    return generateMultiUserBriefData()
})
regm(FANS, 'get', () => {
    return generateMultiUserBriefData()
})
regm(SPACE_VISITORS, 'get', () => {
    const res = generateMultiUserBriefData()
    res.forEach(value => value.date = ranDatetime())
    return res
})
m(SET_FOCUS, 'post', () => {
    return mayFalse()
})
m(REMOVE_VISIT_RECORD, 'post', () => {
    return mayFalse()
})
regm(CAN_VISIT_SPACE, 'get', () => {
    return mayFalse()
})
regm(PURCHASED_MUSICS, 'get', () => {
    return generatePurchasedMusics()
})
m(MY_RADIO_LIST, 'get', () => {
    return generateMultiRadio(5, 10)
})
m(NEW_MUSIC_RECOMMEND, 'get', () => {
    const musicSize = 36
    return [
        generateMultiMusic(musicSize, musicSize),
        generateMultiMusic(musicSize, musicSize),
        generateMultiMusic(musicSize, musicSize),
        generateMultiMusic(musicSize, musicSize),
    ]
})
m(NEW_ALBUM_RECOMMEND, 'get', () => {
    return generateMultiAlbum(4, 4)
})
m(CUSTOM_RECOMMEND, 'get', () => {
    return [
        generateNetMusicList(),
        generateNetMusicList(),
        generateNetMusicList(),
    ]
})
m(RECOMMEND_MUSIC_LIST, 'get', () => {
    return [
        generateNetMusicList(),
        generateNetMusicList(),
        generateNetMusicList(),
        generateNetMusicList(),
    ]
})
m(RECOMMEND_ALBUM, 'get', () => {
    return [
        generateMultiAlbum(4, 4),
        generateMultiAlbum(4, 4),
        generateMultiAlbum(4, 4),
        generateMultiAlbum(4, 4),
        generateMultiAlbum(4, 4, true),
    ]
})
m(RECOMMEND_MV, 'get', () => {
    return generateMultiMV(4, 4)
})
m(SIMILAR_ALBUMS, 'get', () => {
    return generateMultiAlbum(4, 4, false)
})
m(COMMENT, 'get', () => {
    return generateMultiComment(0, 100)
})
m(SIMILAR_MUSIC_LIST, 'get', () => {
    return generateMultiNetMusicList(5, 20)
})