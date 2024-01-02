<template>
  <div
    v-if="!error"
    class="results animate__animated animate__fadeIn animate__faster"
  >
    <Loader
      v-if="loading"
      style="height: 70px"
    />

    <template v-else-if="totalResults > 0">
      <span class="results__count">
        Results: <span>{{ totalResults }}</span>
      </span>

      <div
        class="results__contain"
        style="order: 1"
      >
        <Separator title="Posts:" />
        <template v-if="posts.length">
          <div
            v-for="(post, i) in posts"
            :key="i"
            class="results__result"
          >
            <router-link
              v-purify-html="post.title"
              :to="post.link"
            ></router-link>
            <span> - {{ post.author }}</span>

            <hr />
          </div>
        </template>
        <div
          v-else
          class="muted"
        >
          No posts found
        </div>
      </div>

      <div
        class="results__contain"
        :style="{
          order: setUsersSearchResultFirst ? 0 : 2,
        }"
      >
        <Separator title="Users:" />
        <template v-if="users.length">
          <div
            v-for="user in users"
            :key="user.id"
            class="results__result"
          >
            <router-link
              v-purify-html="user.name"
              :to="`/user/${user.id}`"
            ></router-link>
          </div>
        </template>
        <div
          v-else
          class="muted"
        >
          No users found
        </div>
      </div>
    </template>

    <div v-else>
      No results found for "<span style="color: #09a564">{{ searchStr }}</span
      >"
    </div>
  </div>

  <div
    v-else
    class="results animate__animated animate__fadeIn animate__faster"
  >
    {{ error }}
  </div>
</template>

<script>
  import Loader from '@/components/loader/LoaderLines.vue';
  import Separator from './ResultsSeparator.vue';

  export default {
    name: 'SearchResultsList',

    components: {
      Loader,
      Separator,
    },

    props: {
      error: {
        type: [String, null],
        default: '',
      },

      searchStr: {
        type: String,
        default: '',
      },

      loading: {
        type: Boolean,
      },

      posts: {
        type: Array, // { link: string, title: string, author: string }[]
        default: () => [],
      },

      users: {
        type: Array, // { id: number, name: string, }[]
        default: () => [],
      },
    },

    computed: {
      totalResults() {
        return this.posts.length + this.users.length;
      },

      setUsersSearchResultFirst() {
        return this.users.length > 0 && this.posts.length === 0;
      },
    },
  };
</script>

<style lang="scss">
  .results__result a span {
    color: #09a564;
  }
</style>

<style lang="scss" scoped>
  .results {
    position: absolute;
    top: calc(100% - 6px);
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden auto;
    width: 100vw;
    max-height: calc(100vh - $header-height - $break * 4);
    padding: $break;
    background-color: #fff;
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 20%),
      0 16px 24px 2px rgba(0, 0, 0, 14%), 0 6px 30px 5px rgba(0, 0, 0, 12%);

    @include media-up(tablet) {
      left: unset;
      width: 100%;

      // 20px - search icon size
      max-width: $search-max-width - 20px;
      margin-left: 10px;
      border-radius: $border-radius;
    }

    &__contain {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    &__count {
      font-size: 14px;

      span {
        color: #09a564;
      }
    }

    hr {
      width: 100%;
    }

    &__result {
      span {
        display: inline;
        color: $muted-text-color;
      }

      a {
        display: inline;
        color: #000;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      hr {
        width: 100%;
        height: 1px;
        border: none;
        background-color: $muted-text-color;
      }
    }
  }
</style>
