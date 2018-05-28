<template>
    <div class="schemetype">
        <mu-list @click.native="toggle()">
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
                <mu-list class="pricelist" v-for="(item,index) in pricelist" :key="index" @click.native="goProposal">
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
                <mu-raised-button :label="item.name" :secondary="index==typeindex" />
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox class="tuijya">
            <!-- 推荐药房及弹出层 -->
            <ChoosePharmavy />
        </mu-flexbox>
        <mu-flexbox class="nextstep" @click.native="goProposal">
            <!-- 跳到开方页面 -->
            <mu-raised-button label="下一步" secondary :disabled="disableds" />
        </mu-flexbox>
        <mu-toast v-if="toast" :message="toastMsg" @close="hideToast" />
    </div>
</template>

<script>
import ChoosePharmavy from '../publiccomponents/ChoosePharmavy.vue'
import axios from "axios";
import { mapState } from 'vuex'

import { mapActions } from 'vuex'
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
            typeindex: 0,
            open: false,
            toast: false,
            toastMsg: '',//吐司的msg
            pricelist: [],//历史方案列表
        }
    },
    methods: {
        chooseType(index, type) {
            console.log(type)
            this.typeindex = index;
            let _this = this;
            this.pharmavyData(type);


        },
        goProposal() {
            this.$router.push({ path: '/propsal' })
            console.log(this.$store.state.pharmavyData)
        },
        toggle() {

            let _this = this;
            axios.get('http://w.i.htyy.com/doctor_ajax.php?do=getUserOrderInfo&uid=1447329')
                .then(function (res) {
                    console.log(res)
                    if (res.data.code == 1) {
                        _this.open = !_this.open;
                        _this.pricelist = res.data.data;
                        console.log(_this.pricelist)
                    } else {
                        _this.showToast(res.data.msg);
                    }
                })
                .catch(function (err) {
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
            axios.get('http://w.i.htyy.com/doctor_ajax.php?do=gainTypes')
                .then(function (res) {
                    // console.log(res)
                    if (res.data.code == 1) {
                        // console.log(res.data.data)
                        _this.typedata = res.data.data

                    } else {
                        _this.showToast('服务器出错');
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        ...mapActions([
            'pharmavyData'
        ]),
    },
    mounted() {
        this.initGetData();
        this.pharmavyData(1)
    },
    components: {
        ChoosePharmavy
    },
    computed: {
        // 全局共享的数据
        ...mapState({
            // 	pharmavyData: state => state.pharmavyData,
            disableds: state => state.disableds,
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
