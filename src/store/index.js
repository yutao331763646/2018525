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
    showLoading:false,
    pharmavyData:{},//推荐药房的数据

}
const getters = {  
    showLoading(state){  
        return state.showLoading  
    }  
} 

//导出
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
})