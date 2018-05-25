import {
    ADD_DATAS,
    ADD_DATASS,
    IS_TRUE,
    SHOWLOADING,
    HIDELOADING,
    PHARMAVT_DATA
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
        let url = 'http://w.i.htyy.com/doctor_ajax.php?do=getSupByTYPE&type=1'
        axios
            .get(url)
            .then(function (res) {
                if (res.data.code == 1) {
                    commit('PHARMAVT_DATA', res.data.data)
                } else {
                    // _this.showToast(res.data.msg);
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
    }
}