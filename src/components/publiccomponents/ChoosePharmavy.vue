<template>
    <div class="ChoosePharmavy">
        <!-- 推荐药房的弹出 -->
        <mu-flexbox class="disease_name proposal " orient="horizontal" v-if="tuishow">
            <mu-content-block>推荐药房</mu-content-block>
            <mu-raised-button class="demo-raised-button" label="推荐其他药房" @click="openpopup('bottom')" />
        </mu-flexbox>
        <!--非弹出层 的默认选中药房 -->
        <div class="pharmacylist" v-if="tuishow">
            <img src="../../assets/erweima.png" alt="">
            <div>
                <span>{{defaults.name}}</span>
                <span>{{defaults.address}}</span>
            </div>
        </div>
        <mu-popup position="bottom" popupClass="recommended_pharmacy" :open="bottomPopup" @close="closepopup('bottom')">
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
                <pharmacylist v-for="(item,index) in pharmavyDatas.select[num]" :text="item" :key="index" :class="{'actives':index ==checkindex }" @click.native="choosePhar(index,item)"></pharmacylist>
            </mu-list>
        </mu-popup>
        <!-- 非弹出层的默认配送方式 -->
        <mu-flexbox orient="horizontal" class="dis_type" v-if="tuishow"  wrap="wrap" >
            <mu-raised-button v-for="(item,index) in serviceArrDefault" :key="index" :label="item" :secondary="index==typeindexs" @click.native="chooseType(index)" />
        </mu-flexbox>
        <mu-toast v-if="toast" message="当前用药类型没有推荐药房" />
    </div>
</template>

<script>
import pharmacylist from './PharmacyList.vue'
import { mapState, mapActions } from 'vuex'
import axios from "axios";
export default {
    name: 'ChoosePharmavy',

    data() {
        return {
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
        }
    },
    methods: {
        openpopup(position) {
            this[position + 'Popup'] = true;
            this.servers = [];
            this.typeindex2=0;
            let keys = Object.keys(this.pharmavyDatas.select);
            this.num = keys[0];//打开推荐其他药房时，默认选中第一个服务类型及当前类型下的供应商
            // console.log(keys);
            if (keys) {
                keys.forEach((item, index) => {
                    this.servers.push({ name: this.server[item], type: item })
                })
            } else {
                // console.log("无数据")
            }
            // console.log(this.$store.state.pharmavyData.default.serviceArr)
        },
        // 取消选择其他药房
        closepopup(position) {
            this[position + 'Popup'] = false
            this.defaults = this.pharmavyDatas.default
        },
        //保存选择的药房
        storePhar(position) {
            this[position + 'Popup'] = false
            console.log(this.defaults)

        },
        clickType(index, type) {
            this.num = type;
            this.typeindex2 = index;

        },
        choosePhar(index, item) {
            this.changedefaults(item)
            this.checkindex = index
            console.log(this.defaults, item)
        },
        chooseType(index) {
            this.typeindex(index)
            // this.typeindex = index
        },
        ...mapActions([
            'changedefaults',
            'typeindex'
        ]),


    },
    created() {

    },
    beforeMount() {
        // this.defaults = this.defaulte;
        // console.log("beforeMount")
        // console.log(this.defaults,this.defaulte)
    },
    mounted() {
        // console.log(this.defaults, this.pharmavyDatas)
    },
    beforeUpdate() {
        // console.log(this.defaults, this.defaulte)
    },
    updated() {
        // console.log("updated")
        // console.log(this.defaults)
        // console.log(this.defaults, this.pharmavyDatas)
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

        }),
        serviceArrDefault() {
            let server = {
                1: '代煎代送',
                2: '自煎代送',
                3: '代煎自取',
                4: '自取',
                5: '送货上门',
                6: '货到付款'
            };
            let arr = [],
                serviceArr = this.defaults.serviceArr;
            if (serviceArr) {
                serviceArr.forEach((item, index) => {
                    arr.push(server[item])
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
  margin-top: 10px;
  padding: 5px 10px;
  display: flex;
  border: 1px solid #ccc;
  width: 95%;
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
</style>