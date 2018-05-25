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
            <mu-flexbox orient="horizontal" class="dis_type">
                <mu-raised-button label="代煎代送" />
                <mu-raised-button label="自取" />
                <mu-raised-button label="代煎自取" />
            </mu-flexbox>
            <!-- <mu-list>
                <pharmacylist v-for="(item,index) in pharmavyDatas.select" :text="item" :key="index" :class="{'actives':index ==checkindex }" @click.native="choosePhar(index)"></pharmacylist>
            </mu-list> -->
        </mu-popup>
        <!-- 配送方式 -->
        <mu-flexbox orient="horizontal" class="dis_type">
            <mu-raised-button label="代煎代送" />
            <mu-raised-button label="自取" />
            <mu-raised-button label="代煎自取" />
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
            // datas2: [
            //     "三坊七巷", "四方气息", "五项气息"
            // ],
            // datas2:this.$store.state.pharmavyData.select,
            bottomPopup: false,
            // checkText:{},
            // pharmavyDatas:null,
            // checkText: {
            //     name: '中心药房',
            //     address: '中心药房的'
            // },//选择的药房
            checkindex: 0,// 初始化第一个栏块高亮
            // pharmavyDatasEng:{
                
            // }
        }
    },
    methods: {
        openpopup(position) {
            this[position + 'Popup'] = true;
            console.log(this.$store.state.pharmavyData)
            console.log(this.pharmavyDatas)
        },
        closepopup(position) {
            this[position + 'Popup'] = false
        },
        storePhar(position) {
            this[position + 'Popup'] = false
        },
        // choosePhar(index) {
        //     this.checkindex = index;
        //     console.log(this.datas2[index])
        //     this.checkText = this.datas2[index]
        // },
        // getDatas() {
        //     let _this = this;
        //     let url = 'http://w.i.htyy.com/doctor_ajax.php?do=getSupByTYPE&type=1'
        //     axios
        //         .get(url)
        //         .then(function (res) {
        //             console.log(res.data.data)
        //             if (res.data.code == 1) {
        //                 _this.pharmavyDatasEng=res.data.data
        //                 // commit('PHARMAVT_DATA', res.data.data)
        //             } else {
        //                 // _this.showToast(res.data.msg);
        //             }
        //         })
        //         .catch(function (err) {
        //             console.log(err);
        //         });
        // }
    },
    mounted() {
        // this.getDatas()
        // console.log(this.pharmavyDatasEng.default.name)
        // console.log(this.pharmavyDatas)
        // console.log(this.pharmavyDatas.default)
        // this.checkText=this.$store.state.pharmavyData.default
        // console.log(this.$store.state.pharmavyData)
        // console.log(this.pharmavyDatas)
        console.log(this.pharmavyDatas.default==true)
    },
    components: {
        pharmacylist,


    },
    computed: {
        // 全局共享的数据
        // pharmavyDatas() {
        //     return this.$store.state.pharmavyData
        // }
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