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

      <SearchBar
        @search-start="isSearchActive = true"
        @search-end="isSearchActive = false"
      />

      <nav
        v-if="user !== null && user !== undefined"
        class="header-navbar"
        :class="{
          'hide-on-mobile': isSearchActive,
        }"
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
        :class="{
          'hide-on-mobile': isSearchActive,
        }"
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
  import scrollToTop from '@/helpers/scroll-to-top';
  import SearchBar from './Search/SearchBar.vue';

  export default {
    name: 'TheHeader',
    components: {
      SearchBar,
    },

    data() {
      return {
        isSearchActive: false,
      };
    },

    computed: {
      ...mapGetters(['user']),
      isCorrectUsername() {
        return !!this.user.name?.trim();
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
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 14%), 0 1px 5px 0 rgba(0, 0, 0, 12%),
      0 3px 1px -2px rgba(0, 0, 0, 20%);

    &-content {
      display: grid;
      grid-template-rows: $header-height;
      grid-template-columns: max-content 1fr max-content;
      gap: $break;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 820px;
      margin: 0 12px;
    }

    &-navbar {
      // display: grid;
      // grid-template-rows: 1fr;
      // grid-template-columns: 1fr 1fr;
      // grid-gap: 15px;

      display: flex;
      gap: 15px;
      align-items: center;

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

        display: none;
        justify-content: center;
        align-items: center;
        height: 20px;
        background-color: transparent;
        font-size: $font-size-s;
        line-height: 20px;
        text-decoration: none;

        @include media-up(470px) {
          display: flex;
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
