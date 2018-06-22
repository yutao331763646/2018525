// Dear programmer: When I wrote this code, only god and I knew how it worked
// Now ,only god knows it!

import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import '@/styles/base.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/index'
import Qs from 'qs'

axios.defaults.baseURL = 'http://w.i.htyy.com/doctor_ajax.php'; //本地地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.use(router);
Vue.use(MuseUI);
Vue.use(Vuex);
Vue.config.productionTip = false;

axios
    .interceptors
    .request
    .use(function (config) {
        store.dispatch('showloader');
        return config;
    }, function (err) {
        return Promise.reject(err);
    });
axios
    .interceptors
    .response
    .use(function (response) {
        store.dispatch('hideloader');
        return response;
    }, function (err) {
        return Promise.reject(err);
    });

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')