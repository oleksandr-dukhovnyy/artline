<template>
  <section class="home">
    <div v-if="!articlesLoading">
      <PopularTags />
      <Feed :articles="articles" />
    </div>
    <div
      v-else
      class="home-loader"
    >
      <Loader />
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Feed from '@/components/feed/Feed.vue';
  import PopularTags from '@/components/PopularTags.vue';
  import Loader from '@/components/loader/LoaderLines.vue';

  export default {
    name: 'HomeView',
    components: { Feed, PopularTags, Loader },
    computed: {
      ...mapGetters(['articlesLoading', 'articles']),
    },
    created() {
      const queryPage = +this.$route.query.page - 1 || 0;

      this.loadArticles({
        from: queryPage * 10,
        to: (queryPage + 1) * 10,
      });
    },
    methods: {
      ...mapActions(['loadArticles']),
    },
  };
</script>

<style lang="scss" scoped>
  .home {
    @include view-wrapper;

    margin-top: 0;

    &-loader {
      height: $default-content-height;
    }
  }
</style>
