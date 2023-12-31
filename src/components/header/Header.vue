<template>
  <header class="header animate__animated animate__fadeIn">
    <div class="header-content">
      <div class="header-logo">
        <router-link
          class="header-logo-text"
          :to="{ name: 'home' }"
          @click.native="scrollToTop"
          >ARTLINE</router-link
        >
      </div>

      <nav
        v-if="user !== null && user !== undefined"
        class="header-navbar"
      >
        <router-link
          class="header-navbar-link"
          :to="{ name: 'account', query: { id: user.id } }"
        >
          {{ isCorrectUsername ? user.name : user.login }}
        </router-link>

        <router-link
          class="header-navbar-new_article"
          :to="{ name: 'new-article' }"
        >
          new article
        </router-link>
      </nav>

      <nav
        v-else
        class="header-navbar"
      >
        <router-link
          class="header-navbar-link"
          :to="{ name: 'login' }"
        >
          Login
        </router-link>
        <router-link
          class="header-navbar-link"
          :to="{ name: 'registration' }"
        >
          Registration
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';
  import scrollToTop from '@/js/scroll-to-top';

  export default {
    name: 'TheHeader',
    computed: {
      ...mapGetters(['user']),
      isCorrectUsername() {
        const uncurrects = ['', null, undefined, ' '];

        return !uncurrects.includes(this.user.name);
      },
    },
    methods: {
      scrollToTop() {
        scrollToTop();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    z-index: 11;
    display: flex;
    justify-content: center;
    width: 100%;
    height: $header-height;
    background-color: $main-color;

    &-content {
      display: grid;
      grid-template-rows: $header-height;
      grid-template-columns: auto auto;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 820px;
      margin: 0 12px;
    }

    &-navbar {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;

      &-link {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff !important;
        font-size: $font-size-s;

        @include link;
      }

      &-new_article {
        @include button(#fff, #fff);

        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        padding: 5px;
        background-color: transparent;
        font-size: $font-size-s;
        line-height: 20px;
        text-decoration: none;
      }
    }

    &-logo {
      &-text {
        color: #fff;
        text-decoration: none;
      }
    }
  }
</style>
