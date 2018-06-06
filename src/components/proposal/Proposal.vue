<template>
    <div>
        <!-- <mu-appbar title="YuTao" class="topappbar">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" :size="52" />
			<mu-icon-button icon="add" slot="right" />
		</mu-appbar> -->
        <mu-flexbox orient=vertical class="content">
            <!-- 输入患者姓名及年龄性别 -->
            <mu-flexbox class="name proposal" orient="horizontal">
                <mu-flexbox-item grow="0.6">
                    <mu-content-block class="username">用户</mu-content-block>
                </mu-flexbox-item>
                <mu-flexbox-item grow="2.5">
                    <mu-auto-complete hintText="请输入患者姓名" fullWidth @input="handlechange1" />
                </mu-flexbox-item>
                <mu-flexbox-item grow="1" class="checknv proposal">
                    <mu-raised-button label="男" @click="dialog = true" icon="keyboard_arrow_down" labelPosition="before" rippleColor="red" />
                    <mu-dialog :open="dialog" title="请选择性别" @close="closenv">
                        <mu-list>
                            <mu-list-item title="男">
                                <mu-icon slot="left" value="perm_identity" />
                            </mu-list-item>
                            <mu-list-item title="女">
                                <mu-icon slot="left" value="face" />
                            </mu-list-item>
                        </mu-list>
                    </mu-dialog>
                </mu-flexbox-item>
                <mu-flexbox-item grow="1">
                    <mu-auto-complete hintText="年龄" fullWidth @input="handlechange1" />
                </mu-flexbox-item>
                <mu-flexbox-item grow="1" class="checkns proposal">
                    <mu-raised-button label="岁" @click="dialog2 = true" icon="keyboard_arrow_down" labelPosition="before" rippleColor="red" />
                    <mu-dialog :open="dialog2" title="请选择年龄" @close="close">
                        <mu-list>
                            <mu-list-item title="岁">
                                <mu-icon slot="left" value="looks_one" />
                            </mu-list-item>
                            <mu-list-item title="月">
                                <mu-icon slot="left" value="filter_1" />
                            </mu-list-item>
                        </mu-list>
                    </mu-dialog>
                </mu-flexbox-item>
            </mu-flexbox>
            <mu-divider/>
            <!-- 病症 -->

            <mu-flexbox wrap="wrap">
                <mu-chip v-for="(item,index) in actives" :key="index" @delete="diseaseClose(index)" showDelete style="line-height:26px;margin-right:10px;margin-top:5px;margin-bottom:5px">
                    {{item}}
                </mu-chip>
            </mu-flexbox>
            <mu-flexbox class="disease_name proposal" orient="horizontal">
                <div class="seach_disease">
                    <input type="text" placeholder="请输入病症名" @input="handleInputdiseasecs" v-model="diseaseNamecs" ref="diseaseFocuscs">
                    <ul v-if="openDiseaseListcs">
                        <li v-for="(item,index) in diseasescs" :key="index" @click="chooseDiseasecs(item)">{{item}}</li>
                    </ul>
                </div>
            </mu-flexbox>

            <mu-divider/>
            <!-- 方案补充收费 -->
            <mu-flexbox class="f_nob proposal" orient="horizontal" @click.native="dialog3 = true">
                <mu-content-block>方案补充收费</mu-content-block>
                <mu-raised-button class="demo-raised-button" :label="price" labelPosition="before" icon="keyboard_arrow_right" />
                <mu-dialog :open="dialog3" title="价格" @close="closefnob">
                    <mu-list>
                        <mu-list-item title="免费" @click="chooseonly('免费')">
                            <mu-icon slot="left" value="perm_identity" />
                        </mu-list-item>
                        <mu-list-item title="￥10" @click="chooseonly('￥10')">
                            <mu-icon slot="left" value="face" />
                        </mu-list-item>
                        <mu-list-item title="￥20" @click="chooseonly('￥20')">
                            <mu-icon slot="left" value="face" />
                        </mu-list-item>
                    </mu-list>
                </mu-dialog>
            </mu-flexbox>
            <mu-divider/>
            <!--用药建议标题 -->
            <mu-flexbox class="proposl proposal">
                <mu-content-block>用药建议： </mu-content-block>
                <mu-raised-button class="demo-raised-button" label="保存为经验方" @click="storeExpS" />
            </mu-flexbox>
            <mu-divider/>
        </mu-flexbox>
        <!-- 药品容器 -->
        <mu-flexbox class="drugslist">
            <drugslist v-for="(item,index) in datas2" :propss="item" :key="index"></drugslist>
            <!-- <drugslist></drugslist> -->
        </mu-flexbox>

        <!-- /*/*/*/*/*/*/*/*/*/*/* -->
        <mu-flexbox orient=vertical class="content">

            <!-- 添加方案按钮 -->
            <mu-flexbox class="add_af">
                <mu-raised-button label="添加方案" class="demo-raised-button" @click.native="openDrawerFang1" />
                <mu-drawer right :open="openDrawerFang" @close="toggle()" class="mudrawer">

                    <adddrugs></adddrugs>

                </mu-drawer>
            </mu-flexbox>

            <mu-divider/>
            <mu-flexbox orient="horizontal" class="proposal2">
                <!-- <div @click="picker">点我选择</div> -->
                <mu-content-block>共</mu-content-block>
                <mu-raised-button :label="data1num" @click="picker" icon="keyboard_arrow_down" labelPosition="before" rippleColor="red" />
                <mu-content-block>贴，</mu-content-block>
                <mu-raised-button :label="data2num" @click="picker" icon="keyboard_arrow_down" labelPosition="before" rippleColor="red" />
                <mu-content-block>日</mu-content-block>
                <mu-raised-button :label="data3num" @click="picker" icon="keyboard_arrow_down" labelPosition="before" rippleColor="red" />
                <mu-content-block>贴，分</mu-content-block>
                <mu-raised-button :label="data4num" @click="picker" icon="keyboard_arrow_down" labelPosition="before" rippleColor="red" />
                <mu-content-block>次服用</mu-content-block>
            </mu-flexbox>
            <mu-divider/>
            <!-- 医嘱 -->
            <mu-flexbox class="disease_name proposal yizhu" orient="horizontal" @click.native="toggle()">
                <mu-content-block>医嘱</mu-content-block>
                <mu-raised-button :label="yiZhu" labelPosition="before" icon="keyboard_arrow_right" />

            </mu-flexbox>
            <mu-divider/>
            <mu-drawer right :open="openDrawer" class="mudrawer">
                <mu-appbar title="医嘱">
                    <mu-icon-button icon="keyboard_arrow_left" slot="left" @click.native="openDrawer = false" />
                    <mu-flat-button slot="right" label="保存" color="white" @click="storeYi()" />
                </mu-appbar>
                <mu-list class="mulist">
                    <mu-text-field v-model="valueYi" hintText="服药时间、忌口与禁忌、用药注意事项等（药房和患者均可见）" fullWidth :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="6" :maxLength="1000" />
                    <mu-divider/>
                    <mu-checkbox label="存为常用医嘱" uncheckIcon="panorama_fish_eye" checkedIcon="check_circle" />
                    <mu-tabs :value="activeTab" @change="handleTabChange" class="mutabs">
                        <mu-tab value="ta1b1" icon="keyboard_hide" @active="yiZhuInput" />
                        <mu-tab value="tab2" title="快捷输入" />
                        <mu-tab value="tab3" title="常用医嘱" />
                    </mu-tabs>
                    <mu-divider class="tabline" />
                    <mu-flexbox v-if="activeTab === 'tab2'" orient='vertical'>
                        <mu-flexbox class="ftime" orient="horizontal">
                            <mu-content-block>服药时间</mu-content-block>
                        </mu-flexbox>
                        <!-- <mu-divider class="tabline" /> -->
                        <mu-flexbox wrap="wrap">
                            <mu-raised-button label="饭前一小时" class="time" @click="addTime('饭前一小时')" />
                            <mu-raised-button label="饭后一小时" class="time" @click="addTime('饭后一小时')" />
                            <mu-raised-button label="空腹服" class="time" @click="addTime('空腹服')" />
                            <mu-raised-button label="晨起服" class="time" @click="addTime('晨起服')" />
                        </mu-flexbox>
                        <mu-divider class="tabline" />
                        <mu-flexbox class="ftime" orient="horizontal">
                            <mu-content-block>忌口与禁忌</mu-content-block>
                        </mu-flexbox>
                        <mu-flexbox wrap="wrap">
                            <mu-raised-button label="无" class="time" />
                            <mu-raised-button label="忌辛辣" class="time" @click="addTaboo('忌辛辣')" />
                            <mu-raised-button label="忌油腻" class="time" @click="addTaboo('忌油腻')" />
                            <mu-raised-button label="忌生冷" class="time" @click="addTaboo('忌生冷')" />
                            <mu-raised-button label="忌烟酒" class="time" @click="addTaboo('忌烟酒')" />
                            <mu-raised-button label="忌发物" class="time" @click="addTaboo('忌发物')" />
                            <mu-raised-button label="忌荤腥" class="time" @click="addTaboo('忌荤腥')" />
                            <mu-raised-button label="忌酸涩" class="time" @click="addTaboo('忌酸涩')" />
                            <mu-raised-button label="忌刺激性食物" class="time" @click="addTaboo('忌刺激性食物')" />
                            <mu-raised-button label="忌敏性食物" class="time" @click="addTaboo('忌敏性食物')" />
                            <mu-raised-button label="忌难消化食物" class="time" @click="addTaboo('忌难消化食物')" />
                            <mu-raised-button label="备孕禁服" class="time" @click="addTaboo('备孕禁服')" />
                            <mu-raised-button label="怀孕禁服" class="time" @click="addTaboo('怀孕禁服')" />
                            <mu-raised-button label="经期停服" class="time" @click="addTaboo('经期停服')" />
                            <mu-raised-button label="感冒停服" class="time" @click="addTaboo('感冒停服')" />
                            <mu-raised-button label="忌与西药同服" class="time" @click="addTaboo('忌与西药同服')" />
                        </mu-flexbox>
                    </mu-flexbox>
                    <mu-flexbox v-if="activeTab === 'tab3'" orient="vertical">
                        <mu-content-block class="tab3_list" @click="addComm()">
                            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                        </mu-content-block>
                        <mu-content-block class="tab3_list" @click="addComm()">
                            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                        </mu-content-block>
                    </mu-flexbox>
                </mu-list>
            </mu-drawer>
            <!-- 购药前处方是否可见 -->
            <mu-flexbox class="disease_name proposal" orient="horizontal" @click.native="isitvisible">
                <mu-content-block>购药前处方是否可见</mu-content-block>
                <mu-raised-button class="demo-raised-button" label="不可见" labelPosition="before" icon="keyboard_arrow_right" />
                <mu-dialog :open="dialogisitvisible" title="购药前处方是否可见" @close="close">
                    <mu-list>
                        <mu-list-item title="可见" @click="chooseisitvisible('可见')"></mu-list-item>
                        <mu-list-item title="不可见" @click="chooseisitvisible('不可见')"></mu-list-item>
                    </mu-list>
                </mu-dialog>
            </mu-flexbox>
            <mu-divider/>
            <mu-flexbox>
                <mu-text-field hintText="输入备注" multiLine :rows="1" :rowsMax="6" fullWidth class="beizhu" />
            </mu-flexbox>
            <mu-divider/>
        </mu-flexbox>

        <mu-flexbox orient="vertical" class="tuijya">
            <!-- 推荐药房的弹出 -->
            <ChoosePharmavy />

            <!-- 价格列表 -->
            <mu-flexbox>
                <mu-list class="pricelist">
                    <mu-list-item title="费用明细" />
                    <mu-divider/>
                    <mu-list-item title="方案补充收费" afterText="￥0" />
                    <mu-divider/>
                    <mu-list-item title="药费" afterText="单贴￥30.31 X 帖数7 = ￥210.00" />
                    <mu-divider/>
                    <mu-list-item title="代煎费" afterText="帖数7 X 2包 = ￥28" />
                    <mu-divider/>
                    <mu-list-item title="代送费" afterText="￥10" />
                    <mu-divider/>
                    <mu-list-item title="优惠" describeText="供应商专属优惠满99包邮" afterText="￥-10" />
                    <mu-divider/>
                    <mu-list-item title="总计" afterText="￥280.00" />
                </mu-list>
            </mu-flexbox>

            <mu-flexbox class="submissions">
                <mu-raised-button label="完成" secondary/>
            </mu-flexbox>
        </mu-flexbox>
        <mu-toast v-if="toast" :message="toastMsg" @close="hideToast" />
    </div>
</template>

<script>
import Picker from 'better-picker'
import datas from '../../json/data.json'
import disease from '../../json/disease.json'
import ChoosePharmavy from '../publiccomponents/ChoosePharmavy.vue'
import drugslist from '../publiccomponents/DrugsList.vue'
import adddrugs from '../publiccomponents/AddDrugs'
// import drugs from '../../json/drug.json'
import axios from "axios";
import { mapState } from 'vuex'

import { mapActions } from 'vuex'
export default {
    name: "Proposal",
    data() {
        return {
            diseaseDatas: [],//病症库
            // drugs: [],//药品库
            bottomNav: 'recents',
            dialog: false,
            dialog2: false,
            dialog3: false,
            dialogisitvisible: false,
            price: "￥20",
            data1num: "5",
            data2num: '1',
            data3num: '1',
            data4num: '2',
            yiZhu: '必填',
            pharmacy_dialog: true,
            bottomPopup: false,
            valueYi: '',//医嘱v-model
            openDrawer: false,//医嘱
            multiLineInputErrorText: '',
            activeTab: 'tab2',
            diseaseNamecs: '',//病症名
            openDiseaseListcs: false,//搜索病症的下拉
            diseasescs: [],//模糊查询返回的结果
            actives: [],
            toast: false,
            toastMsg: '',//吐司的msg


        }
    },
    filters: {
        // drugmoney(m,u){
        // 	return m+"元/"+u;
        // }
    },
    methods: {
        handlechange1(val) {
            console.log(val)
            console.log("handlechange1")
        },
        handleChange(val) {
            this.bottomNav = val;
        },

        // 关闭性别选择弹窗

        closenv() {
            console.log(this.$store.state.datas)
            this.dialog = false
            console.log("关闭性别选择弹窗")
        },


        //  关闭年龄弹窗

        close() {
            this.dialog2 = false
            console.log("关闭年龄弹窗")
        },


        //  方案补充收费弹窗

        closefnob() {
            this.dialog3 = false

        },

        //  方案补充收费的选择

        chooseonly(e) {
            this.price = e;
            this.dialog3 = false
        },
        picker() {
            let picker = new Picker({
                data: [datas.data1, datas.data2, datas.data3, datas.data4],
                selectedIndex: [4, 0, 0, 1],
                title: '贴数'
            });
            picker.on('picker.select', (selectedVal, selectedIndex) => {
                this.data1num = datas.data1[selectedIndex[0]].text.replace(/[^0-9]/ig, "")
                this.data2num = datas.data2[selectedIndex[1]].text.replace(/[^0-9]/ig, "")
                this.data3num = datas.data3[selectedIndex[2]].text.replace(/[^0-9]/ig, "")
                this.data4num = datas.data4[selectedIndex[3]].text.replace(/[^0-9]/ig, "")
            })
            picker.show();
        },

        isitvisible() {
            console.log("是否可见")
            this.dialogisitvisible = true
        },
        chooseisitvisible(val) {
            console.log(val)
            this.dialogisitvisible = false
        },

        toggle() {
            this.openDrawer = !this.openDrawer
        },
        storeYi() {
            this.openDrawer = false
            console.log(this.valueYi);
            this.yiZhu = this.valueYi;
        },
        handleMultiLineOverflow(isOverflow) {
            this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
        },
        handleTabChange(val) {
            this.activeTab = val
        },
        yiZhuInput() {
            console.log("让医嘱输入框获取焦点")
        },
        addTime(val) {
            this.valueYi = val

        },
        addTaboo(val) {
            if (!this.valueYi) {
                this.valueYi = val
            } else {
                this.valueYi = this.valueYi + "，" + val
            }
        },
        addComm() {
            console.log("常用医嘱")
        },



        //  病症的模糊匹配
        handleInputdiseasecs() {
            this.openDiseaseListcs = true
            //arrCh    保存indexof查找返回的索引（中文）
            //arrEn    保存indexof查找返回的索引（英文）
            //arrFinal 遍历indexof的索引 ，找出非-1的值的位置， 存入arrFinal,即最终的结果
            let [arrCh, arrEn, arrFinal] = [[], [], []];
            this.diseaseDatas.forEach((item) => {
                arrCh.push(item.name.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").indexOf(this.diseaseNamecs))
                arrEn.push(item.name_spell.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "").indexOf(this.diseaseNamecs.toUpperCase()))
            })
            arrCh.forEach((item, index) => {
                if (arrCh[index] != -1) {// 如果是用户输入的是中文 
                    arrFinal.push(this.diseaseDatas[index].name.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""));
                } else if (arrEn[index] != -1) {//如果用户输入的是英文
                    arrFinal.push(this.diseaseDatas[index].name.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""));
                }
            })
            this.diseasescs = arrFinal;
            if (!this.diseaseNamecs) {
                this.openDiseaseListcs = false
            }
        },

        //  点击下拉的病症名

        chooseDiseasecs(val) {
            console.log(val)
            this.actives.push(val);
            this.actives = Array.from(new Set(this.actives));
            this.openDiseaseListcs = false;
            this.diseaseNamecs = '';
            this.$refs.diseaseFocuscs.focus()
        },
        diseaseClose(index) {
            console.log(index)
            this.actives.splice(index, 1)
        },
        // 打开输入药品弹窗时 获取配伍禁忌列表和药品列表
        openDrawerFang1() {
            this.getAllpwjj();
            let _this = this,
                param = new FormData();
            param.append('sId', this.sid);
            axios.post('?do=getDrugBySup', param)
                .then((res) => {
                    if (res.data.code == 1) {
                        this.$store.dispatch('istrue', true);
                        this.drugsData(res.data.data)
                    } else {
                        _this.showToast(res.data.Msg);
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
        //保存为经验方
        storeExpS() {
            console.log(this.datas2)
            console.log(this.pwjjarr)
            let drugCL = [],
                drugArr = [];
            this.datas2.forEach((item) => {
                drugArr.push({ "code": item.drug_id, "num": item.num, "proceway": item.proce_way, "unit": item.unit })
                if (item.max != 0 && item.num > item.max) {
                    console.log("超量")
                    drugCL.push({ "code": item.drug_id, "max": item.max })
                }
            })

            let _this = this,
                param = new FormData();
            param.append('n', "新增经验方");
            param.append('sup_id', this.sid);
            param.append('type', this.type);
            param.append('drugCL', drugCL);
            param.append('drugArr', drugArr);
        },
        ...mapActions([
            'drugsData',
            'getAllpwjj'
        ]),

    },



    watch: {


    },
    mounted() {
        this.diseaseDatas = disease;

        // this.drugs = drugs;
        // this.getDrugsData();
    },
    updated() {

    },
    computed: {
        // 全局共享的数据
        ...mapState({
            openDrawerFang: state => state.bool,
            datas2: state => state.datas2,
            pwjj: state => state.pwjj,
            type: state => state.type,
            sid: state => state.defaults.supplier_id,
            pwjjarr: state => state.pwjjarr,
        })


    },
    components: {
        ChoosePharmavy,
        drugslist,
        adddrugs

    }

};
</script>

<style scoped>
@import "./proposalsp.css";
</style>

<style>
@import "./proposal.css";
</style>
