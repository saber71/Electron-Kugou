<template>
    <div id="edit-account">
        <account-setting-container ref="container" :active-label="0">
            <section class="body">
                <form>
                    <div class="form-line">
                        <label class="label">账号：</label>
                        <label>{{$store.state.onlineUser.account}}（积分：{{userDataForm.score}}）</label>
                    </div>
                    <div class="form-line">
                        <label class="label">酷狗ID：</label>
                        <label>{{userDataForm.id}}</label>
                    </div>
                    <div class="form-line">
                        <label class="label">昵称：</label>
                        <div class="input">
                            <input :class="{'input-invalid':warn.name}"
                                   v-model="userDataForm.name" :maxlength="nameMaxLength"
                                   @blur="()=>this.validator.name()">
                            <span class="warn" v-show="warn.name">{{warn.nameMsg}}</span>
                        </div>
                    </div>
                    <div class="form-line">
                        <label class="label">性别：</label>
                        <div>
                            <input id="radio-man" type="radio" v-model="userDataForm.sex" name="sex" :value="0">
                            <label class="sex-label" for="radio-man">男</label>
                            <input id="radio-woman" type="radio" v-model="userDataForm.sex" name="sex" :value="1">
                            <label class="sex-label" for="radio-woman">女</label>
                            <input id="radio-security" type="radio" v-model="userDataForm.sex" name="sex"
                                   :value="2">
                            <label class="sex-label" for="radio-security">保密</label>
                        </div>
                    </div>
                    <div class="form-line">
                        <label class="label">生日：</label>
                        <div class="input">
                            <input :class="{'input-invalid':warn.birthday}"
                                   type="date" v-model="userDataForm.birthday"
                                   @blur="()=>this.validator.birthday()">
                            <span class="warn" v-show="warn.birthday">{{warn.birthdayMsg}}</span>
                        </div>
                    </div>
                    <div class="form-line">
                        <label class="label">地区：</label>
                        <div>
                            <select v-model="userDataForm.province">
                                <option v-for="(v) in provinceList" :value="v">{{v}}</option>
                            </select>&nbsp;
                            <select v-model="userDataForm.city">
                                <option v-for="(v) in cityList" :value="v">{{v}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-line">
                        <label class="label">个性签名：</label>
                        <div class="textarea">
                            <textarea id="opinion" rows="3" v-model="userDataForm.opinion"
                                      @input="onOpinionInput"></textarea>
                            <label>字数不超过60个字符</label>
                        </div>
                    </div>
                    <div class="save-button" @click="userDataSave">保存</div>
                    <label class="warn" v-show="visibleWarn">无法链接服务器，请检查网络链接</label>
                </form>
            </section>
        </account-setting-container>
    </div>
</template>

<script>
    import {maxAccount} from "@/js/_const";
    import {objNoVal, strNoVal} from "@/js/util";
    import {USER_DATA_CHANGE} from "@/js/event-bus";
    import {ranCity, ranProvince} from "@/js/mock-random";
    import ajax from "@/js/ajax";
    import {validAccount} from "@/js/reg";
    import AccountSettingContainer from "@/components/main-right/account-setting/AccountSettingContainer";

    export default {
        name: "EditAccount",
        components: {AccountSettingContainer},
        props: {},
        data() {
            return {
                nameMaxLength: maxAccount,
                provinceList: [],
                cityList: [],
                userDataForm: {},
                visibleWarn: false,
                validator: {
                    name: () => {
                        const name = this.userDataForm.name
                        this.warn.name = false
                        this.warn.nameMsg = ''
                        if (strNoVal(name)) {
                            this.warn.name = true
                            this.warn.nameMsg = '请输入昵称'
                        } else if (!validAccount(name)) {
                            this.warn.name = true
                            this.warn.nameMsg = '无效的昵称'
                        }
                    },
                    birthday: () => {
                        const birthday = this.userDataForm.birthday
                        this.warn.birthday = false
                        this.warn.birthdayMsg = ''
                        if (strNoVal(birthday)) {
                            this.warn.birthday = true
                            this.warn.birthdayMsg = '请输入生日'
                        }
                    },
                },
                warn: {
                    name: false,
                    nameMsg: '',
                    password: false,
                    passwordMsg: '',
                    birthday: false,
                    birthdayMsg: ''
                },
                visibleLoading: false,
            }
        },
        watch: {
            'editAccountForm.province'(newVal) {
                this.initCityList(newVal)
            }
        },
        computed: {
            userData() {
                return store.state.userData
            }
        },
        methods: {
            initEditAccountForm(userData) {
                if (objNoVal(userData))
                    userData = this.userData
                this.userDataForm.id = userData.id;
                this.userDataForm.name = userData.name;
                this.userDataForm.sex = userData.sex;
                this.userDataForm.birthday = userData.birthday;
                this.userDataForm.province = userData.province;
                this.userDataForm.city = userData.city;
                this.userDataForm.score = userData.score;
                this.userDataForm.opinion = userData.opinion;
            },
            initCityList(province) {
                this.cityList = []
                if (province === this.userData.province)
                    this.cityList.push(this.userData.city)
                for (let i = 0; i < 5; i++) {
                    this.cityList.push(ranCity())
                }
            },
            onOpinionInput() {
                const el = document.getElementById('opinion')
                let opinion = el.value
                if (opinion.length >= 60) {
                    opinion = opinion.substring(0, 60)
                }
                this.userDataForm.opinion = opinion
                el.value = opinion
            },
            async userDataSave() {
                if (this.warn.name)
                    return
                store.commit("userData", this.userDataForm)
                const container = this.$refs.container
                this.visibleWarn = false
                container.$emit("loading", true)
                container.$emit("success", false)
                const res = (await ajax.saveUserData()).data
                this.visibleLoading = false
                container.$emit("loading", false)
                if (res) {
                    container.$emit("success", true)
                } else {
                    this.visibleWarn = true
                }
            }
        },
        mounted() {
        },
        created() {
            this.initEditAccountForm()
            eventBus.$on(USER_DATA_CHANGE, this.initEditAccountForm)
            for (let i = 0; i < 10; i++) {
                this.provinceList.push(ranProvince())
            }
            this.provinceList.push(this.userDataForm.province)
            this.initCityList(this.userDataForm.province)
        },
        destroyed() {
            eventBus.$off(USER_DATA_CHANGE)
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../style/main-right/edit-account";
</style>