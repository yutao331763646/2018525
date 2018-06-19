<template>
    <div class="drugslist">
        <div class="drugName">

            <span>{{propss.drugName}}</span>
            <span>{{propss.type}}</span>
        </div>
        <span>{{propss.num+propss.unit}}</span>
    </div>
</template>

<script>
export default {
    props: ['propss'],//子组件使用父组件的数据，我们需要通过子组件的props选项。
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
    }
}
</script>
<style scoped lang="less">
.drugslist {
  width: 50%;
  height: 1rem;
  background: #e1d0a7;
  padding-left: 20px;
  display: flex;
  align-items: center;
  padding-right: 20px;
  //   flex-direction: column;
  justify-content: space-between;
  .drugName {
    span {
      display: block;
    }
    span:first-of-type {
      font-size: 0.25rem;
    }
    span:last-of-type {
      font-size: 0.18rem;
      color: #999;
    }
  }
}
</style>