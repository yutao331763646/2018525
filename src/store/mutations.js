import { ADD_DATAS, ADD_DATASS, IS_TRUE,SHOWLOADING,HIDELOADING,PHARMAVT_DATA } from './mutation-types.js'
export default {
    ADD_DATAS(state, datas) {
        state.datas = datas;
    },
    ADD_DATASS(state, datas) {
        state.datas2 = datas;
    },
    PHARMAVT_DATA(state, datas){
        state.pharmavyData = datas;
    },
    IS_TRUE(state, bool) {
        state.bool = bool
    },
    [SHOWLOADING](state){  
        state.showLoading = true;  
    },  
    [HIDELOADING](state){  
        state.showLoading = false;  
    } 
}