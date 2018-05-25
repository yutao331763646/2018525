<template>
    <div id="app">
        <!-- <transition name="slide-fade"> -->
        <loadings v-show="showLoading" class="loading"></loadings>
        <router-view/>
        <!-- </transition> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loadings from './components/publiccomponents/Loadings.vue'
export default {
    name: 'App',
    components: {
        Loadings
    },
    computed: {
        ...mapGetters([
            'showLoading'
        ])
    }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 0.7s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>
