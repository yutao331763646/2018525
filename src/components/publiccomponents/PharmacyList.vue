<template>
    <div class="pharmacylist" @click="ted">
        <!-- <img src="../../assets/erweima.png" alt=""> -->
       <!-- <mu-radio nativeValue="simple2" v-model="value"></mu-radio> -->
         <!-- <mu-radio :nativeValue="text.supplier_id" :label="text.name" v-model="value"></mu-radio> -->
        <div>
            <span>{{text.name}}</span>
            <span>{{text.address}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: Object,
            default: {}
        },//子组件使用父组件的数据，我们需要通过子组件的props选项。

  
    },
        data() {
            return {
                value: this.text.supplier_id
            }
        },
        methods: {
            ted() {
            }
        }
    }
</script>
<style scoped lang="less">
.pharmacylist {
  margin: 0 auto;
//   margin-top: 10px;
 padding: 0px 0 0 30px;
    display: flex;
//   border: 1px solid #ccc;
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