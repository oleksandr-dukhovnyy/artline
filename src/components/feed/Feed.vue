<template>
  <div class="feed">
    <FeedArticle
      v-for="(article, i) in articles"
      :key="i"
      :title="article.title"
      :creation-date="article.creationDate"
      :author="article.author"
      :body="article.body"
      :img="article.img"
      :article-id="article.id"
      :tags="article.tags"
    />
    <Pagination
      v-if="
        paginationItems > 1 && articles !== undefined && articles.length > 0
      "
      :pagination-pages="paginationItems"
      @selectPage="_loadArticles"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import FeedArticle from '@/components/feed/FeedArticle.vue';
  import Pagination from '@/components/feed/Pagination.vue';

  export default {
    name: 'NewsFeed',

    components: {
      FeedArticle,
      Pagination,
    },

    props: {
      articles: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      ...mapGetters(['paginationItems', 'articlesLoading', 'perPage']),
    },

    watch: {
      '$route.query.page'() {
        this.loadCurrentArticles();
      },
    },

    created() {
      if (
        this.articles !== undefined &&
        this.articles.length === 0 &&
        !this.articlesLoading
      ) {
        this.loadCurrentArticles();
      }
    },

    methods: {
      ...mapActions(['loadArticles']),
      _loadArticles(page) {
        if (page !== undefined && !isNaN(page)) {
          this.$router.push({ name: this.$route.name, query: { page } });
          this.loadCurrentArticles();
        }
      },

      loadCurrentArticles() {
        let queryPage = +this.$route.query.page - 1 || 0;

        if (queryPage < 0) {
          queryPage = 0;
          this.$router.push({
            name: this.$route.name,
            query: { page: this.paginationItems },
          });
        }

        if (queryPage > this.paginationItems && this.paginationItems !== null) {
          this.$router.push({
            name: this.$route.name,
            query: { page: this.paginationItems },
          });
          queryPage = this.paginationItems;
        }

        if (isNaN(queryPage)) {
          this.loadArticles({
            from: 0,
            to: this.perPage,
          });
        } else {
          this.loadArticles({
            from: queryPage * this.perPage,
            to: (queryPage + 1) * this.perPage,
          });
        }
      },
    },
  };
</script>

<style scoped>
  .feed {
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: center;
    margin: 16px 0 28px;
  }
</style>
