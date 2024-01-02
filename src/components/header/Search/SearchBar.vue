<template>
  <div class="search">
    <div
      v-click-outside="hideSearchResults"
      class="search__content"
    >
      <input
        v-model.trim="searchStr"
        :placeholder="placeholder"
        type="text"
        @focus="onFocused"
        @blur="onBlur"
        @click="showSearchResults"
      />
      <img
        :src="require(`@/assets/icons/${actionIcon.icon}.svg`)"
        :alt="actionIcon.alt"
        class="animate__animated animate__bounceIn animate__delay-1s"
        @click="onActionIconClicked"
      />

      <Results
        v-if="showDropdown"
        :error="searchStringError"
        :loading="loading"
        :posts="searchResultsPosts"
        :users="searchResultsUsers"
        :search-str="searchStr"
      />
    </div>
  </div>
</template>

<script>
  import API from '@/api/index.api.js';
  import Results from './Results.vue';
  import debounce from '@/helpers/debounce';

  export default {
    name: 'SearchBar',

    components: {
      Results,
    },

    props: {
      initialValue: {
        type: String,
        default: '',
      },

      placeholder: {
        type: String,
        default: 'search',
      },
    },

    emits: ['search-start', 'search-end'],

    data: () => ({
      searchStr: '',
      loading: false,
      isSearchActive: false,
      isSearchFocused: false,

      /*
        {
          link: string,
          title: htmlString,
          author: string
        }
      */
      searchResultsPosts: [],

      /*
        {
          id: number,
          name: string,
        }
      */
      searchResultsUsers: [],
    }),

    computed: {
      showDropdown() {
        if (!this.isSearchActive) return false;

        return (
          this.searchStr.length ||
          (this.searchStr.length > 0 && this.searchStringError !== null)
        );
      },

      searchStringError() {
        return this.searchStr.length < 2 ? 'Enter at least 2 characters' : null;
      },

      actionType() {
        return this.searchStr.length === 0 ? 'search' : 'close';
      },

      actionIcon() {
        return {
          icon: this.actionType,
          alt: this.actionType === 'search' ? 'search' : 'x',
        };
      },
    },

    watch: {
      searchStr() {
        this.initSearch();
      },

      $route() {
        this.hideSearchResults();
      },

      isSearchActive() {
        this.$emit(this.isSearchActive ? 'search-start' : 'search-end');
      },

      isSearchFocused() {
        if (!this.searchStr.length) {
          this.hideSearchResults();
        }
      },
    },

    created() {
      this.searchStr = this.initialValue;
    },

    methods: {
      onFocused() {
        this.isSearchFocused = true;
        this.showSearchResults();
      },

      onBlur() {
        this.isSearchFocused = false;
      },

      /**
       * Handles the action icon click.
       * Search or close the search results.
       */
      onActionIconClicked() {
        if (this.actionType === 'search') {
          this.initSearch();
        }

        if (this.actionType === 'close') {
          this.searchStr = '';
          this.hideSearchResults();
        }
      },

      /**
       * Hides the search results.
       */
      hideSearchResults() {
        this.isSearchActive = false;
      },

      /**
       * Shows the search results.
       */
      showSearchResults() {
        this.isSearchActive = true;
      },

      /**
       * Initializes the search functionality if the search string is at least 2 characters.
       */
      initSearch() {
        if (this.searchStringError === null) {
          this.loading = true;
          this.searchResultsPosts = [];
          this.searchResultsUsers = [];

          this.search();
        }
      },

      /**
       * Searches for posts and users.
       */
      search: debounce(function () {
        const searchStr = this.searchStr;
        const searchErrorsIsEmpty = this.searchStringError === null;

        if (searchErrorsIsEmpty) {
          Promise.allSettled([
            API.searchPosts(searchStr),
            API.searchUsers(searchStr),
          ])
            .then(([posts, users]) => {
              this.searchResultsPosts = posts.value;
              this.searchResultsUsers = users.value;
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }, 1500),
    },
  };
</script>

<style lang="scss" scoped>
  .search {
    width: 100%;
    max-width: $search-max-width;
    margin: 0 auto;

    &__content {
      display: flex;
    }

    input {
      @include beauty-input;

      margin: 0 -10px 0 10px;
      padding-right: 40px !important;
      border-radius: $border-radius;
      font-size: 16px !important;
      text-align: center;

      &:focus {
        &::placeholder {
          color: transparent;
          transform: translate3d(0, 0, 0);
        }
      }
    }

    img {
      position: relative;
      top: 8px;
      right: 30px;
      z-index: 1;
      width: 20px;
      height: 20px;
      background-color: #fff;
      cursor: pointer;

      @include scalable(1.2);
    }
  }
</style>
