<template>
  <header class="header animate__animated animate__fadeIn">
    <div class="header-content">
      <div class="header-logo">
        <router-link
          class="header-logo-text"
          :to="{ name: 'home' }"
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

  export default {
    name: 'TheHeader',
    computed: {
      ...mapGetters(['user']),
      isCorrectUsername() {
        const uncurrects = ['', null, undefined, ' '];

        return !uncurrects.includes(this.user.name);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    background-color: $main-color;
    height: $header-height;
    position: fixed;
    width: 100%;
    z-index: 11;
    display: flex;
    justify-content: center;

    &-content {
      width: 100%;
      max-width: 820px;
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: $header-height;
      justify-content: space-between;
      align-items: center;
      margin: 0 12px;
    }

    &-navbar {
      display: grid;
      grid-gap: 15px;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr;

      &-link {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $font-size-s;

        @include link;

        color: #fff !important;
      }

      &-new_article {
        @include button(#fff, #fff);

        background-color: transparent;
        height: 20px;
        line-height: 20px;
        padding: 5px;
        font-size: $font-size-s;
        display: flex;
        align-items: center;
        justify-content: center;
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
