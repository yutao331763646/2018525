<template>
    <div class="schemetype">
        <mu-list @click.native="toggle()" v-if="historystore">
            <mu-list-item title="调用历史方案" describeText="您已为他开过建议，可在此基础上调整">
                <mu-icon value="keyboard_arrow_right" slot="right" />
            </mu-list-item>
        </mu-list>
        <mu-drawer right :open="open" @close="toggle()">
            <mu-appbar title="历史方案">
                <mu-icon-button icon="keyboard_arrow_left" slot="left" @click.native="open=false" />
                <mu-icon-button icon="" slot="right" />
            </mu-appbar>
            <mu-flexbox orient="vertical">
                <mu-list class="pricelist" v-for="(item,index) in pricelist" :key="index" @click.native="goProposalHis(item.id)">
                    <mu-list-item :title="'订单：'+item.code" :afterText="item.drug_type" class="title" />
                    <mu-divider/>
                    <mu-list-item class="list">
                        <span>用户：</span>
                        <span>{{item.usename}} {{item.sex}} {{item.birthday}}</span>
                    </mu-list-item>
                    <mu-list-item class="list">
                        <span>病症：</span>
                        <span>{{item.norm_disease}}</span>
                    </mu-list-item>
                    <mu-list-item class="list">
                        <span>医嘱：</span>
                        <span>{{item.taboo}}</span>
                    </mu-list-item>
                </mu-list>
            </mu-flexbox>
        </mu-drawer>
        <mu-divider/>
        <mu-flexbox wrap="wrap" :gutter=0 class="type">
            <!-- 药品类型 -->
            <mu-flexbox-item v-for="(item,index) in typedata" :key="index" @click.native="chooseType(index,item.type)">
                <mu-raised-button :label="item.name" :secondary="item.type==typeindex" class="choseetpe" />
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="tuijya">
            <!-- 推荐药房及弹出层 -->
            <ChoosePharmavy @pinkageSupze="pinkageSupzet" @peisong="peisongs" />
        </mu-flexbox>
        <mu-flexbox class="nextstep" @click.native="goProposal">
            <!-- 跳到开方页面 -->
            <mu-raised-button label="下一步" class="netstep" secondary :disabled="disableds" />
        </mu-flexbox>
        <mu-toast v-if="toast" :message="toastMsg" @close="hideToast" />
    </div>
</template>

<script>
import ChoosePharmavy from '../publiccomponents/ChoosePharmavy.vue'
import axios from "axios";
import Qs from 'qs'
import { mapState } from 'vuex'

import { mapActions } from 'vuex'
import { setTimeout } from 'timers';
export default {
    name: 'App',
    data() {
        return {
            typedata: [
                // {
                //     type: 1,
                //     name: '中药饮片'
                // },
                // {
                //     type: 2,
                //     name: '颗粒剂'
                // },
                // {
                //     type: 3,
                //     name: '膏方'
                // }, {
                //     type: 4,
                //     name: '预包装商品'
                // },
                // {
                //     type: 5,
                //     name: '颗粒剂包装'
                // }, {
                //     type: -1,
                //     name: '拍照'
                // },
            ],
            open: false,
            toast: false,
            toastMsg: '',//吐司的msg
            pricelist: [],//历史方案列表
            types: 1,
            peisonged: 1,
            historystore: true
        }
    },
    methods: {
        signCFFF() {
            if (!this.repeatOrder.data) {
                this.pharmavyData({ type: 1, sid: '' });
                // console.log("正常流程")
            } else {
                this.historystore = false
                // console.log("重方")
                this.pharmavyData({
                    type: this.repeatOrder.data.orderInfo.drug_type,
                    sid: this.repeatOrder.data.orderInfo.supplier_id,
                    give_type: this.repeatOrder.data.orderInfo.give_type
                })

                
                this.types=this.repeatOrder.data.orderInfo.drug_type
                this.peisonged=this.repeatOrder.data.orderInfo.give_type
                // console.log(this.repeatOrder)
                // console.log(this.defaultsed)
                // console.log(this.repeatOrder.data.orderInfo.drug_type)

            }


        },
        peisongs(val) {
            this.peisonged = val
            // console.log(val)
        },
        chooseType(index, type) {
            this.types = type;
            this.pharmavyData({ type: type, sid: '' });



        },
        goProposalHis(id) {
            console.log(id)
            let params = {
                orderId: id
            }
            axios.post('?do=historyOrderInfo', Qs.stringify(params))
                .then((res) => {
                    console.log(res.data)
                    if(res.data.code==1){

                        this.pharmavyData({
                            type: res.data.data.orderInfo.drug_type,
                            sid: res.data.data.orderInfo.supplier_id,
                            give_type: res.data.data.orderInfo.give_type
                        })
                        this.$router.push({ path: '/propsal',query:{id:id} })
                    }else{
                        this.showToast(res.data.msg);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        goProposal() {
            let params2 = {
                type: this.types,
                supplier_id_default: this.defaultsed.supplier_id,
                supplier_select_service: this.peisonged

            }

            if (this.disableds) {
                console.log("其他")
            } else {
                axios.post('?do=beforePrescribe', Qs.stringify(params2))
                    .then((res) => {
                        // console.log(res.data)
                        if (res.data.code == 1) {
                            this.$router.push({ path: '/propsal' })
                        } else {
                            this.showToast(res.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        toggle() {
            // console.log("获取用户的历史订单")
            let _this = this;
            axios.get('?do=getUserOrderInfo')
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        _this.open = !_this.open;
                        _this.pricelist = res.data.data;
                        console.log(_this.pricelist)
                    } else {
                        _this.showToast(res.data.msg);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        },
        showToast(msg) {
            this.toast = true
            this.toastMsg = msg
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        },
        hideToast() {
            this.toast = false
            if (this.toastTimer) clearTimeout(this.toastTimer)
        },
        initGetData() {
            let _this = this;
            axios.get('?do=gainTypes')
                .then((res) => {
                    // console.log(res)
                    if (res.data.code == 1) {
                        _this.typedata = res.data.data

                    } else {
                        _this.showToast('服务器出错');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        pinkageSupzet(bool) {
            // console.log(bool)
            this.pinkageSupz = bool
            // console.log("是否显示" + this.pinkageSupz)
        },
        // serviceTypeto(item) {
        //     this.$emit('serviceTypee',item)

        // },
        ...mapActions([
            'pharmavyData',
            'type'
        ]),
    },
    mounted() {
        this.initGetData();
        // this.pharmavyData(1);
        this.signCFFF();

    },
    updated() {
    },
    components: {
        ChoosePharmavy
    },
    computed: {
        // 全局共享的数据
        ...mapState({
            // pharmavyDatas: state => state.pharmavyData,
            disableds: state => state.disableds,
            typeindex: state => state.type,
            repeatOrder: state => state.repeatOrder,
            defaultsed: state => state.defaults,
        })
    }
}
</script>

<style  lang="less">
.schemetype {
  .mu-list {
    padding: 0;
  }
  .mu-item-title {
    text-align: left;
  }
  .mu-item-text {
    text-align: left;
  }
  .type {
    margin-bottom: 2px;

    .mu-flexbox-item {
      width: 50%;
      max-width: 3.2rem;
      height: 65px;
    }
    .mu-raised-button {
      width: 100%;
      border-radius: 0;
      height: 100%;
    }
  }
  .tuijya {
    padding: 0 20px;
  }
  .nextstep {
    display: flex;
    justify-content: center;
    margin: 10px 0 20px 0;
    .mu-raised-button-label {
      margin-right: 16px;
    }
    .mu-raised-button {
      min-width: 170px;
    }
  }
  .mu-drawer {
    width: 100%;
  }
  .pricelist {
    // padding: 0 20px;
    .title {
      padding: 0 20px;
      background: #ff4081;
      color: #fff;
      .mu-item-title {
        color: #fff;
      }
      .mu-item-after {
        color: #fff;
      }
    }
    .list {
      padding: 0 20px;
      .mu-item-content {
        display: flex;
        span {
          display: block;
          min-width: 50px;
        }
      }
    }
  }
  .mu-toast {
    height: 39px;
    width: auto;
    position: fixed;
    left: 50%;
    bottom: 350px;
    margin-left: -20%;
    line-height: 39px;
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
