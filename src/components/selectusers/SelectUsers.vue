<template>
    <div class="selectusers">
        <mu-flexbox class="search">
            <mu-flexbox-item>
                <mu-text-field hintText="请输入手机号码" v-model="userNum" type="number" ref="inputs" />
            </mu-flexbox-item>
            <mu-flexbox-item @click.native="search">
                <mu-raised-button label="搜索" secondary/>
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-divider/>
        <mu-row gutter class="users" v-if="searcjs">
            <mu-col width="50" v-for="(item,index) in userLists" :key="index">
                <mu-raised-button :label="item|username" :primary="true" :secondary="active==index" @click="chooseUser(index,item.id)" :data-uid="item.id" />
            </mu-col>
            <mu-col width="50">
                <mu-raised-button label="新增" labelPosition="before" icon="add" primary @click.native="addNew()" />
            </mu-col>
        </mu-row>

        <mu-row gutter class="new" v-if="news">
            <mu-col width="100">
                <mu-flat-button label="新增用户" class="addnews" />
            </mu-col>
            <mu-col width="100">
                <!-- <mu-row gutter>
                    <mu-col width="30">
                        <mu-content-block>
                            手机号
                        </mu-content-block>
                    </mu-col>
                    <mu-col width="70">
                        <mu-text-field hintText="请输入手机号" />
                    </mu-col>
                </mu-row> -->
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
        }
    },
    filters: {
        username(item) {
            return item.usename + "   " + item.sex2 + "  " + item.age
        }
    },
    methods: {
        chooseUser(index, uid) {
            this.active = index;
            this.isAdd = 0;
            this.uid = uid
        },
        search() {
            this.searcjs = true;
            // this.news = false;
            let _this = this,
                param = new FormData();
            if (!(/^1[345789]\d{9}$/.test(_this.userNum))) {
                _this.showToast('请输入正确的手机号码！');
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
                birthday = moment(moment().subtract(_this.userYear * _this.dataBase, 'day').calendar()).format('YYYYMMDD');
            param.append('uid', _this.uid);
            param.append('isAdd', _this.isAdd);
            param.append('tel', _this.userNum);
            param.append('uname', _this.uname);
            param.append('birthday', birthday);
            param.append('sex', _this.sex);
            axios.post('?do=saveUserInfo',
                param
            ).then((res) => {
                console.log(res.data)
                if (res.data.code == 1) {
                    this.$router.push({ path: '/schemetype' })
                } else if (res.data.code == 0) {
                    _this.showToast(res.data.msg);
                }
            }).catch((err) => {
                _this.showToast('连接服务器失败');
            })
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
    }
}
</script>
<style  lang="less">
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
.footer {
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
    min-width: 145px;
    margin-top: 15px;
  }
}
</style>