import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './js/mock-ajax'
import './js/event-bus'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

const isDevelopment = process.env.NODE_ENV !== 'production'
if (isDevelopment) {
    // import('./js/mock-ajax')
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
