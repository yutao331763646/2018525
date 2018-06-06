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
        commit('TYPE', data)
        let url = '?do=getSupByTYPE&type=' + data
        axios
            .get(url)
            .then((res) => {
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
    },
    drugsData : ({
        commit
    }, data) => {
        commit('GET_DRUGS_DATA', data)
    },
    getAllpwjj : ({commit}) => {
        axios
            .post('?do=getAllpwjj')
            .then((res) => {
                commit('PWJJ', res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    },
    pwjjarr:({
        commit
    }, data)=>{
        commit('PWJJARR', data)
    }
}