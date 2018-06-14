<template>
    <div>
        <!-- <mu-appbar title="YuTao" class="topappbar">
			<mu-icon-button icon="keyboard_arrow_left" slot="left" :size="52" />
			<mu-icon-button icon="add" slot="right" />
		</mu-appbar> -->
        <mu-flexbox orient=vertical class="content">
            <!-- 输入患者姓名及年龄性别 -->
            <mu-flexbox class="yongfa">
                <mu-content-block>用户： </mu-content-block>
                <mu-raised-button :label="this.userinfos.username" primary />
                <mu-raised-button :label="this.userinfos.sex" primary />
                <mu-raised-button :label="this.userinfos.age" primary />
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
                        <li v-for="(item,index) in diseasescs" :key="index" @click="chooseDiseasecs(item)">{{item.name}}</li>
                    </ul>
                </div>
            </mu-flexbox>
            <mu-divider />

            <!-- 方案补充收费 -->
            <mu-flexbox class="f_nob proposal" orient="horizontal" @click.native="dialog3 = true">
                <mu-content-block>方案补充收费</mu-content-block>
                <mu-raised-button class="demo-raised-button" :label="'￥'+price" labelPosition="before" icon="keyboard_arrow_right" />
                <mu-dialog :open="dialog3" title="价格" @close="closefnob">
                    <mu-list>
                        <mu-list-item title="免费" @click="chooseonly('免费')">
                            <mu-icon slot="left" value="perm_identity" />
                        </mu-list-item>
                        <mu-list-item title="￥10" @click="chooseonly('10')">
                            <mu-icon slot="left" value="face" />
                        </mu-list-item>
                        <mu-list-item title="￥20" @click="chooseonly('20')">
                            <mu-icon slot="left" value="face" />
                        </mu-list-item>
                        <mu-list-item title="￥50" @click="chooseonly('50')">
                            <mu-icon slot="left" value="face" />
                        </mu-list-item>
                        <mu-list-item title="￥100" @click="chooseonly('100')">
                            <mu-icon slot="left" value="face" />
                        </mu-list-item>
                    </mu-list>
                </mu-dialog>
            </mu-flexbox>
            <mu-divider/>
            <!--用药建议标题 -->
            <mu-flexbox class="proposl proposal" v-if="zhongyaopinpianshow">
                <mu-content-block>用药建议： </mu-content-block>
                <mu-raised-button class="demo-raised-button" label="保存为经验方" @click="getexpclassify" />
                <!-- <mu-raised-button class="demo-raised-button" label="保存为经验方" @click="storeExpS" />  -->
            </mu-flexbox>
            <mu-divider v-if="zhongyaopinpianshow" />
        </mu-flexbox>
        <!-- 药品容器 -->
        <mu-flexbox class="drugslist" v-if="zhongyaopinpianshow">
            <drugslist v-for="(item,index) in datas2" :propss="item" :key="index"></drugslist>
            <!-- <drugslist></drugslist> -->
        </mu-flexbox>

        <!-- /*/*/*/*/*/*/*/*/*/*/* -->
        <mu-flexbox orient=vertical class="content">

            <!-- 添加方案按钮 -->
            <mu-flexbox class="add_af" v-if="zhongyaopinpianshow">
                <mu-raised-button label="添加方案" class="demo-raised-button" @click.native="openDrawerFang1" />
                <mu-drawer right :open="openDrawerFang" @close="toggle()" class="mudrawer">

                    <adddrugs @storeFange='storeFangs'></adddrugs>

                </mu-drawer>
            </mu-flexbox>
            <mu-divider v-if="zhongyaopinpianshow" />
            <div style="width:100%">
                <mu-flexbox class="yongfa">
                    <mu-content-block>用法： </mu-content-block>
                    <mu-raised-button label="内服" :secondary="yongfa==0" @click="yongfac(0)" />
                    <mu-raised-button label="外用" :secondary="yongfa==1" @click="yongfac(1)" />
                </mu-flexbox>
                <mu-divider/>

                <mu-flexbox v-if="waiyong">
                    <mu-text-field v-model="method_out" ref="waiyonginput" hintText="请输入用法" multiLine :rows="1" :rowsMax="6" fullWidth class="beizhu" />
                </mu-flexbox>
                <mu-divider v-if="waiyong" />

                <mu-flexbox orient="horizontal" class="proposal2" v-if="neifu">
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
                <mu-divider v-if="neifu" />
            </div>

            <!-- 医嘱 -->
            <mu-flexbox class="disease_name proposal yizhu" orient="horizontal" @click.native="toggle()">
                <mu-content-block>医嘱</mu-content-block>
                <mu-raised-button :label="yiZhu" labelPosition="before" icon="keyboard_arrow_right" />

            </mu-flexbox>
            <mu-divider />
            <mu-drawer right :open="openDrawer" class="mudrawer">
                <mu-appbar title="医嘱">
                    <mu-icon-button icon="keyboard_arrow_left" slot="left" @click.native="openDrawer = false" />
                    <mu-flat-button slot="right" label="保存" color="white" @click="storeYi()" />
                </mu-appbar>
                <mu-list class="mulist">
                    <!-- <mu-text-field v-model="valueYi" hintText="服药时间、忌口与禁忌、用药注意事项等（药房和患者均可见）" fullWidth :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="6" :maxLength="1000" /> -->
                    <!-- <mu-divider/> -->
                    <!-- <mu-checkbox label="存为常用医嘱" uncheckIcon="panorama_fish_eye" checkedIcon="check_circle" /> -->
                    <!-- <mu-tabs :value="activeTab" @change="handleTabChange" class="mutabs">
                        <mu-tab value="ta1b1" icon="keyboard_hide" @active="yiZhuInput" />
                        <mu-tab value="tab2" title="快捷输入" />
                        <mu-tab value="tab3" title="常用医嘱" />
                    </mu-tabs> -->
                    <!-- <mu-divider class="tabline" /> -->
                    <mu-flexbox v-if="activeTab === 'tab2'" orient='vertical'>
                        <mu-flexbox class="ftime" orient="horizontal">
                            <mu-content-block>服药时间</mu-content-block>
                        </mu-flexbox>
                        <!-- <mu-divider class="tabline" /> -->
                        <mu-flexbox wrap="wrap">
                            <mu-raised-button v-for="(item,index) in taTime" :key="index" :label="item" class="time" :secondary="timeactive==index" @click="addTime(item,index)" />
                        </mu-flexbox>
                        <mu-divider class="tabline" />
                        <mu-flexbox class="ftime" orient="horizontal">
                            <mu-content-block>忌口与禁忌</mu-content-block>
                        </mu-flexbox>
                        <mu-flexbox wrap="wrap">
                            <!-- <mu-raised-button label="无" class="time" /> -->
                            <mu-raised-button v-for="(item,index) in taboos" :key="index" :label="item" class="time" :secondary="true==tabooactive[index]" @click="addTaboo(item,index)" />

                        </mu-flexbox>
                    </mu-flexbox>
                    <!-- <mu-flexbox v-if="activeTab === 'tab3'" orient="vertical">
                        <mu-content-block class="tab3_list" @click="addComm()">
                            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                        </mu-content-block>
                        <mu-content-block class="tab3_list" @click="addComm()">
                            散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                        </mu-content-block>
                    </mu-flexbox> -->
                </mu-list>
            </mu-drawer>
            <!-- 购药前处方是否可见 -->
            <mu-flexbox class="disease_name proposal" orient="horizontal" @click.native="isitvisible" v-if="zhongyaopinpianshow">
                <mu-content-block>购药前处方是否可见</mu-content-block>
                <mu-raised-button class="demo-raised-button" :label="isShow" labelPosition="before" icon="keyboard_arrow_right" />
                <mu-dialog :open="dialogisitvisible" title="购药前处方是否可见">
                    <mu-list>
                        <mu-list-item title="可见" @click="chooseisitvisible('可见')"></mu-list-item>
                        <mu-list-item title="不可见" @click="chooseisitvisible('不可见')"></mu-list-item>
                    </mu-list>
                </mu-dialog>
            </mu-flexbox>
            <mu-divider v-if="zhongyaopinpianshow" />
            <mu-flexbox>
                <mu-text-field v-model="advise" hintText="输入备注" multiLine :rows="1" :rowsMax="6" fullWidth class="beizhu" />
            </mu-flexbox>
            <mu-divider />
        </mu-flexbox>

        <mu-flexbox orient="vertical" class="tuijya">
            <!-- 推荐药房的弹出 -->
            <ChoosePharmavy @pinkageSupze="pinkageSupzet" @peisong="peisongs" v-if="isShowT" />

            <mu-flexbox wrap="wrap" v-if="updatedimgshow" class="imagesee">
                <mu-paper :zDepth="1" class="addimg" v-if="addimginp">
                    <mu-icon value="add" :size="36" class="addicon" />
                    <mu-flat-button label="添加图片" class="demo-flat-button">
                        <input type="file" @change='add_img' class="file-button">
                    </mu-flat-button>
                </mu-paper>

                <mu-paper class="shiliimg" v-if="imgshili">
                    <img src="../../../static/images/shili.png" alt="">
                </mu-paper>

                <mu-paper class="shiliimg absed" v-for="(item,index) in imgsrcs" :key="index">
                    <img :src="item" alt="">
                    <mu-icon value="remove_circle" color="red" :size="24" class="deleget" @click="deleteimg(index)" />
                </mu-paper>

            </mu-flexbox>

            <!-- 价格列表 -->
            <mu-flexbox v-if="zhongyaopinpianshow">
                <mu-list class="pricelist">
                    <mu-list-item title="费用明细" />
                    <mu-divider/>
                    <mu-list-item title="方案补充收费" :afterText="'￥'+Number(price).toFixed(2)" />
                    <mu-divider/>
                    <mu-list-item title="药费" :afterText="'单贴￥'+drugprice+ 'X 帖数'+data1num+' = ￥'+(drugprice*data1num).toFixed(2)" />
                    <mu-divider/>

                    <mu-list-item v-if="isshowservemoney" title="加工费" :afterText="'￥'+defaults.serviceArr[serviceType.type].serve_money" />
                    <mu-divider v-if="isshowservemoney" />

                    <mu-list-item v-if="isShowdecoctings" title="代煎费" :afterText="'帖数'+data1num +'X '+data4num+'包 = ￥'+decoctings" />
                    <mu-divider v-if="isShowdecoctings" />
                    <mu-list-item title="代送费" :afterText="'￥'+defaults.serviceArr[serviceType.type].give_money" />
                    <mu-divider/>
                    <mu-list-item v-if="pinkageSupz" title="供应商专属优惠满99包邮" :afterText="'￥- '+subtrac99" class="redcoloe" />
                    <mu-divider v-if="pinkageSupz" />

                    <mu-list-item v-if="sup_discountsz" :title="defaults.discounts.name" :afterText="'￥'+sup_discounts.toFixed(2)" class="redcoloe" />
                    <mu-divider v-if="sup_discountsz" />

                    <mu-list-item title="总计" :afterText="'￥'+totalprice" class="totalprice" />
                </mu-list>
            </mu-flexbox>

            <mu-flexbox class="submissions">
                <mu-raised-button label="完成" secondary @click="submissions" />
            </mu-flexbox>
        </mu-flexbox>
        <mu-toast v-if="toast" :message="toastMsg" @close="hideToast" />
        <mu-dialog :open="dialogStoreJy" title="保存为经验方">
            <mu-flexbox>
                <mu-flexbox-item grow="1">
                    <mu-flat-button label="经验方名称：" class="expname" />
                </mu-flexbox-item>
                <mu-flexbox-item grow="2">
                    <mu-text-field hintText="请输入经验方名" class="expnameinput" v-model="n" ref="expnameinput" />
                </mu-flexbox-item>
            </mu-flexbox>
            <mu-divider />
            <mu-flexbox wrap="wrap">
                <mu-raised-button :label="item.name" class="exp" v-for="(item,index) in classifys" :key="index" :secondary="classindex==index" @click="chooseClassfys(index,item.id)" />

            </mu-flexbox>
            <mu-flat-button slot="actions" @click="closedialogStoreJy" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="closedialogStoreJyY" label="确定" />
        </mu-dialog>
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
import Qs from 'qs'
import { setTimeout } from 'timers';
export default {
    name: "Proposal",
    data() {
        return {
            diseaseDatas: [],//病症库
            // drugs: [],//药品库
            bottomNav: 'recents',
            // dialog: false,
            // dialog2: false,
            dialog3: false,
            dialogisitvisible: false,
            price: "20",
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
            dialogStoreJy: false,//保存为经验方的弹窗
            classifys: [],//经验方分类列表
            classindex: 0,
            isShow: '不可见',//购药前处方是否可见
            classify: 0,
            n: '',
            taboos: ['忌辛辣', '忌油腻', '忌生冷', '忌烟酒', '忌发物', '忌荤腥', '忌酸涩', '忌刺激性食物', '忌敏性食物', '忌难消化食物', '备孕禁服', '怀孕禁服', '经期停服', '感冒停服', '忌与西药同服'],
            taTime: ['饭前一小时', '饭后一小时', '空腹服', '晨起服'],
            timeactive: 50,
            tabooactive: [],
            drugprice: 0,//单贴费用
            drugpricebase: 0,//帖数
            pinkageSups: {
                '1': ['000000', '159101', '059102'],
                '2': ['059107']
            },//满减活动的供应商id
            pinkageSupz: false,//当前供应商是否满减
            yongfa: 0,//内服OR外用
            waiyong: false,
            neifu: true,
            diseaseIdarr: [],//病症id数组
            diseaseId: '',//病症ID
            taboo: '',//禁忌与忌口  给后台的
            advise: '',//备注
            eat_time: '',//服用时间
            method_out: '',//外用方法
            is_show: 0,//处方是否可见
            peisonged: 1,//服务id 
            // sup_discountsz: true,//供应商优惠是否显示
            imgsrcs: [],//上传图片的base64集合
            imgshili: true,//图片上传的示例图片,当上传图片大于0的时候 隐藏
            addimginp: true,//上传图片的按钮，当上传图片大于3的时候 隐藏
            imgArr: [],//拍照方图片地址数组
            // updatedimgshow: false,//上传图片的显隐
            // zhongyaopinpianshow: true,
        }
    },
    filters: {
        // drugmoney(m,u){
        // 	return m+"元/"+u;
        // }
    },
    methods: {
        signCFFF() {
            if (!this.repeatOrder.data) {
                console.log("正常流程")
            } else {
                console.log("===========重方")
                console.log(this.repeatOrder)
                let order = this.repeatOrder.data.orderInfo;
                let druginfo = this.repeatOrder.data.drugInfo;//药品列表

                let norm_disease = order.norm_disease,//病症名
                    disease_id = order.disease_id,//病症id
                    cost_money = order.cost_money,//诊费，方案补充收费
                    use_type = order.use_type,//服用方式
                    use_advise = order.use_advise,//外用用法
                    useage = order.useage,//用法用量 5 1 1 5
                    usetime = order.usetime,//用药时间
                    is_show = order.is_show,//是否可见
                    give_money = order.give_money,//配送费
                    taboo = order.taboo;//忌口与禁忌  
                this.advise = order.advise;//其他医嘱  备注
                console.log("是否可见" + typeof(is_show))

                let jjj = taboo.split(',');
                let indexs = [];
                if (taboo == '无') {
                    indexs = []
                } else {
                    indexs = jjj.map((item) => {
                        return this.taboos.indexOf(item)
                    })
                }
          
                indexs.forEach((item) => {
                    this.tabooactive.splice(item, 1, true)
                })


                let activescfff = norm_disease.split(',');
                let useagecfff = useage.split(',')
                let len = this.taTime.indexOf(usetime);//服药时间的索引

                this.peisonged = order.give_type;//服务类型
                this.timeactive = len;//让当前索引服药时间高亮
                this.eat_time = usetime;//传给后台的服用时间
                this.diseaseId = disease_id;//病症id
                this.actives = activescfff;//病症名
                this.price = cost_money;//诊费，方案补充收费
                this.yongfa = use_type;//服用方式
                this.method_out = use_advise;//外用用法
                this.is_show = is_show;//是否可见
                this.data1num = useagecfff[0];
                this.data2num = useagecfff[1];
                this.data3num = useagecfff[2];
                this.data4num = useagecfff[3];
                
                if (Number(is_show)) {
                    this.isShow = "可见"
                    console.log("可见")
                } else {
                    console.log("不可见")
                    this.isShow = "不可见"
                }
                if (use_type) {
                    this.waiyong = true;
                    this.neifu = false;
                } else {
                    this.waiyong = false;
                    this.neifu = true
                }

                let drugNameOkLists = druginfo.map((item) => {
                    return {
                        drugName: item.drug_name,
                        num: item.number,
                        sprice: item.unit_price,
                        unit: item.unit,
                        drug_id: item.drug_code,
                        max: item.max,
                        is_abnormal: item.is_abnormal
                    }
                })

                // 计算单贴价格
                let x = 0;
                drugNameOkLists.forEach((item) => {
                    x += item.num * item.sprice
                })
                let y = Math.ceil(x * 100);
                this.drugprice = (y / 100).toFixed(2)

                this.adddatas2(drugNameOkLists)


            }
        },
        handlechange1(val) {
            console.log(val)
            console.log("handlechange1")
        },
        handleChange(val) {
            this.bottomNav = val;
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
            this.dialogisitvisible = true
        },
        chooseisitvisible(val) {
            this.isShow = val;
            // console.log(val)
            if (val == "可见") {
                this.is_show = 1
            } else {
                this.is_show = 0
            }
            this.dialogisitvisible = false
        },

        toggle() {
            this.openDrawer = !this.openDrawer
        },
        storeYi() {
            this.openDrawer = false
            // console.log(this.valueYi);
            this.yiZhu = this.valueYi;
        },
        // handleMultiLineOverflow(isOverflow) {
        //     this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
        // },
        // handleTabChange(val) {
        //     this.activeTab = val
        // },
        // yiZhuInput() {
        //     console.log("让医嘱输入框获取焦点")
        // },
        yongfac(num) {
            this.yongfa = num;
            if (num) {
                this.waiyong = true;
                this.neifu = false;
                setTimeout(() => {
                    this.$refs.waiyonginput.focus();
                }, 150)

            } else {
                this.waiyong = false;
                this.neifu = true
            }
        },
        peisongs(val) {
            this.peisonged = val
            // console.log(val)
        },
        addTime(val, index) {
            this.valueYi = val;
            this.timeactive = index;
            this.addTabooas();
            this.eat_time = val;

        },
        addTaboo(val, indexs) {
            this.tabooactive.forEach((item, index) => {
                if (index === indexs) {
                    if (this.tabooactive[indexs]) {
                        this.tabooactive.splice(indexs, 1, false)
                        this.valueYi = this.valueYi.replace('，' + val, '')
                        this.taboo = this.taboo.replace('，' + val, '')
                    } else {
                        if (!this.valueYi) {
                            this.valueYi = val
                        } else {
                            this.valueYi = this.valueYi + "，" + val
                        }
                        if (!this.taboo) {
                            this.taboo = val

                        } else {
                            this.taboo = this.taboo + "，" + val

                        }
                        this.tabooactive.splice(indexs, 1, true)
                    }
                }
            })
            console.log(this.taboo)
        },
        addTabooas() {
            this.tabooactive = this.taboos.map((item, index) => {
                return false;
            })
        },
        // addComm() {
        //     console.log("常用医嘱")
        // },
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
            // let cesiarr = [];
            arrCh.forEach((item, index) => {
                if (arrCh[index] != -1) {// 如果是用户输入的是中文 
                    arrFinal.push({ name: this.diseaseDatas[index].name.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""), id: this.diseaseDatas[index].id })
                    // arrFinal.push(this.diseaseDatas[index].name.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""));
                } else if (arrEn[index] != -1) {//如果用户输入的是英文
                    // arrFinal.push(this.diseaseDatas[index].name.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""));
                    arrFinal.push({ name: this.diseaseDatas[index].name.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, ""), id: this.diseaseDatas[index].id })
                }
            })
            this.diseasescs = arrFinal;
            console.log(this.diseasescs)
            if (!this.diseaseNamecs) {
                this.openDiseaseListcs = false
            }
        },
        //  点击下拉的病症名
        chooseDiseasecs(val) {
            this.actives.push(val.name);
            this.actives = Array.from(new Set(this.actives));
            this.openDiseaseListcs = false;
            this.diseaseNamecs = '';
            this.$refs.diseaseFocuscs.focus()
            this.diseaseIdarr.push(val.id);
            this.diseaseId = this.diseaseIdarr.join(",")
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
        getexpclassify() {
            this.dialogStoreJy = true;
            let _this = this;
            axios.post('?do=getexpclassify&isTest=nowTest')
                .then((res) => {
                    if (res.data.succ) {
                        _this.classifys = res.data.sec;
                        this.classify = res.data.sec[0].id;
                    } else {
                        _this.showToast(res.data.msg);
                    }

                })
                .catch((err) => {
                    console.log(err);
                });

        },
        closedialogStoreJy() {
            this.dialogStoreJy = false
        },
        closedialogStoreJyY() {
            if (!this.n) {
                console.log("kong")
                this.$refs.expnameinput.focus()
            } else {
                this.storeExpS();
                this.dialogStoreJy = false
            }

        },
        chooseClassfys(index, id) {

            this.classindex = index;
            this.classify = id;
        },
        //保存为经验方
        storeExpS() {
            console.log(this.datas2)
            // console.log(this.pwjjarr)

            let [pwjjarrs, drugCL, drugArr] = [[], [], []]
            let arrId = this.datas2.map((item, indexx) => {
                return item.drug_id
            })
            this.pwjj.forEach((item, index) => {
                let x = arrId.indexOf(item[0].id),
                    y = arrId.indexOf(item[1].id);
                if (x != -1 && y != -1) {
                    pwjjarrs.push([this.pwjj[index][0].id, this.pwjj[index][1].id])
                }
            })

            this.datas2.forEach((item) => {
                drugArr.push({ "code": item.drug_id, "num": item.num, "proceway": item.type, "unit": item.unit })
                if (item.max != 0 && item.num > item.max) {
                    console.log("超量")
                    drugCL.push({ "code": item.drug_id, "max": item.max })
                }
            })
            let _this = this;
            // console.log(this.n)
            // console.log(this.sid)
            // console.log(this.type)
            // console.log(drugCL)
            // console.log(this.classify)
            console.log(drugArr)
            // console.log(pwjjarrs)
            let params = {
                "n": this.n,
                'sup_id': this.sid,
                'type': this.type,
                'drugCL': drugCL,
                'drugArr': drugArr,
                'pwjj': pwjjarrs,
                'classify': this.classify
            }
            axios.post('?do=saveexp', Qs.stringify(params))
                .then((res) => {
                    console.log(res)
                    if (res.data.succ) {
                        _this.showToast(res.data.msg);
                    } else {
                        _this.showToast(res.data.msg);
                        // console.log(res.data.msg)
                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 计算价格
        computedPrice() {
            // console.log("===------------------------====")
            this.datas2.forEach((item) => {
                // console.log(item)
                // this.drugprice = item.num * item.sprice
            })
        },
        storeFangs(val) {
            this.drugprice = val

        },
        pinkageSup() {
            let _this = this;
            axios.post('?do=pinkageSup'
            ).then((res) => {
                _this.pinkageSups = res.data;

            }).catch((err) => {
                console.log(err)
                // _this.showToast('连接服务器失败');
            })
        },
        ispinkageSupz() {
            let base = 0;
            // 是否显示优惠
            this.pinkageSups[1].forEach((item) => {
                if (this.type == 1 && item == this.sid) {
                    base += 1;
                }
            });
            this.pinkageSups[2].forEach((item) => {
                if (this.type == 2 && item == this.sid) {
                    base += 1;
                }
            });
            if (base == 0) {
                this.pinkageSupz = false
            } else {
                this.pinkageSupz = true
            };

        },

        pinkageSupzet(bool) {
            console.log(bool)
            this.pinkageSupz = bool
            console.log("是否显示" + this.pinkageSupz)
        },
        add_img(e) {
            let file = e.target.files[0];
            this.drawOnCanvas(file, 'head_img1');
        },
        drawOnCanvas(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let dataURL = e.target.result,
                    canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    img = new Image();
                console.log(555)
                img.onload = () => {
                    let w = img.width,
                        h = img.height;
                    canvas.width = w / 2;
                    canvas.height = h / 2;
                    let context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0, w / 2, h / 2);
                    let base64 = canvas.toDataURL('image/jpeg', 1),
                        param = new FormData();
                    console.log(base64)
                    param.append('base64', base64);
                    axios.post('?do=doctorimgup', param)
                        .then((res) => {
                            console.log(res)
                            if (res.data.succ) {
                                this.imgsrcs.push(base64);
                                this.isShowAddImg();
                                this.imgArr.push(res.data.sec)
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                img.src = dataURL;
            }
            reader.readAsDataURL(file);
        },
        deleteimg(index) {
            this.imgsrcs.splice(index, 1)
            this.imgArr.splice(index, 1)
            this.isShowAddImg();
        },
        isShowAddImg() {
            let len = this.imgsrcs.length;
            if (len > 0) {
                this.imgshili = false
            } else {
                this.imgshili = true
            }
            if (len > 2) {
                this.addimginp = false
            } else {
                this.addimginp = true
            }
        },
        submissions() {
            let disease = this.actives.join(","),
                useage = this.data1num + "," + this.data2num + "," + this.data3num + "," + this.data4num

            let [pwjjarrs, drugCL, drugArr, tabootophp] = [[], [], [], ''];
            let arrId = this.datas2.map((item, indexx) => {
                return item.drug_id
            })
            this.pwjj.forEach((item, index) => {
                let x = arrId.indexOf(item[0].id),
                    y = arrId.indexOf(item[1].id);
                if (x != -1 && y != -1) {
                    pwjjarrs.push([this.pwjj[index][0].id, this.pwjj[index][1].id])
                }
            })

            this.datas2.forEach((item) => {
                drugArr.push({ "code": item.drug_id, "num": item.num, "proceway": item.type, "unit": item.unit })
                if (item.max != 0 && item.num > item.max) {
                    console.log("超量")
                    drugCL.push({ "code": item.drug_id, "max": item.max })
                }
            })
            // let tabootophp = '';
            if (this.taboo == '') {
                tabootophp = '无'
            } else {
                tabootophp = this.taboo
            }

            let discounts = this.defaults.discounts,
                discounts_id = null,
                sup_discounts_name = '';
            if (discounts) {
                discounts_id = discounts.id;
                sup_discounts_name = discounts.name;
            } else {
                discounts_id = null;
                sup_discounts_name = '';
            }

            // 中药饮片的参数
            let params = {
                data:
                    {
                        "diseaseId": this.diseaseId,//ok
                        'disease': disease,//ok
                        'type': this.type,//ok
                        'useage': useage,//ok
                        'taboo': tabootophp,//ok
                        'advise': this.advise,//ok
                        'use_type': this.yongfa,//ok
                        'eat_time': this.eat_time,//ok
                        'method_out': this.method_out,//ok
                        'is_show': this.is_show,//ok
                        'peisong': this.peisonged,//ok
                        'su_id': this.sid,//ok
                        'd_m': (this.drugprice * this.data1num).toFixed(2),//ok
                        'p_m': this.decoctings,//ok
                        'drug_type': this.type,//ok
                        'g_m': this.defaults.serviceArr[this.serviceType.type].give_money,//ok
                        'cost_money': this.price,//ok
                        'allTotal': this.totalprice,//ok
                        'cheap_money': Number(-this.subtrac99),//ok
                        'JGMoney': this.defaults.serviceArr[this.serviceType.type].serve_money,//加工费
                        'discounts_id': discounts_id,//ok
                        'sup_discounts': this.sup_discounts,//ok
                        'sup_discounts_name': sup_discounts_name,//ok


                        'drugCLArr': drugCL,//ok
                        'drugArr': drugArr,//ok
                        'pwjjArr': pwjjarrs,//ok

                        // 'isTest': 'isTest'
                    }
            }
            let params2 = {
                "costMoney": this.price,//ok
                "imgArr": this.imgArr,//ok
                "drug_type": this.type,//ok
                "diseaseId": this.diseaseId,//ok
                "disease": disease,//ok"
                "useage": useage,//ok
                "taboo": this.taboo,//ok
                "advise": this.advise,//ok
                "eat_time": this.eat_time,//ok
                "use_type": this.yongfa,//ok
                "method_out": this.method_out,//ok
                "supid": this.sid,//ok
                "service": this.peisonged,//ok



            }
            if (this.type == -1) {
                axios.post('?do=KFPicturesPrescribe', Qs.stringify(params2))
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {

                axios.post('?do=KFprescribe', Qs.stringify(params))
                    .then((res) => {
                        console.log(res.data)
                        // let url = window.location.href;
                        // console.log(url)
                        if (res.data.code) {
                            this.showToast(res.data.msg)
                            window.location.href = res.data.url
                            console.log(typeof (res.data.msg))
                        } else {
                            this.showToast(res.data.msg)
                        }


                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },


        ...mapActions([
            'drugsData',
            'getAllpwjj',
            'adddatas2'
        ]),

    },

    watch: {

    },

    mounted() {
        this.addTabooas();
        this.signCFFF();
        this.diseaseDatas = disease;
        this.pinkageSup();
        this.ispinkageSupz();
        // this.vtotalprice();
    },
    updated() {
        //    this.ispinkageSupz();
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
            defaults: state => state.defaults,
            serviceType: state => state.serviceType,
            userinfos: state => state.userinfo,
            repeatOrder: state => state.repeatOrder,
        }),
        // 是否显示供应商优惠
        sup_discountsz() {
            let bool = this.defaults.discounts;
            if (bool) {
                return true
            } else {
                return false
            }
        },
        // 代煎费
        decoctings() {
            if (this.drugprice) {
                return ((this.defaults.serviceArr[this.serviceType.type].proce_money) * this.data1num * this.data4num).toFixed(2)
            } else {
                return Number(0).toFixed(2)
            }
        },
        // 满减优惠
        subtrac99() {
            if (this.drugprice * this.data1num > 99) {
                return (Number(this.defaults.serviceArr[this.serviceType.type].proce_money * this.data1num * this.data4num) + Number(this.defaults.serviceArr[this.serviceType.type].give_money)).toFixed(2);
            } else {
                return Number(0).toFixed(2)
            }
        },
        //供应商优惠
        sup_discounts() {
            if (this.defaults.discounts) {
                return -((1 - Number(this.defaults.discounts.point)) * (this.drugprice * this.data1num)).toFixed(2)
            } else {
                return Number(0).toFixed(2)
            }
        },
        // 总价
        totalprice() {
            if (this.drugprice == 0) {
                return Number(0).toFixed(2)
            } else {
                if (this.pinkageSupz) {
                    return (Number(this.price) + Number(this.drugprice * this.data1num) + Number(this.decoctings) + Number(this.defaults.serviceArr[this.serviceType.type].give_money) - Number(this.subtrac99) + Number(this.sup_discounts)).toFixed(2)
                } else {
                    return (Number(this.price) + Number(this.drugprice * this.data1num) + Number(this.decoctings) + Number(this.defaults.serviceArr[this.serviceType.type].give_money) + Number(this.sup_discounts)).toFixed(2)
                }
            }
        },
        // 是否显示推荐药房
        isShowT() {
            if (this.drugprice) {
                return true
            } else {
                return true
            }
        },
        // 拍方时显示
        updatedimgshow() {
            if (this.type == -1) {
                return true
            } else {
                return false
            }
        },
        //中药饮片和颗粒剂时显示
        zhongyaopinpianshow() {
            if (this.type == -1) {
                return false
            } else {
                return true
            }
        },
        // 是否显示加工费
        isshowservemoney() {
            if (this.type == 3) {
                return true
            } else {
                return false
            }
        },
        // 是否显示代煎费
        isShowdecoctings() {
            if (this.type == 1) {
                return true
            } else {
                return false
            }
        }

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
