<template>
  <!-- <VApp>
    <VMain> -->

  <router-view />
  <teleport to='body'>
    <footerVue />
  </teleport>

  <!-- </VMain>
  </VApp> -->
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

#app {
  /* background-color: black; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: -8px -8px 0px 0px;
  height: 100%;
  width: 100%;
  padding: 0%;
  /* display: flex;
  flex-direction: column; */
}
</style>
