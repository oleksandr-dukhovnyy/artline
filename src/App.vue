<template>
  <div id="app">
    <TheHeader />
    <main class="main">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<script>
  import TheHeader from './components/header/Header.vue';
  import TheFooter from '@/components/footer/Footer.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'App',
    components: {
      TheHeader,
      TheFooter,
    },
    created() {
      this.autoLogin();
    },
    methods: {
      ...mapActions(['autoLogin']),
    },
  };
</script>

<style lang="scss">
  @import '@/assets/scss/global';

  .main {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    padding: 35px 0 0;
    background-color: $home-background-color;
  }
</style>
