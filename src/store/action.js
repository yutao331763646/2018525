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
        let url = 'http://w.i.htyy.com/doctor_ajax.php?do=getSupByTYPE&type=' + data
        axios
            .get(url)
            .then(function (res) {
                console.log(res.data)
                if (res.data.code == 1) {
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
                    // this.showToast(res.data.msg);
                }
            })
            .catch(function (err) {
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
    // toast:({commit})=>{     commit('TOAST') }, disableds:({commit},bool)=>{
    // commit('DISABLEDS',bool) }, tuishow:({commit},bool)=>{
    // commit('TUISHOW',bool) }
}