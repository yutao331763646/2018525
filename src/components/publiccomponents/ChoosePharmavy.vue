<template>
    <div class="ChoosePharmavy">
        <!-- 推荐药房的弹出 -->
        <mu-flexbox class="disease_name proposal " orient="horizontal" v-if="tuishow">
            <mu-content-block>推荐药房</mu-content-block>
            <mu-raised-button class="demo-raised-button" label="推荐其他药房" @click="openpopup('bottom')" />
        </mu-flexbox>
        <!--非弹出层 的默认选中药房 -->
        <div class="pharmacylist" v-if="tuishow" style="padding-left:10px;border:1px solid #ccc;padding: 5px 0 5px 20px;width:100%;">
            <mu-radio disabled :label="defaults.name"/>
            <!-- <img src="../../assets/erweima.png" alt=""> -->
            <div>
                <!-- <span>{{defaults.name}}</span> -->
                <span style="padding-left:30px;">{{defaults.address}}</span>
            </div>
        </div>
        <mu-popup position="bottom" popupClass="recommended_pharmacy" :open="bottomPopup">
            <mu-appbar title="推荐药房">
                <mu-flat-button slot="left" label="取消" color="white" @click="closepopup('bottom')" />
                <mu-flat-button slot="right" label="保存" color="white" @click="storePhar('bottom')" />
            </mu-appbar>
            <mu-flexbox orient="horizontal" wrap="wrap" class="dis_type">
                <!-- 弹出层的配送方式 -->
                <mu-raised-button v-for="(item,index ) in servers" :key="index" :label="item.name" @click="clickType(index,item.type)" :secondary="index==typeindex2" />
            </mu-flexbox>
            <mu-list>
                <!-- 弹出层的药房 -->
                <div v-for="(item,index) in pharmavyDatas.select[num]" :key="index" class="pharmavyDataslist">

                    <mu-radio :nativeValue="item.name"  :label="item.name"  name="group" v-model="value"  @click.native="choosePhar(index,item)"></mu-radio>
                    <pharmacylist :text="item"/>
                </div>
            </mu-list>
        </mu-popup>
        <!-- 非弹出层的默认配送方式 -->
        <mu-flexbox orient="horizontal" class="dis_type" v-if="tuishow" wrap="wrap">
            <mu-raised-button v-for="(item,index) in serviceArrDefault" :key="index" :label="item.name" :secondary="index==typeindexs" @click.native="chooseType(index,item)" />
        </mu-flexbox>
        <mu-toast v-if="toast" message="当前用药类型没有推荐药房" />
    </div>
</template>

<script>
import pharmacylist from './PharmacyList.vue'
import { mapState, mapActions } from 'vuex'
import axios from "axios";
import Qs from 'qs'
export default {
    name: 'ChoosePharmavy',
    data() {
        return {
            value: '',
            bottomPopup: false,
            checkindex: 50,// 初始化第一个栏块高亮
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
        }
    },
    methods: {
        openpopup(position) {
            this[position + 'Popup'] = true;
            this.servers = [];
            this.typeindex2 = 0;
            console.log(this.datas2)
            if (this.datas2.length < 1) {
                this.pharmavyData(this.type)
                console.log("这是没有选择药品时打开的")

            } else {
                let _this = this,
                    param = new FormData();
                param.append('drug_code', this.datas2);
                axios.post('?do=selectSup', Qs.stringify(param))
                    .then((res) => {
                        console.log(res)
                        this.pharmavyDatass(res.data.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            let keys = Object.keys(this.pharmavyDatas.select);
            this.num = keys[0];//打开推荐其他药房时，默认选中第一个服务类型及当前类型下的供应商
            // console.log(keys);
            if (keys) {
                keys.forEach((item, index) => {
                    this.servers.push({ name: this.server[item], type: item })
                })
            } else {
                console.log("无数据")
            }



        },
        // 取消选择其他药房
        closepopup(position) {
            this[position + 'Popup'] = false
            this.defaults = this.pharmavyDatas.default
        },
        //保存选择的药房
        storePhar(position) {
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


        },
        clickType(index, type) {
            this.num = type;
            this.typeindex2 = index;

        },
        choosePhar(index, item) {
            // console.log(item)
            this.changedefaults(item)
            this.checkindex = index
            console.log(this.defaults, item)
        },
        chooseType(index, item) {
            // console.log(item.type)
            this.$emit('peisong', item.type)
            this.typeindex({ a: index, b: item })
        },
        ...mapActions([
            'changedefaults',
            'typeindex',
            'pharmavyDatass',
            'pharmavyData',
        ]),
    },
    created() {

    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
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
.pharmavyDataslist{
    padding: 0 10px;
    margin-bottom: 5px;
    border-bottom: 1px solid #eee;
}
</style>