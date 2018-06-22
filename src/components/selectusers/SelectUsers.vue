<template>
    <div class="selectusers" :style="{height:height+'px'}">
        <mu-flexbox class="search">
            <mu-flexbox-item>
                <mu-text-field hintText="请输入手机号码" v-model="userNum" type="number" ref="inputs" />
            </mu-flexbox-item>
            <mu-flexbox-item @click.native="search" class="ceshise">
                <mu-raised-button label="搜索" secondary />
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-divider/>
        <mu-row gutter class="users" v-if="searcjs">
            <mu-col width="50" v-for="(item,index) in userLists" :key="index">
                <mu-raised-button id="userse" :label="item|username" :secondary="active==index" @click="chooseUser(index,item)" :data-uid="item.id" />
            </mu-col>
            <mu-col width="50">
                <mu-raised-button label="新增" labelPosition="before" icon="add" @click.native="addNew()" />
            </mu-col>
        </mu-row>

        <mu-row gutter class="new" v-if="news">
            <mu-col width="100">
                <mu-flat-button label="新增用户" class="addnews" />
            </mu-col>
            <mu-col width="100">
                <mu-row gutter>
                    <mu-col width="30">
                        <mu-content-block>
                            姓名
                        </mu-content-block>
                    </mu-col>
                    <mu-col width="70">
                        <mu-text-field hintText="请输入姓名" v-model="uname" />
                    </mu-col>
                </mu-row>
                <mu-row gutter>
                    <mu-col width="30">
                        <mu-content-block>
                            性别
                        </mu-content-block>
                    </mu-col>
                    <mu-col width="70">

                        <select name="" id="" class="denger" v-model="sex">
                            <option value="1">男</option>
                            <option value="2">女</option>
                        </select>
                    </mu-col>
                </mu-row>

                <mu-row gutter>
                    <mu-col width="30">
                        <mu-content-block>
                            年龄
                        </mu-content-block>
                    </mu-col>
                    <mu-col width="35">
                        <mu-text-field hintText="请输入年龄" v-model="userYear" type="number" />
                    </mu-col>
                    <mu-col width="35">

                        <select name="" id="" class="denger years" v-model="dataBase">
                            <option value="365">岁</option>
                            <option value="30">个月</option>
                        </select>
                    </mu-col>
                </mu-row>
            </mu-col>
        </mu-row>
        <mu-raised-button label="下一步" secondary class="footer" @click="nextStep" />
        <mu-toast v-if="toast" :message="toastMsg" @close="hideToast" />
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment"
import Qs from 'qs'
import { mapState, mapActions } from 'vuex'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            searcjs: false,
            news: false,
            userNum: '',
            userLists: [],
            toast: false,
            toastMsg: '',//吐司的msg
            active: 0,
            isAdd: 0,
            uid: 0,
            uname: '',
            userYear: '',
            sex: 1,
            dataBase: 365,
            users: {},
            height: window.screen.height,
        }
    },
    filters: {
        username(item) {
            return item.usename + "   " + item.sex2 + "  " + item.age
        }
    },
    methods: {
        chooseUser(index, item) {
            this.active = index;
            this.isAdd = 0;
            this.uid = item.id;
            this.users = item;
        },

        signCFFF() {
            let params = {
                // "test": 1
            }
            axios.post('?do=repeatOrder', Qs.stringify(params))
                .then((res) => {
                    if (res.data.code) {
                        console.log(res.data)
                        this.repeatOrder(res.data)
                        // console.log(res.data.data)
                        // 重方：为原用户提供相同的用药建议，所有的信息都有（病症，用药时间，医嘱）
                        // 复方：为新用户提供相同的用药建议，除了用户信息，其他信息都有
                        // 如果有用户信息  为重方
                        if (res.data.cfORff == "cf") {
                            console.log("重方")
                            this.pharmavyData({
                                type: res.data.data.orderInfo.drug_type,
                                sid: res.data.data.orderInfo.supplier_id,
                                give_type: res.data.data.orderInfo.give_type
                            })
                            // console.log(res.data.data.userInfo)
                            let orther = res.data.data.userInfo.orther;
                            this.searcjs = true;
                            this.userLists = orther;//渲染所有数据

                            let defaultUserName = res.data.data.userInfo.default.usename;
                            let ortherUserName = res.data.data.userInfo.orther.map((item) => {
                                return item.usename;
                            });
                            let len = ortherUserName.indexOf(defaultUserName);
                            console.log(len)
                            this.active = len;
                            // 设置一些初始化的默认值
                            this.userNum = orther[len].mobile;
                            this.uid = orther[len].id;


                        } else {
                            console.log("复方")
                        }
                        // console.log("重方复方")
                    } else {
                        console.log("正常开方，不作特殊操作")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.showToast('连接服务器失败！');
                });
        },
        search() {
            this.searcjs = true;
            // this.news = false;
            let _this = this,
                param = new FormData();
            if (!(/^1[345789]\d{9}$/.test(_this.userNum))) {
                this.showToast('请输入正确的手机号码！');
                _this.$refs.inputs.focus()
            } else {
                param.append('tel', _this.userNum);
                axios.post('?do=searchuser',
                    param
                ).then((res) => {
                    console.log(res.data)
                    if (res.data.succ) {

                        _this.userLists = res.data.sec;

                        _this.searcjs = true;
                        _this.news = false;
                        _this.uid = res.data.sec[0].id
                    } else {
                        _this.showToast(res.data.msg);
                    }

                }).catch((err) => {
                    console.log(err);
                    _this.showToast('连接服务器失败');
                });
            }
        },
        addNew() {
            this.searcjs = false;
            this.news = true;
            this.isAdd = 1;
            this.uid = ''
        },
        chooseData(val) {
            console.log(val)
        },
        nextStep() {
            let _this = this,
                param = new FormData(),
                birthday = moment(moment().subtract(this.userYear * this.dataBase, 'day').calendar()).format('YYYYMMDD');
            param.append('uid', this.uid);
            param.append('isAdd', this.isAdd);
            param.append('tel', this.userNum);
            param.append('uname', this.uname);
            param.append('birthday', birthday);
            param.append('sex', this.sex);
            axios.post('?do=saveUserInfo',
                param
            ).then((res) => {
                if (res.data.code == 1) {
                    let str = '';
                    if (this.dataBase == 365) {
                        str = this.sex + "岁"
                    } else {
                        str = this.sex + "个月"
                    }
                    if (this.uname) {
                        //如果是新增用户
                        this.userinfo({
                            username: this.uname,
                            age: this.userYear,
                            sex: str
                        });
                    } else {
                        if (!this.users.usename) {
                            //没有点击，选择默认第一个
                            console.log(this.userLists)
                            this.userinfo({
                                username: this.userLists[0].usename,
                                age: this.userLists[0].age,
                                sex: this.userLists[0].sex2
                            });
                        } else {
                            // 点击选择其他患者
                            this.userinfo({
                                username: this.users.usename,
                                age: this.users.age,
                                sex: this.users.sex2
                            });
                        }
                    }
                    this.$router.push({ path: '/schemetype' })
                } else if (res.data.code == 0) {
                    this.showToast(res.data.msg);
                }
            }).catch((err) => {
                this.showToast('连接服务器失败');
            })
            setTimeout(() => {

                console.log(this.userinfos)
            }, 100)
            console.log(this.userLists)
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
        ...mapActions([
            'userinfo',
            'repeatOrder',
            'pharmavyData'

        ]),
    },
    mounted() {
        this.signCFFF();
        let height = window.screen.height;
        this.height = height;
        console.log(height)

    },
    computed: {
        ...mapState({
            userinfos: state => state.userinfo
        })
    }
}
</script>
<style  lang="less">
.selectusers{
    background: #f8f8f8
}
.search .mu-text-field-content {
  margin-top: 12px !important;
}
.search .mu-raised-button-label {
  padding-right: 0px;
  padding-left: 0px;
}
.search .mu-raised-button {
  height: 30px;
}
.selectusers .footer {
  position: fixed;
  bottom: 35px;
  width: 40%;
  left: 50%;
  margin-left: -20%;
}
.new .mu-text-field-input {
  border-bottom: 1px solid #999;
}
.new .mu-text-field-focus-line {
  height: 2px;
}
.new .row {
  align-items: center;
  padding: 0 40px;
}
.new .mu-content-block {
  padding-left: 0 !important;
}
.new .mu-text-field {
  width: auto;
}
.new .mu-text-field-hint {
  text-align: left;
  padding-left: 5px;
}
#userse .mu-raised-button-wrapper .mu-raised-button-label {
  padding-right: 0px;
  padding-left: 0px;
}
</style>

<style scoped lang="less">
.addnews {
  margin: 15px 0;
}
.years {
  margin-top: -5px;
}
.denger {
  width: 100%;
  text-align: right;
  height: 28px;
  border: 0;
  border-bottom: 1px solid #999;
  outline: none;
  background: #fff;
}
.denger option {
  outline: none;
}
.selectusers .mu-text-field-hint {
  text-align: left;
}
.selectusers {
  .search {
    padding: 0 20px;
    height: 47px;
    background:#fff
  }

  .mu-raised-button {
    min-width: 55px;
  }
  .mu-flexbox .mu-flexbox-item {
    width: auto;
  }
  .users {
    padding: 0 20px;
    .mu-flexbox-item {
      margin-left: 0 !important;
      margin-top: 10px !important;
      display: flex;
      justify-content: center;
    }
    .ddd {
      width: 50%;
      .mu-raised-button {
        min-width: 120px;
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
.users {
  padding: 0 15px;
  .mu-raised-button {
    min-width: 165px;
    margin-top: 15px;
  }
}
</style>