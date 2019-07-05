<template>
    <div id="MusicRecommend">
        <section class="recommend-new">
            <section class="musics">
                <section class="labels">
                    <h2 class="title">新歌首发</h2>
                    <label :class="{'active-label':recommendNewMusicActiveLabel===0}" @mouseenter="recommendNewMusicActiveLabel=0">华语</label>
                    <label :class="{'active-label':recommendNewMusicActiveLabel===1}" @mouseenter="recommendNewMusicActiveLabel=1">欧美</label>
                    <label :class="{'active-label':recommendNewMusicActiveLabel===2}" @mouseenter="recommendNewMusicActiveLabel=2">韩国</label>
                    <label :class="{'active-label':recommendNewMusicActiveLabel===3}" @mouseenter="recommendNewMusicActiveLabel=3">日本</label>
                </section>
                <section class="music-list">
                    <div class="music" v-for="(v,index) in visibleRecommendNewMusics">
                        <label class="name" :title="v.name">{{v.name}}</label>
                        <section class="right">
                            <label class="duration">{{formatDuration(v.duration)}}</label>
                            <img class="mv" src="../../../../assets/mv.png" v-show="v.mv" title="观看MV">
                            <img class="playing" src="../../../../assets/sanjiao-gray.png" title="播放" @click="play(v)">
                            <img src="../../../../assets/add-group-gray.png" title="添加" @click="addToMusicList(v)">
                            <img src="../../../../assets/download-gray.png" title="下载">
                        </section>
                    </div>
                </section>
                <section class="bottom">
                    <section class="pager" v-if="recommendNewMusics.length>0">
                        <img class="prev" src="../../../../assets/arrow-down-dark.png" :class="{'disabled':currentPage===1}" @click="prev">
                        <label>{{currentPage}}/{{total}}</label>
                        <img class="next" src="../../../../assets/arrow-down-dark.png" :class="{'disabled':currentPage===total}" @click="next">
                    </section>
                    <button @click="playAll">全部播放</button>
                </section>
            </section>
            <section class="albums">
                <section class="banner">
                    <h2 class="title">新碟上架</h2>
                    <label>更多</label>
                </section>
                <section class="album-list">
                    <div class="album" v-for="v in recommendNewAlbums" :title="v.name" @click="toAlbum(v)">
                        <div class="img">
                            <img class="icon" :src="v.img">
                            <img class="play-icon" src="../../../../assets/triangle-white.png">
                        </div>
                        <p class="name">{{v.name}}</p>
                        <p class="singer">{{v.singer}}</p>
                    </div>
                </section>
            </section>
        </section>
        <section class="category-banner">
            <label @click="clickCategoryBanner(0)">儿歌大全</label>
            <label @click="clickCategoryBanner(1)">情感电台</label>
            <label @click="clickCategoryBanner(2)">车载音乐</label>
            <label @click="clickCategoryBanner(3)">网络红歌</label>
            <label @click="clickCategoryBanner(4)">嗨爆DJ</label>
            <label @click="clickCategoryBanner(5)">伤感情歌</label>
            <label @click="clickCategoryBanner(6)">无损音乐</label>
        </section>
        <section class="recommend-custom">
            <section class="banner">
                <div class="left">
                    <h2 class="section-title">个性化推荐</h2>
                    <label>根据您的喜好生成，多收藏下载猜的越准</label>
                </div>
                <label class="more">更多</label>
            </section>
            <section class="content">
                <div class="every-recommend">
                    <div class="img">
                        <img class="icon" :src="tempImg">
                        <div class="top">{{getMonth()}}</div>
                        <div class="bottom">{{today.getDay()}}</div>
                    </div>
                    <p class="name">每日歌曲推荐</p>
                </div>
                <div class="item" v-for="v in recommendCustomMusicList" :title="v.name">
                    <div class="img">
                        <img class="icon" :src="v.img">
                        <div class="hover-bottom">
                            <div class="love" title="收藏歌单">
                                <img src="../../../../assets/love-white-all.png">
                            </div>
                            <div class="play" title="播放全部">
                                <img src="../../../../assets/triangle-white.png">
                            </div>
                        </div>
                    </div>
                    <p class="name">{{v.name}}</p>
                </div>
            </section>
        </section>
        <section class="recommend-music-list">
            <section class="banner">
                <div class="left">
                    <h2 class="section-title">精选歌单</h2>
                </div>
                <label class="more">更多</label>
            </section>
            <section class="content">
                <div class="item" v-for="v in recommendMusicList" :title="v.name">
                    <div class="img">
                        <img class="icon" :src="v.img">
                        <div class="hover-bottom">
                            <div class="love" title="收藏歌单">
                                <img src="../../../../assets/love-white-all.png">
                            </div>
                            <div class="play" title="播放全部">
                                <img src="../../../../assets/triangle-white.png">
                            </div>
                        </div>
                    </div>
                    <p class="name">{{v.name}}</p>
                </div>
            </section>
        </section>
        <section class="recommend-mv-radio">
            <section class="banner">
                <div class="left">
                    <h2 class="section-title">精选MV电台</h2>
                </div>
                <div class="right">
                    <div class="change" @click="mvRadioPage=(mvRadioPage+1)%mvRadioTotal">
                        <img src="../../../../assets/flush-blue-all.png">
                        换一批
                    </div>
                    <label class="more">更多</label>
                </div>
            </section>
            <section class="content">
                <div class="item" v-for="v in visibleMVRadio" :title="v.type">
                    <div class="img">
                        <img class="icon" :src="v.img">
                        <div class="on-hover">
                            <label>{{v.type}}</label>
                            <div class="play">
                                <img src="../../../../assets/triangle-white.png">
                            </div>
                        </div>
                    </div>
                    <p class="name">{{v.description}}</p>
                </div>
            </section>
        </section>
        <section class="recommend-album">
            <section class="banner">
                <div class="left">
                    <h2 class="section-title">推荐专辑</h2>
                    <label :class="{'active-label':activeAlbumIndex===0}" @mouseenter="activeAlbumIndex=0">华语</label>
                    <label :class="{'active-label':activeAlbumIndex===1}" @mouseenter="activeAlbumIndex=1">欧美</label>
                    <label :class="{'active-label':activeAlbumIndex===2}" @mouseenter="activeAlbumIndex=2">韩国</label>
                    <label :class="{'active-label':activeAlbumIndex===3}" @mouseenter="activeAlbumIndex=3">日本</label>
                    <label :class="{'active-label':activeAlbumIndex===4}" @mouseenter="activeAlbumIndex=4">付费</label>
                </div>
                <div class="right">
                    <label class="more">更多</label>
                </div>
            </section>
            <section class="content">
                <div class="item" v-for="(v) in activeAlbum" :title="v.type">
                    <album-card :album="v"></album-card>
                </div>
            </section>
        </section>
        <section class="recommend-mv">
            <section class="banner">
                <div class="left">
                    <h2 class="section-title">推荐MV</h2>
                </div>
                <div class="right">
                    <label class="more">更多</label>
                </div>
            </section>
            <section class="content">
                <div class="item" v-for="v in recommendMV" :title="v.type">
                    <div class="img">
                        <img class="icon" :src="v.img">
                        <div class="mask">
                            <div class="play">
                                <img src="../../../../assets/triangle-white.png">
                            </div>
                        </div>
                    </div>
                    <p class="name">{{v.name}}</p>
                    <p class="description">{{v.description}}</p>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
    import ajax from "@/js/ajax";
    import {ADD_ALL_TO_MUSIC_LIST, SET_LOOK_ALBUM, SET_MUSIC_REPOSITORY_ACTIVE_INDEX} from "@/js/store/mutations_name";
    import {SET_PLAYING_MUSIC} from "@/js/event-bus";
    import {ranDataImage} from "@/js/mock-random";
    import {generateMVRadio, MAIN_RIGHT_ACTIVE_ALBUM, MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY} from "@/js/_const";
    import AlbumCard from "@/components/main-right/AlbumCard";

    export default {
        name: "MusicRecommend",
        components: {AlbumCard},
        props: {},
        data() {
            return {
                recommendNewMusics: [],
                recommendNewAlbums: [],
                recommendCustomMusicList: [],
                recommendMusicList: [],
                recommendMV: [],
                recommendMVRadio: [],
                recommendAlbum: [],
                recommendNewMusicActiveLabel: 0,
                currentPage: 1,
                size: 12,
                today: new Date(),
                tempImg: ranDataImage('100x100'),
                mvRadioSize: 4,
                mvRadioPage: 1,
                activeAlbumIndex: 0,
                showAlbumListIndex: -1,
                albumPage: 1,
                albumSize: 8,
                musicListPopupStyle: {
                    top: 0,
                    right: 0
                }
            }
        },
        watch: {},
        computed: {
            albumMusicTotal() {
                if (this.showAlbumListIndex < 0) {
                    return 0
                }
                return this.activeAlbum[this.showAlbumListIndex].musics.length
            },
            albumMusicListTotalPage() {
                if (this.showAlbumListIndex < 0) {
                    return 0
                }
                const musicsLength = this.albumMusicTotal
                const size = this.albumSize
                let res = parseInt(musicsLength / size)
                if (musicsLength % size > 0) {
                    res++
                }
                return res
            },
            showAlbumMusicList() {
                if (this.showAlbumListIndex < 0) {
                    return []
                }
                const musics = this.activeAlbum[this.showAlbumListIndex].musics
                const page = this.albumPage
                const size = this.albumSize
                return musics.slice((page - 1) * size, page * size)
            },
            activeAlbum() {
                return this.recommendAlbum[this.activeAlbumIndex]
            },
            mvRadioTotal() {
                let res = this.recommendMVRadio.length / this.mvRadioSize
                if (this.recommendMVRadio.length % this.mvRadioSize > 0) {
                    res++
                }
                return res
            },
            visibleMVRadio() {
                const list = this.recommendMVRadio
                const page = this.mvRadioPage
                const size = this.mvRadioSize
                return list.slice(page * size, (page + 1) * size)
            },
            visibleRecommendNewMusics() {
                const musics = this.recommendNewMusics[this.recommendNewMusicActiveLabel]
                if (musics) {
                    const currentPage = this.currentPage
                    const size = this.size
                    return musics.slice((currentPage - 1) * size, currentPage * size)
                } else {
                    return []
                }
            },
            total() {
                return this.recommendNewMusics[this.recommendNewMusicActiveLabel].length / this.size
            }
        },
        methods: {
            showMusicList(index, ev) {
                this.showAlbumListIndex = index
                const clientX = ev.clientX
                const clientY = ev.clientY
                const width = window.innerWidth
                this.musicListPopupStyle.right = (width - clientX + 15) + 'px'
                this.musicListPopupStyle.top = (clientY - 150) + 'px'
            },
            getMonth() {
                let res = ''
                const month = this.today.getMonth() + 1
                switch (month) {
                    case 1:
                        res = '一'
                        break
                    case 2:
                        res = '二'
                        break
                    case 3:
                        res = '三'
                        break
                    case 4:
                        res = '四'
                        break
                    case 5:
                        res = '五'
                        break
                    case 6:
                        res = '六'
                        break
                    case 7:
                        res = '七'
                        break
                    case 8:
                        res = '八'
                        break
                    case 9:
                        res = '九'
                        break
                    case 10:
                        res = '十'
                        break
                    case 11:
                        res = '十一'
                        break
                    case 12:
                        res = '十二'
                        break
                }
                return res + '月'
            },
            clickCategoryBanner(index) {
                //    todo clickCategoryBanner
            },
            toAlbum(album) {
                const mainRightActive = this.mainRightActive
                store.commit(SET_LOOK_ALBUM, {
                    breadcrumb: [
                        {
                            name: '推荐',
                            onclick() {
                                store.commit(SET_MUSIC_REPOSITORY_ACTIVE_INDEX, 0)
                                mainRightActive(MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY)
                            }
                        }
                    ],
                    album
                })
                this.mainRightActive(MAIN_RIGHT_ACTIVE_ALBUM)
            },
            playAll() {
                const musicList = store.state.localMusicList['默认列表'].musics
                const index = musicList.length
                store.commit(ADD_ALL_TO_MUSIC_LIST, {
                    name: '默认列表',
                    local: true,
                    musics: this.visibleRecommendNewMusics,
                })
                const obj = {
                    music,
                    musics: musicList,
                    index
                }
                eventBus.$emit(SET_PLAYING_MUSIC, obj)
            },
            play(music) {
                this.addToMusicList(music)
                const musicList = store.state.localMusicList['默认列表'].musics
                const obj = {
                    music,
                    musics: musicList,
                    index: musicList.length - 1
                }
                eventBus.$emit(SET_PLAYING_MUSIC, obj)
            },
            addToMusicList(music) {
                store.commit(ADD_ALL_TO_MUSIC_LIST, {
                    name: '默认列表',
                    local: true,
                    musics: [music],
                })
            },
            next() {
                if (this.currentPage < this.total) {
                    this.currentPage++
                }
            },
            prev() {
                if (this.currentPage > 0) {
                    this.currentPage--
                }
            }
        },
        mounted() {
        },
        created() {
            ajax.getRecommendNewMusic().then((value) => {
                this.recommendNewMusics = value.data
            })
            ajax.getRecommendNewAlbum().then((value) => {
                this.recommendNewAlbums = value.data
            })
            ajax.getCustomRecommend().then((value) => {
                this.recommendCustomMusicList = value.data
            })
            ajax.getRecommendMusicList().then((value) => {
                this.recommendMusicList = value.data
            })
            ajax.getRecommendAlbum().then((value) => {
                this.recommendAlbum = value.data
            })
            ajax.getRecommendMV().then((value) => {
                this.recommendMV = value.data
            })
            for (let i = 0; i < 12; i++) {
                this.recommendMVRadio.push(generateMVRadio())
            }
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../style/main-right/MusicRecommend";
</style>