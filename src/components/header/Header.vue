<template>
  <header class="header animate__animated animate__fadeIn">
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
        {{ isCurrectUsername ? user.name : user.login }}
      </router-link>

      <router-link
        class="header-navbar-new_article"
        :to="{ name: 'new-article' }"
      >
        new article
      </router-link>
    </nav>

    <nav
      class="header-navbar"
      v-else
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
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Header',
    computed: {
      ...mapGetters(['user']),
      isCurrectUsername() {
        const uncurrects = ['', null, undefined, ' '];

        return !uncurrects.includes(this.user.name);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: $header-height;
    z-index: 11;
    background-color: $main-color;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: $header-height;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    padding: 0 20px;

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
        @include action-button(#fff);

        height: 20px;
        line-height: 20px;
        padding: 5px;
        font-size: $font-size-s;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;

        &:hover {
          color: $cta-color;
        }
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
