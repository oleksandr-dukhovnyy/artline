<template>
  <div
    v-if="userComments.length > 0"
    class="comments animate__animated animate__zoomIn"
  >
    <div
      v-for="(comment, i) in userComments"
      :key="i"
      class="comments__comment"
    >
      <h3 class="comments__comment-article_title">
        <router-link
          :to="{ name: 'article', params: { id: comment.article.id } }"
          class="comments__comment-article_title-link"
        >
          {{ comment.article.title }}
        </router-link>
      </h3>
      <div class="comments__comment-author">
        <img
          :src="comment.comment.author.avatar"
          alt="user_avatar"
          width="40"
          height="40"
          class="comments__comment-author-img"
        />
        <strong class="comments__comment-author-name">
          <div class="link">
            {{ comment.comment.author.name }}
          </div>
        </strong>
        <div class="comments__comment-author-time">
          {{ comment.comment.time }}
        </div>
      </div>
      <p>
        {{ comment.comment.commentBody }}
      </p>
    </div>
  </div>
  <div
    v-else
    class="muted"
  >
    The user has not left comments on the articles yet
  </div>
</template>

<script>
  export default {
    name: 'UserArticles',
    props: {
      userComments: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>

<style lang="scss" scoped>
  .comments {
    padding-top: 15px;

    & > * {
      border-top: 1px solid #e6e6e6;
    }

    &__comment {
      padding: 5px 0;

      &:nth-child(1) {
        border-top: 1px solid #fff !important;
      }

      &-author {
        display: grid;
        grid-template-columns: $avatar-size-m max-content 1fr;
        grid-gap: 10px;
        align-items: center;
        font-size: $font-size-sm;

        &-img {
          @include avatar;
        }

        &-name {
          font-weight: 300;
        }

        &-time {
          margin-top: 0.1em;
          font-size: $font-size-sm;
          font-style: italic;
          opacity: 0.5;
        }
      }

      &-article_title {
        font-size: $font-size-sm;

        &-link {
          color: #555 !important;
          font-weight: 500;
          font-style: italic;

          @include link;
        }
      }
    }
  }
</style>
