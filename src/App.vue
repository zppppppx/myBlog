<template>
  <VApp>
    <VMain>
      
      <router-view />
      <footerVue />
    </VMain>
  </VApp>
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
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: -8px -8px auto;
  height: 100%;
  width: 100%;
}
</style>
