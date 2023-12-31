<template>
  <div
    v-if="userArticles.length > 0"
    class="articles animate__animated animate__fadeInUp"
  >
    <div
      v-for="(article, i) in userArticles"
      :key="i"
      class="articles__article"
    >
      <div class="articles__article-img">
        <img
          :src="article.img"
          alt="_article_img"
          width="800"
          height="450"
          class="articles__article-img-img"
        />
      </div>
      <div class="articles__article-header">
        <h3 class="articles__article-header-title">
          <router-link
            :to="{ name: 'article', params: { id: article.id } }"
            class="articles__article-header-title-link"
          >
            {{ article.title }}
          </router-link>
        </h3>
        <div class="articles__article-header-time">
          at {{ article.creationDate }}
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="muted"
  >
    The user has not written an article yet
  </div>
</template>

<script>
  export default {
    name: 'UserArticles',
    props: {
      userArticles: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style lang="scss" scoped>
  .articles {
    &__article {
      display: grid;
      grid-template-rows: max-content 1fr;
      grid-template-columns: 100%;
      padding: $break 0;
      border-top: 1px solid #fff;

      &:first-of-type {
        border-top: none;
      }

      img {
        width: 100%;
        height: auto;
        margin-bottom: $break;
      }

      &-header {
        &-title {
          margin-top: 0;

          &-link {
            @include link;
          }
        }

        &-time {
          color: #555;
          font-style: italic;
        }
      }
    }
  }
</style>
