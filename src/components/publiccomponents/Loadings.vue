<template>  
    <div id="loading">  
        <div></div>
        <mu-circular-progress :size="60" :strokeWidth="5"/>
    </div>  
</template>  

<script>

export default {
    data() {
        return {

        }
    },
    methods: {

       
    },
    mounted() {

    },
    computed: {

    }
}
</script>
<style  lang="less">
#loading{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    z-index: 999999999999;
    // align-items: center;
    margin-top: 20px;
    justify-content: center;
}

</style>