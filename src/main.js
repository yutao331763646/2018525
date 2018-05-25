// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import '@/styles/base.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/index'



axios.defaults.baseURL = 'http://192.168.6.118'; //本地地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.use(router);
Vue.use(MuseUI)
Vue.use(Vuex)
Vue.config.productionTip = false

axios.interceptors.request.use(function(config){  
    store.dispatch('showloader')  
    return config  
},function(err){  
    return Promise.reject(err)  
});  
axios.interceptors.response.use(function(response){  
    store.dispatch('hideloader')  
    return response  
},function(err){  
    return Promise.reject(err)  
}); 



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
}).$mount('#app')