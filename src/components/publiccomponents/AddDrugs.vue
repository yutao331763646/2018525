<template>
    <div class="addgrugs">
        <mu-appbar title="添加方案">
            <!-- <mu-icon-button icon="keyboard_arrow_left" slot="left" @click.native="closeFang()" /> -->
             <mu-flat-button slot="left" label="常用方" color="white" @click="storeChang()" />
            <mu-flat-button slot="right" label="保存" color="white" @click="storeFang()" />
        </mu-appbar>
        <div class=editdrug>
            <ul class="lists">
                <li class="list" v-for="(item,index) in drugNameOkLists" :key="index">

                    <div class="name">
                        <!-- <span class="delete">7</span> -->
                        <mu-icon value="remove_circle" color="red" class="delete" :size="18" @click="deletedrug(index)"/>
                        <div>
                            <span @click="chooseType(index,item.type)">{{item.name}}</span>
                            <span class="jftype">{{item.type}}</span>
                        </div>
                    </div>
                    <div>
                        <div class="custom_cuisorw">
                            <span>{{item.num}}</span>
                            <span>{{item.unit}}</span>
                        </div>
                    </div>
                </li>

                <li class="list">
                    <div class="edit">
                        <!-- <mu-icon value="remove_circle" color="red" :size="18" /> -->
                        <span v-if="drugNameOk">{{drugNameOks.name}}</span>
                        <mu-dialog :open="choosetype" title="请选择煎法" @close="choosetypecloseqx">
                            <mu-flexbox wrap="wrap">
                                <mu-raised-button v-for="(item,index) in typeLists" :key="index" :label="item" class="type" :class="{'active':index==typeactive}" @click="chooseTypeOk(item,index)" />
                            </mu-flexbox>
                            <mu-flat-button slot="actions" @click="choosetypecloseqx" primary label="取消" />
                            <mu-flat-button slot="actions" primary @click="choosetypecloseqd" label="确定" />
                        </mu-dialog>
                        <div class="hint_input">
                            <span class="drugname" v-if="drugNameJpShow">{{drugNameJp}}</span>
                            <span class="custom_cuisor" v-if="customCuisor"></span>
                            <span v-if="drugNameJpremind">请输入药材简拼</span>
                        </div>
                    </div>
                    <div>
                        <div class="custom_cuisorw" v-if="drugunitShow">
                            <span>{{drugunitNum}}</span>
                            <span class="custom_cuisor" v-if="customCuisorNum"></span>
                            <span>{{drugNameOks.unit}}</span>
                        </div>
                        <!-- <mu-icon value="add_circle" color="red" :size="18" /> -->
                    </div>
                </li>

            </ul>
            <div class="druglistswiper">
                <ul>
                    <li v-for="(item,index) in drugListChoose" :key="index" @click="drugOk(item)">
                        <span>{{item.name}}</span>
                        <span>{{item.sprice+"元 / "+item.unit}}</span>
                    </li>

                </ul>
            </div>
            <mu-flexbox wrap="wrap" class="keyboard_en" v-if="keyboardEn">
                <mu-flexbox>
                    <mu-raised-button v-for="(item,index) in keyboardEn1" :key="index" :label="item" @click="inputEn(item)" />
                </mu-flexbox>
                <mu-flexbox>
                    <mu-raised-button v-for="(item,index) in keyboardEn2" :key="index" :label="item" @click="inputEn(item)" />
                </mu-flexbox>
                <mu-flexbox>
                    <mu-raised-button icon="keyboard_hide" style="width:.65rem" />
                    <mu-raised-button v-for="(item,index) in keyboardEn3" :key="index" :label="item" @click="inputEn(item)" />
                    <mu-raised-button icon="backspace" backgroundColor="#a4c639" style="width:0.65rem" @click="deleteInputEn" />
                </mu-flexbox>
            </mu-flexbox>
            <mu-flexbox wrap="wrap" orient="vertical" class="keyboard_ch" v-if="keyboardCh">
                <mu-flexbox orient="horizontal" order="1">
                    <mu-flexbox orient="vertical" class="left_num">
                        <mu-flexbox orient="horizontal">
                            <mu-raised-button v-for="(item,index) in num123" :key="index" :label="item" class="num" @click="inputNum(item)" />
                        </mu-flexbox>
                        <mu-flexbox orient="horizontal">
                            <mu-raised-button v-for="(item,index) in num456" :key="index" :label="item" class="num" @click="inputNum(item)" />
                        </mu-flexbox>
                    </mu-flexbox>
                    <mu-flexbox class="backspacech">
                        <mu-raised-button icon="backspace" @click="deleteNum" />
                    </mu-flexbox>
                </mu-flexbox>
                <mu-flexbox orient="horizontal" order="1">
                    <mu-flexbox orient="vertical" class="left_num">
                        <mu-flexbox orient="horizontal">
                            <mu-raised-button v-for="(item,index) in num789" :key="index" :label="item" class="num" @click="inputNum(item)" />
                        </mu-flexbox>
                        <mu-flexbox orient="horizontal">
                            <mu-raised-button label="." class="num" @click="inputNum('.')" />
                            <mu-toast v-if="toast" message="请输入正确格式" @close="hideToast" />
                            <mu-raised-button label="0" class="num" @click="inputNum('0')" />
                            <mu-raised-button icon="keyboard_hide" class="num" />
                        </mu-flexbox>
                    </mu-flexbox>
                    <mu-flexbox class="backspacech">
                        <mu-raised-button label="确认" class="numOkl" :class="{numOklActive:numOklActive}" @click="inputNumOk()" />
                    </mu-flexbox>
                </mu-flexbox>
            </mu-flexbox>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            drugs: [],//药品库
            drugunit: '',//添加方案时的药的单位
            // diseaseNamecs: '',//病症名
            // openDiseaseListcs: false,//搜索病症的下拉
            // diseasescs: ["111", "222", "ddd"],//模糊查询返回的结果
            // actives: [],
            keyboardEn1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            keyboardEn2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
            keyboardEn3: ["Z", "X", "C", "V", "B", "N", "M"],
            drugNameJp: '',//搜索药品时输入的简拼
            drugNameJpremind: true,//搜索药品时输入的简拼的提醒文字
            drugListChoose: [],//用户输入简码之后，筛选出来的药品
            drugNameOk: false,//
            drugNameOks: {},//选中的药
            customCuisor: true,//光标
            drugNameJpShow: true,//简拼
            drugunitShow: false,//单位
            keyboardEn: true,//英文键盘
            keyboardCh: false,//数字键盘
            num123: ["1", "2", "3"],
            num456: ["4", "5", "6"],
            num789: ["7", "8", "9"],
            customCuisorNum: true,//数字键盘的模拟光标
            drugunitNum: '',//药品输入的量
            numOklActive: false,//数字确认键的高亮	
            toast: false,
            drugNameOkLists: [],//确定重量之后的药品列表 
            typeLists: ['无', '先煎', '后下', '烊化', '包煎', '另煎(炖)', '研末', '分冲', '研末包煎', '捣碎'],
            choosetype: false,//选择煎法
            // decoctingmethod:'',//煎法
            clickIndex: 0,//选择煎法时，被点的第几个
            choosedType: '',//选择的煎法，下一个为确定或者取消
            typeactive: 0,
            daddddddddd: []
        }
    },
    methods: {
        inputEn(val) {
            //  this.drugNameJp=''
            this.drugNameJpShow = true;
            this.drugNameJpremind = false;
            this.drugNameJp += val;
            this.drutMatching(this.drugNameJp);
            // console.log(val)
            // console.log(this.drugNameJp)

        },
        deleteInputEn() {
            this.drugNameJp = this.drugNameJp.substring(0, this.drugNameJp.length - 1);
            if (this.drugNameJp.length == 0) this.drugNameJpremind = true;
            this.drutMatching(this.drugNameJp);

        },
        // 药品的模糊匹配
        drutMatching(val) {
            let [arrEn, arrFinal] = [[], []];

            this.drugs.forEach(item => {
                arrEn.push(item.smple_code.indexOf(val.toLowerCase()))
            })
            this.drugs.forEach((item, index) => {
                if (arrEn[index] != -1) {
                    arrFinal.push({ name: item.name, sprice: item.sprice, unit: item.unit });
                }
            })

            this.drugListChoose = arrFinal;
            if (!val) {
                this.drugListChoose = [];
            }
        },
        drugOk(val) {
            // console.log(val)
            this.drugNameJp = ''
            this.drugNameOk = true;
            this.drugNameOks = val;
            this.customCuisor = false;
            this.drugNameJpShow = false
            this.drugListChoose = [];
            this.drugunitShow = true;
            this.drugNameJpremind = false;
            this.keyboardEn = false
            this.keyboardCh = true
            this.customCuisorNum = true
        },
        showToast() {
            this.toast = true
            if (this.toastTimer) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
        },
        hideToast() {
            this.toast = false
            if (this.toastTimer) clearTimeout(this.toastTimer)
        },
        // 数字键的输入
        inputNum(val) {
            if (val == '.' && this.drugunitNum.length == 0) {//输入的第一个字符只能为数字，不能为.
                this.showToast()
                this.drugunitNum = ''
            } else {
                if (this.drugunitNum.length < 5) {
                    let str = this.drugunitNum + val;
                    let n = (str.split('.')).length - 1;
                    if (n > 1) {//只能出现一个.
                        this.showToast();
                    } else {
                        this.drugunitNum += val;
                    }
                };
                if (this.drugunitNum.length > 0) {//有输入时，确认键高亮
                    this.numOklActive = true;
                } else {
                    this.numOklActive = false;
                }
            }

        },
        // 删除数字
        deleteNum() {
            this.drugunitNum = this.drugunitNum.substring(0, this.drugunitNum.length - 1);
            if (this.drugunitNum.length > 0) {
                this.numOklActive = true;
            } else {
                this.numOklActive = false;
            }
        },
        inputNumOk() {
            // console.log("确认")
            if (this.numOklActive) {
                this.drugNameOkLists.push({ name: this.drugNameOks.name, num: this.drugunitNum, unit: this.drugNameOks.unit, type: '' })
                // console.log(this.drugNameOkLists);

            }


            this.customCuisor = true;//简拼的光标显示
            this.drugNameJpremind = true;//显示  '请输入键盘'
            this.drugNameOk = false;//药品隐藏
            this.customCuisorNum = false;
            this.drugunitNum = '';
            this.keyboardCh = false;
            this.keyboardEn = true
            // console.log(this.$store.state.datas)
        },


        // 获取药品数据
        getDrugsData() {
            let _this = this;
            // axios.get('/HTYY/WeiXin/Redis.php?drug=drug&sId=159101')
            //     .then(function (res) {
                
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });
        },
        // 打开选择煎法弹出
        chooseType(index, val) {
            // console.log(index, val)
            this.choosetype = true
            this.clickIndex = index;
            // 当前是什么煎法，打开选择煎法弹窗时，什么煎法就高亮
            let x = this.typeLists.indexOf(val);
            console.log(x)
            if (x == -1) {
                this.typeactive = 0;
            } else {
                this.typeactive = x;
            }
        },
        // 选择煎法取消
        choosetypecloseqx() {
            this.choosetype = false
        },
        // 选择一个煎法
        chooseTypeOk(val, index) {
            this.typeactive = index;
            if (val == '无') {
                this.choosedType = ''
            } else {
                this.choosedType = val;
            }
        },
        // 选择煎法确定
        choosetypecloseqd() {
            this.choosetype = false
            if (this.typeactive == 0) {
                this.drugNameOkLists[this.clickIndex].type = ''
            } else {
                this.drugNameOkLists[this.clickIndex].type = this.typeLists[this.typeactive]
            }
        },
         deletedrug(index){
            console.log(index)
            this.drugNameOkLists.splice(index,1)
        },
        ...mapActions([
            'adddatas2'
        ]),
        // 取消保存方案
        // closeFang() {
        //     this.daddddddddd=this.$store.state.datas2
        //     console.log("取消保存方案")
        //     this.$store.dispatch('istrue', false)
        //     this.adddatas2(this.$store.state.datas2)
        //     console.log(this.$store.state.datas2)
        // },
        storeFang() {
            console.log("保存方案")
            this.$store.dispatch('istrue', false)
            this.adddatas2(this.drugNameOkLists)
        },
       
    },
    mounted() {
        this.getDrugsData();
    },
    computed: {

    }
}
</script>
<style  lang="less">
.keyboard_en .mu-raised-button {
  min-width: 0;
  height: 0.6rem;
  width: 0.47rem;
  border-radius: 4px;
}

.keyboard_en .mu-raised-button-label {
  padding-right: 0;
  padding-left: 0;
}

.drugname {
  color: #333;
}

.druglistswiper {
  position: fixed;
  bottom: 2.8rem;
  width: 100%;
  overflow-x: auto;
  background: #fff;
  ul {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      padding: 0 0.2rem;
      height: 100%;
      height: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        display: block;
        white-space: nowrap;
        text-align: center;
      }
    }
  }
}

.druglistswiper::-webkit-scrollbar {
  display: none;
}

.druglistswiper ul::-webkit-scrollbar {
  display: none;
}

.keyboard_ch {
  width: 100%;
  height: 3.2rem;
  position: fixed;
  bottom: 0;
  .num {
    width: 1.6rem;
    height: 0.8rem;
    font-size: 24px;
  }
  .backspacech {
    width: 2.2rem;
    height: 100%;
    .mu-raised-button {
      flex: 1;
      height: 1.6rem;
      border-radius: 0;
    }
  }
}

.left_num {
  width: 5.4rem;
  height: 1.6rem;
}

.editdrug {
  width: 100%;
  background: #f7f7f7;
  .lists {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    .list {
      width: 2.9rem;
      min-height: 30px;
      background: #fff;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 5px;
      .custom_cuisorw {
        display: flex;
        align-items: center;
      }
      .name {
        display: flex;
        align-items: center;
        margin: 5px 0 5px 5px;
        .delete {
          color: red;
          display: block;
          margin-right: 3px;
        }
        div {
          span {
            display: block;
            line-height: 17px;
          }
          .jftype {
            font-size: 12px;
            color: red;
          }
        }
      }
      .edit {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 5px 0;
      }
      .custom_cuisor {
        display: block;
        width: 1px;
        height: 15px;
        background: red;
        margin-right: 2px;
        animation: customcuisor 0.75s;
        animation-iteration-count: infinite;
        span{
            &:last-of-type{
                display: block;
                margin-left: 5px
            }
        }
       
      }
    }
  }
}

.mu-dialog-body {
  .type {
    margin-bottom: 10px;
    margin-right: 10px;
    min-width: 0;
  }
  .active {
    background: red;
    color: #fff;
  }
}



@keyframes customcuisor {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.hint_input {
  display: flex;
  align-items: center;
  padding-left: 5px;
  color: #ccc;
}

.editdrug > .mu-flex-row {
  position: fixed;
  bottom: 0;
  height: 2.8rem;
  background: #eee;
  flex-direction: column;
  justify-content: center;
}

.editdrug > .mu-flex-row > .mu-flex-row:nth-of-type(1) {
  padding: 0 10px;
  justify-content: space-between;
}

.editdrug > .mu-flex-row > .mu-flex-row:nth-of-type(2) {
  margin: 8px 0;
  padding: 0 20px;
  justify-content: space-between;
}

.editdrug > .mu-flex-row > .mu-flex-row:nth-of-type(3) {
  padding: 0 10px;
  justify-content: space-between;
}

.numOkl {
  background: #ccc;
  color: #fff;
  font-size: 22px;
}

.numOklActive {
  background: red;
}

.mu-toast {
  height: 39px;
  width: 40%;
  position: fixed;
  left: 50%;
  bottom: 50px;
  margin-left: -20%;
  line-height: 39px;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>