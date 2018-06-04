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
    TYPE_INDEX
} from './mutation-types.js'
import axios from "axios";
export default {
    adddatas({
        commit
    }, data) {
        commit('ADD_DATAS', data)
    },
    adddatas2({
        commit
    }, data) {
        commit('ADD_DATASS', data)
    },
    pharmavyData({
        commit
    }, data) {
        let url = '?do=getSupByTYPE&type=' + data
        axios
            .get(url)
            .then((res) => {
                if (res.data.code == 1) {
                    console.log(res)
                    commit('PHARMAVT_DATA', res.data.data);
                    commit('DISABLEDS', false)
                    commit('TUISHOW', true)
                    if (res.data.data.select.length < 1) {
                        commit('TOAST')
                        commit('DISABLEDS', true)
                        commit('TUISHOW', false)
                    }
                } else {
                    commit('DISABLEDS', false)
                    commit('TUISHOW', false)
                }
            })
            .catch((err) => {
                console.log(err);
            });

    },
    istrue({
        commit
    }, bool) {
        commit('IS_TRUE', bool)
    },
    showloader : ({commit}) => {
        commit('SHOWLOADING')
    },
    hideloader : ({commit}) => {
        commit('HIDELOADING')
    },
    changedefaults : ({
        commit
    }, data) => {
        commit('CHANGE_DEFAULTS', data)
    },
    typeindex : ({
        commit
    }, data) => {
        commit('TYPE_INDEX', data)
    }
    // toast:({commit})=>{     commit('TOAST') }, disableds:({commit},bool)=>{
    // commit('DISABLEDS',bool) }, tuishow:({commit},bool)=>{ commit('TUISHOW',bool)
    // }
}