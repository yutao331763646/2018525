<template>
    <div class="ChoosePharmavy">
        <!-- 推荐药房的弹出 -->
        <mu-flexbox class="disease_name proposal " orient="horizontal" v-if="tuishow">
            <mu-content-block>推荐药房</mu-content-block>

            <mu-raised-button class="demo-raised-button" label="推荐其他药房" @click="openpopup('bottom')" />
        </mu-flexbox>
        <!--非弹出层 的默认选中药房 -->
        <div class="pharmacylist" v-if="tuishow" style="padding-left:10px;border:1px solid #ccc;padding: 5px 0 5px 20px;width:100%;">
            <!-- <mu-radio disabled :label="defaults.name" /> -->
            <!-- <img src="../../assets/erweima.png" alt=""> -->
            <div>
                <span>{{defaults.name}}</span>
                <span>{{defaults.address}}</span>
            </div>
        </div>
        <mu-popup position="bottom" popupClass="recommended_pharmacy" :open="bottomPopup">
            <mu-appbar title="推荐药房">
                <mu-flat-button slot="left" label="  " color="white" @click="closepopup('bottom')" />
                <mu-flat-button slot="right" label="保存" color="white" @click="storePhar('bottom')" />
            </mu-appbar>
            <mu-flexbox orient="horizontal" wrap="wrap" class="dis_type">
                <!-- 弹出层的配送方式 -->
                <mu-raised-button v-for="(item,index ) in servers" :key="index" :label="item.name" @click="clickType(index,item.type,item)" :secondary="index==typeindex2" />
            </mu-flexbox>
            <mu-list>
                <!-- 弹出层的药房 -->
                <div v-for="(item,index) in pharmavyDatas.select[num]" :key="index" :class="{acited:suindex==index}" class="pharmavyDataslist">

                    <!-- <mu-radio :nativeValue="item.name" :label="item.name" name="group" v-model="value" @click.native="choosePhar(index,item)"></mu-radio> -->
                    <pharmacylist :text="item" @click.native="choosePhar(index,item)" />
                </div>
            </mu-list>
        </mu-popup>
        <!-- 非弹出层的默认配送方式 -->
        <mu-flexbox orient="horizontal" class="dis_type" v-if="tuishow" wrap="wrap">
            <mu-raised-button v-for="(item,index) in serviceArrDefault" :key="index" :label="item.name" :secondary="index==typeactidata" @click.native="chooseType(index,item)" />
        </mu-flexbox>
        <mu-toast v-if="toast" message="当前用药类型没有推荐药房" />
        <mu-toast v-if="toast2" message="请选择一个供应商" />
    </div>
</template>

<script>
import pharmacylist from './PharmacyList.vue'
import { mapState, mapActions } from 'vuex'
import axios from "axios";
import Qs from 'qs'
import { setTimeout } from 'timers';
export default {
    name: 'ChoosePharmavy',
    data() {
        return {
            // value: '',
            bottomPopup: false,
            toast2: false,
            // checkindex: 50,// 初始化第一个栏块高亮
            server: {
                1: '代煎代送',
                2: '自煎代送',
                3: '代煎自取',
                4: '自取',
                5: '送货上门',
                6: '货到付款',
                '-1': '门店结算'
            },
            servers: [],//选中的服务类型
            num: 1,
            // typeindex: 0,
            typeindex2: 0,
            pinkageSups: {
                '1': ['000000', '159101', '059102'],
                '2': ['059107']
            },//满减活动的供应商id
            // typeacti: 0,
            suindex: 0,
            connt: 0,//用来记录用户是否手动点击选中供应商，没有点击的话就默认第一个
        }
    },
    methods: {
        signCFFF() {
            if (!this.repeatOrder.data) {
                // console.log("正常流程")
            } else {
                let give_type = this.repeatOrder.data.orderInfo.give_type;
                let keyArr = Object.keys(this.defaults.serviceArr)
                let len = keyArr.indexOf(give_type)
                // console.log(this.defaults)
                // console.log("chongfang" + len)
                // console.log("又进入这个页面了   " + this.typeactidata)
                this.typeacti(len)
                // console.log("又进入222这个页面了   " + this.typeactidata)
                // console.log(this.serviceType)
                let len2 = keyArr.indexOf(this.serviceType.type)
                // console.log(len2)
                this.typeacti(len2)
            }
        },
        openpopup(position) {
            this.connt = 0
            this[position + 'Popup'] = true;
            this.servers = [];
            this.typeindex2 = 0;
            this.suindex = 999;
            // 先判断是否重方复方
            if (!this.repeatOrder.data) {
                // 再判断容器内是否有药，无药的话默认走上一步的选择类型请求供应商信息
                // console.log(this.datas2)
                // console.log("======================正常开方========")
                if (this.datas2.length < 1) {
                    // console.log("===============正常开方======无药====")
                    let keys = Object.keys(this.pharmavyDatas.select);
                    this.num = keys[0];//打开推荐其他药房时，默认选中第一个服务类型及当前类型下的供应商
                    if (keys) {
                        keys.forEach((item, index) => {
                            this.servers.push({ name: this.server[item], type: item })
                        })
                    } else {
                        console.log("无数据")
                    }
                    this.pharmavyData({ type: this.type, sid: '', give_type: '' })
                } else {
                    // 有药的话  用容器内的药品去拉新的供应商信息

                    let data = {
                        drug_code: this.datas2
                    }
                    axios.post('?do=selectSup', Qs.stringify(data))
                        .then((res) => {
                            // console.log("==============正常开方=======有药===+===============================")
                            // console.log(res)
                            this.pharmavyDatass(res.data.data);
                            // console.log(this.pharmavyDatas.select)
                            let keyArr = Object.keys(this.pharmavyDatas.select)
                            let len = keyArr.indexOf(this.serviceType.type)
                            this.typeindex2 = len
                            this.num = keyArr[len]
                            // console.log(keyArr)
                            if (keyArr) {
                                keyArr.forEach((item, index) => {
                                    this.servers.push({ name: this.server[item], type: item })
                                })
                            } else {
                                console.log("无数据")
                            }

                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            } else {
                // console.log("====================重方")
                // console.log(this.datas2)
                if (this.datas2.length < 1) {
                    // console.log("====================重方无药")

                    this.pharmavyData({
                        type: this.repeatOrder.data.orderInfo.drug_type,
                        sid: this.repeatOrder.data.orderInfo.supplier_id,
                        give_type: this.repeatOrder.data.orderInfo.give_type
                    })
                } else {
                    let data = {
                        drug_code: this.datas2
                    }
                    axios.post('?do=selectSup', Qs.stringify(data))
                        .then((res) => {
                            // console.log("==================重方有药---========================================")
                            // console.log(res)
                            this.pharmavyDatass(res.data.data);

                            let keyArr = Object.keys(this.pharmavyDatas.select)
                            let len = keyArr.indexOf(this.serviceType.type)
                            this.typeindex2 = len
                            this.num = keyArr[len]


                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }

                let keys = Object.keys(this.pharmavyDatas.select);
                let len = keys.indexOf(this.serviceType.type)
                this.typeindex2 = len
                this.num = keys[0];//打开推荐其他药房时，默认选中第一个服务类型及当前类型下的供应商
                // console.log(keys);
                if (keys) {
                    keys.forEach((item, index) => {
                        this.servers.push({ name: this.server[item], type: item })
                    })
                } else {
                    console.log("无数据")
                }
            }
        },
        // 取消选择其他药房
        closepopup(position) {
            this[position + 'Popup'] = false
            this.defaults = this.pharmavyDatas.default
        },
        //保存选择的药房
        storePhar(position) {
            if (!this.connt) {

                this.toast2 = true
                if (this.toastTimer) clearTimeout(this.toastTimer)
                this.toastTimer = setTimeout(() => { this.toast2 = false }, 2000)
                // console.log("请选择一个供应商")
            } else {

                this[position + 'Popup'] = false;

                let base = 0;
                this.pinkageSups[1].forEach((item) => {
                    if (this.type == 1 && item == this.sid) {
                        base += 1;
                    }
                })
                this.pinkageSups[2].forEach((item) => {
                    if (this.type == 2 && item == this.sid) {
                        base += 1;
                    }
                })
                if (base == 0) {
                    this.$emit('pinkageSupze', false);
                } else {
                    this.$emit('pinkageSupze', true);
                }
            }




        },
        clickType(index, type, item) {
            this.num = type;
            this.typeindex2 = index;
            // 被点击的服务类型的id在默认配送方式的的索引，让他高亮
            let keyArr = Object.keys(this.defaults.serviceArr)
            let len = keyArr.indexOf(item.type)
            this.typeacti(len)
            this.$emit('peisong', item.type)
            this.typeindex({ a: index, b: item })

        },
        choosePhar(index, item) {
            this.connt += 1;
            this.changedefaults(item)
            // console.log(item)
            // console.log("选择供应商")
            // console.log(this.serviceType)
            // console.log(this.defaults.serviceArr)
            this.suindex = index;
            let keyArr = Object.keys(this.defaults.serviceArr)
            let len = keyArr.indexOf(this.num)
            this.typeindex2 = len;
            // console.log(len)
            this.typeacti(len)
            // console.log("选择供应商时的配送方式   " + this.typeactidata)
        },
        chooseType(index, item) {
            this.typeacti(index)
            // console.log(this.typeactidata + "    点击非弹出层的配送方式时")
            this.$emit('peisong', item.type)
            this.typeindex({ a: index, b: item })
        },

        ...mapActions([
            'changedefaults',
            'typeindex',
            'pharmavyDatass',
            'pharmavyData',
            'typeacti'
        ]),
    },
    created() {
        // this.signCFFF();
    },
    beforeMount() {
    },
    mounted() {
        this.signCFFF();
        // console.log(this.typeactidata)
        // console.log(this.defaults)
    },
    beforeUpdate() {
    },
    updated() {
        // console.log("更新就打印this.serviceType.type   " + this.serviceType.type)
    },
    components: {
        pharmacylist,
    },
    computed: {
        // 全局共享的数据
        ...mapState({
            defaults: state => state.defaults,
            pharmavyDatas: state => state.pharmavyData,
            toast: state => state.toast,
            tuishow: state => state.tuishow,
            typeindexs: state => state.typeindex,
            datas2: state => state.datas2,
            type: state => state.type,
            sid: state => state.defaults.supplier_id,
            repeatOrder: state => state.repeatOrder,
            serviceType: state => state.serviceType,
            repeatOrder: state => state.repeatOrder,
            typeactidata: state => state.typeacti

        }),
        serviceArrDefault() {

            let arr = [],
                serviceArr = this.defaults.serviceArr;
            let keys = Object.keys(serviceArr);
            //  console.log(keys)
            if (keys) {
                keys.forEach((item, index) => {
                    arr.push({ name: this.server[item], type: item })
                });
            }
            return arr;
        },
    }

}
</script>

<style scoped>
@import "../proposal/proposalsp.css";
</style>

<style>
@import "../proposal/proposal.css";
</style>

<style scoped lang="less">
.ChoosePharmavy {
  width: 100%;
}
.pharmacylist {
  margin: 0 auto;
  //   margin-top: 10px;
  padding: 0px 0 0 30px;
  //   display: flex;
  //   border: 1px solid #ccc;
  //   padding: 5px 0;
  width: 95%;
  //   display: flex;
  align-items: center;
  img {
    width: 1.8rem;
    height: 1rem;
    margin-right: 10px;
  }
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    span:first-of-type {
      font-size: 0.25rem;
      margin-bottom: 5px;
      text-align: left;
    }
    span:last-of-type {
      font-size: 0.18rem;
      color: #ccc;
      line-height: 0.24rem;
      text-align: left;
    }
  }
}
.pharmavyDataslist {
  padding: 0 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
}
.acited {
  border: 1px solid red;
}
.mu-toast {
  height: 39px;
  width: 60%;
  position: fixed;
  left: 50%;
  bottom: 50px;
  margin-left: -30%;
  line-height: 39px;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
}
</style>