<template>
    <div class="ChoosePharmavy">
        <!-- 推荐药房的弹出 -->
        <mu-flexbox class="disease_name proposal " orient="horizontal">
            <mu-content-block>推荐药房</mu-content-block>
            <mu-raised-button class="demo-raised-button" label="推荐其他药房" @click="openpopup('bottom')" />
        </mu-flexbox>
        <!-- <pharmacylist :text="pharmavyDatas.default"></pharmacylist> -->
        <div class="pharmacylist" >
            <img src="../../assets/erweima.png" alt="">
            <div>
                <span>{{pharmavyDatas.default.name}}</span>
                <span>{{pharmavyDatas.default.address}}</span>
            </div>
        </div>
        <mu-popup position="bottom" popupClass="recommended_pharmacy" :open="bottomPopup" @close="closepopup('bottom')">
            <mu-appbar title="推荐药房">
                <mu-flat-button slot="left" label="取消" color="white" @click="closepopup('bottom')" />
                <mu-flat-button slot="right" label="保存" color="white" @click="storePhar('bottom')" />
            </mu-appbar>
            <mu-flexbox orient="horizontal" wrap="wrap" class="dis_type">
                <mu-raised-button  v-for="(item,index ) in servers" :key="index"  :label="item.name" @click="clickType(item.type)"/>
            </mu-flexbox>
            <mu-list>
                <pharmacylist v-for="(item,index) in pharmavyDatas.select[num]" :text="item" :key="index" :class="{'actives':index ==checkindex }" @click.native="choosePhar(index)"></pharmacylist>
            </mu-list> 
        </mu-popup>
        <!-- 配送方式 -->
        <mu-flexbox orient="horizontal" class="dis_type">
            <mu-raised-button v-for="(item,index) in this.$store.getters.serviceArrDefault" :key="index" :label="item" />
 
        </mu-flexbox>

    </div>
</template>

<script>
import pharmacylist from './PharmacyList.vue'
import { mapState } from 'vuex'
import axios from "axios";
export default {
    name: 'ChoosePharmavy',

    data() {
        return {
            bottomPopup: false,
            checkindex: 0,// 初始化第一个栏块高亮
            server:{
                1:'代煎代送',
                2:'自煎代送',
                3:'代煎自取',
                4:'自取',
                5:'送货上门',
                6:'货到付款',
                '-1':'门店结算'
            },
            servers:[],//选中的服务类型
            // yiList:this.pharmavyDatas.select,
            num:1,
        }
    },
    methods: {
        openpopup(position) {
            this[position + 'Popup'] = true;
            this.servers=[];
            let keys = Object.keys(this.pharmavyDatas.select);
            // console.log(obj);
            keys.forEach((item,index)=>{
                this.servers.push({name:this.server[item],type:item})
            })
            // console.log(this.$store.state.pharmavyData.default.serviceArr)
            console.log(this.$store.getters.serviceArrDefault)

        },
        closepopup(position) {
            this[position + 'Popup'] = false
        },
        storePhar(position) {
            this[position + 'Popup'] = false
        },
        clickType(type){
            console.log(type)
            this.num=type;
        },
        choosePhar(index){
            console.log(index)
        }

    },
    mounted() {
        // this.yiList=
    },
    components: {
        pharmacylist,


    },
    computed: {
        // 全局共享的数据
        ...mapState({
            pharmavyDatas: state => state.pharmavyData,

        })
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
.ChoosePharmavy{
    width:100%;
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