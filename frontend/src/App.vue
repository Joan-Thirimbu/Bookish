<template>
  <NavBar/>
  <div class="page-wrap">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/navbar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212427;
  margin-top: 5em;
}
</style>
