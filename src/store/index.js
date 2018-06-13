import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

//创建Store实例
const state = {
    userinfo: {}, //用户姓名年龄性别
    datas: [],
    datas2: [], //选中保存的药品
    bool: false,
    showLoading: false,
    defaults: {
        address: '',
        give_money: '',
        name: '',
        service: '',
        serviceArr: {
            1: {
                offline_pay: '',
                proce_money: '',
                serve_money: ''
            }
        },
        supplier_id: ''
    },
    pharmavyData: {
        default: {
            address: '',
            give_money: '',
            name: '',
            service: '',
            serviceArr: {
                1: {
                    offline_pay: '',
                    proce_money: '',
                    serve_money: ''
                }
            },
            supplier_id: ''
        },
        select: {}
    }, //推荐药房的数据
    toast: false,
    disableds: false,
    tuishow: true,
    typeindex: 0, //取药方式的index
    serviceType: {
        name: '代煎代送',
        type: 1
    }, //配送方式
    drugsData: [
        {
            "id": "23302",
            "drug_id": "1010001",
            "city_poject_code": null,
            "province": null,
            "city": null,
            "sprice": "0.0300",
            "supplier_id": "159101",
            "max": "0",
            "code": "1010001",
            "name": "麻秸(油麻稿)",
            "smple_code": "mjymg,yt,iyt",
            "type": "1",
            "level": "0",
            "unit": "克",
            "poison": "0",
            "type_code": null
        }
    ],
    type: 1, //开方类型
    pwjj: ['dd'], //获取所有的配伍禁忌数组
    pwjjarr: [], //要传给后台的配伍禁忌数组
    repeatOrder:{},//重方复方的数据
}
const getters = {
    showLoading(state) {
        return state.showLoading
    },
    toast(state) {
        return state.toast
    },
    disableds(state) {
        return state.disableds
    },
    tuishow(state) {
        return state.tuishow
    }
}

//导出
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    plugins: [createPersistedState({
            storage: window.localStorage,
            reducer: state => ({typeindex: state.typeindex})
        })]
})