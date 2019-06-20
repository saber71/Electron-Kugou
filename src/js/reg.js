import {maxAccount, minAccount, minPassword, maxPassword} from "@/js/_const";
import {ranInteger} from "@/js/mock-random";

/**
 * 判断账号是否合法
 * @param account
 * @returns {boolean}   true，合法
 */
export function validAccount(account) {
    const reg = `^([^\\s/=-\\\\+\\\\'\\\\"]*[a-zA-Z0-9]){${minAccount},${maxAccount}}$`
    return new RegExp(reg).test(account)
}

/**
 * 判断密码是否合法
 * @param password
 * @returns {boolean}   true，合法
 */
export function validPassword(password) {
    const reg = `^[!@#a-zA-Z0-9]{${minPassword},${maxPassword}}$`
    return new RegExp(reg).test(password)
}

/**
 * 判断手机号是否合法
 * @param phone
 * @returns {boolean}   true，合法
 */
export function validPhone(phone) {
    phone = parseInt(phone)
    return phone > 10000000000 && phone < 20000000000
}

/**
 * 生成手机号
 */
export function generatePhone() {
    return ranInteger(10000000000, 20000000000)
}

/**
 * 生成验证码
 * @returns {string}
 */
export function generateVerificationCode() {
    return ranInteger(100000, 999999) + ''
}

/**
 * 是否是强密码
 * @param password
 * @returns {boolean}   true，强密码
 */
export function isStrongPassword(password) {
    const strongPassword = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#]).{${minPassword},${maxPassword}}`
    return new RegExp(strongPassword).test(password)
}

/**
 * 是否是中等强度密码
 * @param password
 * @returns {boolean}   true，是中等强度密码
 */
export function isMiddlePassword(password) {
    const middlePassword = `^(?=.*[a-z])(?=.*\\d).{${minPassword},${maxPassword}}`
    return new RegExp(middlePassword).test(password)
}