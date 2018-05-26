import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

//创建Store实例
const state = {
    datas: [],
    datas2: [],
    bool: false,
    showLoading: false,
    pharmavyData: {
        default: {
            address: '',
            give_money: '',
            name: '',
            offline_pay: '',
            proce_money: '',
            serve_money: '',
            service: '',
            serviceArr: [],
            supplier_id: ''
        },
        select: {

        }
    },//推荐药房的数据

}
const getters = {
    showLoading(state) {
        return state.showLoading
    },
    serviceArrDefault() {
        let server = {
            1: '代煎代送',
            2: '自煎代送',
            3: '代煎自取',
            4: '自取',
            5: '送货上门',
            6: '货到付款',
            '-1': '门店结算'
        };
        let arr=[];
        state.pharmavyData.default.serviceArr.forEach((item,index) => {
            arr.push(server[item])
        });
        return arr;
    }
}

//导出
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
})