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
    PWJJARR,
    PHARMAVT_DATAAFTER,
    USERINFO,
    TEPEATORDER
} from './mutation-types.js'
import axios from "axios";
import Qs from 'qs'
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
    }, {type, sid, give_type}) {
        console.log()
        commit('TYPE', type)
        let param = {
            'type': type,
            'supId': sid
        }
        axios
            .get('?do=getSupByTYPE', {params: param})
            .then((res) => {
                if (res.data.code == 1) {

                    if (res.data.msg == "拍照方") {
                        commit('TUISHOW', false)
                        commit('DISABLEDS', false)
                    } else {

                        let server = {
                            1: '代煎代送',
                            2: '自煎代送',
                            3: '代煎自取',
                            4: '自取',
                            5: '送货上门',
                            6: '货到付款',
                            '-1': '门店结算'
                        };
                        let keys = Object.keys(res.data.data.default.serviceArr);
                        let arr = [];
                        if (keys) {
                            keys.forEach((item, index) => {
                                arr.push({name: server[item], type: item})
                            })
                        }
                        if (sid) {
                            // 如果是重方复方 设置原始方的高亮和选择
                            let index = keys.indexOf(give_type)
                            commit('TYPE_INDEX', {
                                a: index,
                                b: arr[index]
                            })
                        } else {
                            // 否则默认当前用药类型的第一个
                            commit('TYPE_INDEX', {
                                a: 0,
                                b: arr[0]
                            })
                        }

                        commit('PHARMAVT_DATA', res.data.data);
                        commit('DISABLEDS', false)
                        commit('TUISHOW', true)
                        if (res.data.data.select < 1) {
                            // commit('TOAST')
                            commit('DISABLEDS', true)
                            commit('TUISHOW', false)
                        }
                    }
                    // }
                } else {
                    commit('DISABLEDS', true)
                    commit('TUISHOW', false)
                }
            })
            .catch((err) => {
                console.log(err);
            });

    },
    pharmavyDatass({
        commit
    }, data) {
        commit('PHARMAVT_DATAAFTER', data)
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
    pwjjarr : ({
        commit
    }, data) => {
        commit('PWJJARR', data)
    },
    userinfo : ({
        commit
    }, data) => {
        commit('USERINFO', data)
    },
    repeatOrder : ({
        commit
    }, data) => {
        commit('TEPEATORDER', data)
    }
}