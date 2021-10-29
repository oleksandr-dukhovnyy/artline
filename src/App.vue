<template>
  <div id="app">
    <Header />
    <main class="main">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/header/Header.vue';
import Footer from '@/components/footer/Footer.vue';
import {mapActions} from 'vuex';

export default {
  components: {
    Header,
    Footer
  },
  name: 'App',
  methods: {
    ...mapActions(['autoLogin'])
  },
  created(){
    this.autoLogin();

    // if(confirm('delete-database?')){
    //   localStorage.clear();
    //   location.reload();
    // }
  }
}
</script>


<style lang="scss">
  @import '@/assets/scss/global.scss';
  @import '@/assets/scss/vars.scss';

  .main {
    padding: 40px 0 0 0;
    background-color: $home_background-color;

    display: flex;
    justify-content: center;
    // width: 100vw;
  }


</style>
