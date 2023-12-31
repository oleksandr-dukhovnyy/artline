<template>
  <div class="wrapper">
    <section
      v-if="!articlesByTagLoading"
      class="tag"
    >
      <div class="tag-header">
        <h1 class="tag-header-title">
          Articles with tag "<span class="tag-header-title-cta">{{
            $route.params.tag
          }}</span
          >"
        </h1>
        <div class="tag-header-articles_width_tag">
          Articles with tag:
          {{ articlesByTagCount !== null ? articlesByTagCount : 'loading...' }}
        </div>
      </div>

      <div class="tag-articles">
        <Articles :articles="articlesByTag" />
      </div>
    </section>

    <div
      v-else
      class="loader"
    >
      <Loader />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Articles from '@/components/feed/Feed';
  import Loader from '@/components/loader/LoaderLines.vue';

  export default {
    name: 'CategoryTag',
    components: {
      Articles,
      Loader,
    },
    data: () => ({
      articlesWidthTag: 120,
    }),
    computed: {
      ...mapGetters([
        'articlesByTagLoading',
        'articlesByTag',
        'articlesByTagCount',
      ]),
    },
    created() {
      this.loadArticlesByTag({
        tag: this.$route.params.tag,
        from: 0,
        to: 10,
      });

      this.getArticlesByTagCount(this.$route.params.tag);
    },

    methods: {
      ...mapActions(['loadArticlesByTag', 'getArticlesByTagCount']),
    },
  };
</script>

<style lang="scss" scoped>
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .tag {
    @include view-wrapper;

    &-header {
      padding: $break 0;
      background-color: #fff;

      @include block-border-radius;
      @include view-wrapper;

      &-title {
        text-align: center;

        &-cta {
          color: $cta-color;
        }
      }

      &-articles_width_tag {
        text-align: center;
      }
    }
  }
</style>
