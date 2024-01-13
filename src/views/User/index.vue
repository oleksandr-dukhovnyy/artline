<template>
  <section class="user-view animate__animated animate__slideInUp">
    <template v-if="user">
      <UserInfo :user="user" />
      <UserActivity
        :user-articles="userArticles"
        :user-comments="userComments"
      />
    </template>

    <Loader v-else />
  </section>
</template>

<script>
  import API from '@/api/index.api.js';
  import Loader from '@/components/loader/LoaderLines.vue';

  import UserInfo from './UserInfo.vue';
  import UserActivity from './UserActivity/index.vue';

  export default {
    name: 'UserPage',
    components: {
      Loader,
      UserInfo,
      UserActivity,
    },

    data: () => ({
      user: null,
      userArticles: [],
      userComments: [],
    }),

    watch: {
      '$route.params.id'(n) {
        loadUserData.call(this, n);
      },
    },

    created() {
      loadUserData.call(this, this.$route.params.id);
    },
  };

  // Helpers
  /**
   * Loads user data based on the given user ID.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<void>} - A Promise that resolves when the user data is loaded.
   */
  async function loadUserData(userId) {
    const user = await API.getUser(userId);

    if (user === undefined || user.id === undefined)
      return this.$router.replace({ name: 'page404' });

    this.user = user;

    await loadArticlesAndComments.call(this, [
      ...this.user.posts,
      ...this.user.commented,
    ]);
  }

  /**
   * Loads articles and their corresponding comments based on the provided article IDs.
   *
   * @param {Array} articlesIDs - An array of article IDs to load comments for.
   * @return {Promise} A Promise that resolves to undefined.
   */
  async function loadArticlesAndComments(articlesIDs) {
    const { articles } = await API.getArticles('', '', {
      arrOfId: articlesIDs,
    });

    const userArticles = [];
    const userComments = [];

    articles.forEach((article) => {
      if (article.author.id === this.user.id) {
        userArticles.push(article);
      }

      article.comments.forEach((comment) => {
        if (this.user.id === comment.author.id) {
          userComments.push({
            comment,
            article: {
              title: article.title,
              id: article.id,
            },
          });
        }
      });
    });

    this.userArticles = userArticles;
    this.userComments = userComments;
  }
</script>

<style lang="scss" scoped>
  .user-view {
    @include view-wrapper;
    @include block-border-radius;

    height: max-content;
    margin: $break 0;
    padding: $break;
    background-color: #fff;
  }
</style>
