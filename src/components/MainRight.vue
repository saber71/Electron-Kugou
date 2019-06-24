<template>
    <div id="main-right">
        <section class="header">
            <div class="header-element"
                 :class="{'header-element-active':mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY}"
                 title="最新最火歌曲尽在其中"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY)">乐库
            </div>
            <div class="header-element"
                 :class="{'header-element-active':mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_RADIO}"
                 title="享受随便听听的精彩"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_RADIO)">电台
            </div>
            <div class="header-element"
                 :class="{'header-element-active':mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_MUSIC_LIST}"
                 title="海量歌单想听就听"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_MUSIC_LIST)">歌单
            </div>
            <div class="header-element"
                 :class="{'header-element-active':mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_MV}"
                 title="随意点播百万MV"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_MV)">MV
            </div>
            <div class="header-element"
                 :class="{'header-element-active':mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_LIVE_BROADCAST}"
                 title="在线直播"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_LIVE_BROADCAST)">直播
            </div>
            <div class="header-element"
                 :class="{'header-element-active':mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_KTV}"
                 title="在线K歌"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_KTV)">KTV
            </div>
            <div class="header-element"
                 :class="{'header-element-active':mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_LYRIC}"
                 title="精准歌词搭配高清写真"
                 @click="mainRightActive(constant.MAIN_RIGHT_ACTIVE_LYRIC)">歌词
            </div>
            <div class="slide" :style="{'left':slideLeft}"
                 v-show="mainRightActiveIndex<=constant.MAIN_RIGHT_ACTIVE_LYRIC"></div>
        </section>
        <section class="main">
            <user-music-space v-if="mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_MUSIC_SPACE"></user-music-space>
            <edit-account v-if="mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT"></edit-account>
            <upload-avatar v-if="mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_UPLOAD_AVATAR"></upload-avatar>
            <EditPassword v-if="mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_EDIT_PASSWORD"></EditPassword>
            <account-security v-if="mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_SECURITY"></account-security>
            <bind-email v-if="mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_SECURITY_EMAIL"></bind-email>
            <SocialContact v-if="mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT"></SocialContact>
            <purchased-musics
                    v-if="mainRightActiveIndex===constant.MAIN_RIGHT_ACTIVE_PURCHASED_MUSICS"></purchased-musics>
        </section>
    </div>
</template>

<script>
    import {
        MAIN_RIGHT_ACTIVE_BUY_SVIP,
        MAIN_RIGHT_ACTIVE_DEFAULT,
        MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT,
        MAIN_RIGHT_ACTIVE_EDIT_PASSWORD,
        MAIN_RIGHT_ACTIVE_KTV,
        MAIN_RIGHT_ACTIVE_LIVE_BROADCAST,
        MAIN_RIGHT_ACTIVE_LYRIC,
        MAIN_RIGHT_ACTIVE_MUSIC_LIST,
        MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY,
        MAIN_RIGHT_ACTIVE_MUSIC_SPACE,
        MAIN_RIGHT_ACTIVE_MV, MAIN_RIGHT_ACTIVE_PURCHASED_MUSICS,
        MAIN_RIGHT_ACTIVE_RADIO,
        MAIN_RIGHT_ACTIVE_SECURITY,
        MAIN_RIGHT_ACTIVE_SECURITY_EMAIL,
        MAIN_RIGHT_ACTIVE_UPLOAD_AVATAR, MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT
    } from "@/js/_const";
    import EditAccount from "@/components/main-right/account-setting/EditAccount";
    import UploadAvatar from "@/components/main-right/account-setting/UploadAvatar";
    import EditPassword from "@/components/main-right/account-setting/EditPassword";
    import AccountSecurity from "@/components/main-right/account-setting/AccountSecurity";
    import BindEmail from "@/components/main-right/account-setting/BindEmail";
    import UserMusicSpace from "@/components/main-right/UserMusicSpace";
    import SocialContact from "@/components/main-right/SocialContact";
    import PurchasedMusics from "@/components/main-right/PurchasedMusics";

    export default {
        name: "MainRight",
        components: {
            PurchasedMusics,
            SocialContact,
            UserMusicSpace,
            BindEmail,
            AccountSecurity,
            EditPassword,
            UploadAvatar,
            EditAccount
        },
        props: {},
        data() {
            return {
                constant: {
                    MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY,
                    MAIN_RIGHT_ACTIVE_MUSIC_SPACE,
                    MAIN_RIGHT_ACTIVE_MUSIC_LIST,
                    MAIN_RIGHT_ACTIVE_LYRIC,
                    MAIN_RIGHT_ACTIVE_LIVE_BROADCAST,
                    MAIN_RIGHT_ACTIVE_MV,
                    MAIN_RIGHT_ACTIVE_KTV,
                    MAIN_RIGHT_ACTIVE_RADIO,
                    MAIN_RIGHT_ACTIVE_EDIT_ACCOUNT,
                    MAIN_RIGHT_ACTIVE_DEFAULT,
                    MAIN_RIGHT_ACTIVE_BUY_SVIP,
                    MAIN_RIGHT_ACTIVE_UPLOAD_AVATAR,
                    MAIN_RIGHT_ACTIVE_EDIT_PASSWORD,
                    MAIN_RIGHT_ACTIVE_SECURITY,
                    MAIN_RIGHT_ACTIVE_SECURITY_EMAIL,
                    MAIN_RIGHT_ACTIVE_USER_SOCIAL_CONTACT,
                    MAIN_RIGHT_ACTIVE_PURCHASED_MUSICS,
                },
            }
        },
        watch: {},
        computed: {
            mainRightActiveIndex() {
                return store.state.mainRightActive
            },
            slideLeft() {
                let res = '0'
                switch (store.state.mainRightActive) {
                    case MAIN_RIGHT_ACTIVE_MUSIC_REPOSITORY:
                        res = '50% - 231px';
                        break
                    case MAIN_RIGHT_ACTIVE_RADIO:
                        res = '50% - 160px';
                        break
                    case MAIN_RIGHT_ACTIVE_MUSIC_LIST:
                        res = '50% - 88px';
                        break
                    case MAIN_RIGHT_ACTIVE_MV:
                        res = '50% - 20px';
                        break
                    case MAIN_RIGHT_ACTIVE_LIVE_BROADCAST:
                        res = '50% + 48px';
                        break
                    case MAIN_RIGHT_ACTIVE_KTV:
                        res = '50% + 120px';
                        break
                    case MAIN_RIGHT_ACTIVE_LYRIC:
                        res = '50% + 190px';
                        break
                }
                return 'calc(' + res + ')'
            },
        },
        methods: {},
        mounted() {

        },
        created() {
        },
        destroyed() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../style/main-right";
</style>