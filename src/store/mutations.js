import {
    ADD_DATAS,
    ADD_DATASS,
    IS_TRUE,
    SHOWLOADING,
    HIDELOADING,
    PHARMAVT_DATA,
    TOAST,
    DISABLEDS,
    TUISHOW
    
} from './mutation-types.js'
export default {
    ADD_DATAS(state, datas) {
        state.datas = datas;
    },
    ADD_DATASS(state, datas) {
        state.datas2 = datas;
    },
    PHARMAVT_DATA(state, datas) {
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
    TOAST(state){
        state.toast=true;
        let toastTimer;
        if (toastTimer) clearTimeout(toastTimer)
            toastTimer = setTimeout(() => { state.toast = false }, 2000)
    },
    DISABLEDS(state,bool){
        state.disableds=bool
    },
    TUISHOW(state,bool){
        state.tuishow=bool
    }
}