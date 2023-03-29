<template>
  <!-- <v-app> -->
  <!-- <VApp> -->
    <!-- <VMain> -->

  <router-view />
  

  <!-- </VMain> -->
  <!-- </VApp> -->
<!-- </v-app> -->
</template>

<script>
import footerVue from './components/footerVue.vue';
export default {
  components: {
    footerVue
  }
}
</script>


<style scoped>

/* #app {

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: -8px -8px 0px 0px;
  height: 100%;
  width: 100%;
  padding: 0%;

} */
</style>
