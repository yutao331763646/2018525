import {
    ADD_DATAS,
    ADD_DATASS,
    IS_TRUE,
    SHOWLOADING,
    HIDELOADING,
    PHARMAVT_DATA,
    TOAST,
    DISABLEDS,
    TUISHOW,
    CHANGE_DEFAULTS,
    TYPE_INDEX,
    GET_DRUGS_DATA,
    TYPE,
    PWJJ,
    PWJJARR
} from './mutation-types.js'
export default {
    ADD_DATAS(state, datas) {
        state.datas = datas;
    },
    ADD_DATASS(state, datas) {
        state.datas2 = datas;
    },
    PHARMAVT_DATA(state, datas) {
        state.defaults = datas.default;
        state.pharmavyData = datas;
    },
    IS_TRUE(state, bool) {
        state.bool = bool
    },
    [SHOWLOADING](state) {
        state.showLoading = true;
    },
    [HIDELOADING](state) {
        state.showLoading = false;
    },
    TOAST(state) {
        state.toast = true;
        let toastTimer;
        if (toastTimer) 
            clearTimeout(toastTimer)
        toastTimer = setTimeout(() => {
            state.toast = false
        }, 2000)
    },
    DISABLEDS(state, bool) {
        state.disableds = bool
    },
    TUISHOW(state, bool) {
        state.tuishow = bool
    },
    CHANGE_DEFAULTS(state, data) {
        state.defaults =data
    },
    TYPE_INDEX(state, data){
        state.typeindex=data
    },
    GET_DRUGS_DATA(state, data){
        state.drugsData=data
    },
    TYPE(state, data){
        state.type=data
    },
    PWJJ(state, data){
        state.pwjj=data
    },
    PWJJARR(state, data){
        state.pwjjarr.push(data)
    }
}