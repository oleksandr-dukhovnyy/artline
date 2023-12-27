<template>
  <div class="wrapper">
    <article
      v-if="article !== undefined"
      class="article animate__animated animate__slideInUp"
    >
      <div class="article-body-container">
        <h2 class="article-title">
          {{ article.title }}
        </h2>
        <div class="article-data">
          <div class="article-data-creation_date">{{
            article.creationDate
          }}</div>
          <div class="article-data-tags">
            <div
              v-for="(item, i) in article.tags"
              :key="i"
              class="article-data-tags-tag"
            >
              <router-link
                class="link"
                :to="{ name: 'tag', params: { tag: item } }"
              >
                {{ item }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <img
        v-if="article.img !== ''"
        class="article-img"
        :src="article.img"
        alt="article picture"
        width="800"
        height="450"
      />
      <div
        v-else
        class="article-picture_placeholder"
      ></div>

      <div class="article-body-container">
        <p
          v-purify-html="article.body"
          class="article-body"
        ></p>

        <div class="article-line"></div>

        <div class="article-author">
          <router-link
            class="article-author-link"
            :to="{ name: 'user', params: { id: article.author.id } }"
          >
            <img
              class="article-author-link-avatar"
              :src="article.author.avatar"
              :alt="`${article.author.name}'s avatar`"
              width="40"
              height="40"
            />
            <div class="article-author-link-name">
              {{ article.author.name }}
            </div>
          </router-link>
        </div>
      </div>
    </article>
    <div
      v-if="article !== undefined"
      class="comments"
    >
      <h4 class="comments-title"> Comments: {{ article.comments.length }} </h4>
      <div
        v-for="(articleComment, i) in article.comments"
        :key="i"
        class="comments-comment"
        :class="{
          loading: articleComment.loading,
          err: articleComment.status === 'err',
        }"
      >
        <div class="comments-comment-author">
          <img
            width="40"
            height="40"
            :src="articleComment.author.avatar"
            :alt="`${articleComment.author.name}'s avatar`"
            class="comments-comment-author-img"
          />
          <strong class="comments-comment-author-name">
            <router-link
              class="link"
              :to="{ name: 'user', params: { id: articleComment.author.id } }"
            >
              {{
                articleComment.author.name !== ''
                  ? articleComment.author.name
                  : articleComment.author.login
              }}
            </router-link>
          </strong>
          <div
            v-if="!articleComment.loading"
            class="comments-comment-author-time"
            >at {{ articleComment.time }}</div
          >
          <div
            v-else
            class="comments-comment-author-time"
            >loading...</div
          >
        </div>
        <p>
          {{ articleComment.commentBody }}
        </p>
      </div>
    </div>

    <div
      v-if="article !== undefined && user !== undefined && user !== null"
      class="write_comment"
    >
      <h4> Write a comment: </h4>
      <textarea
        v-model.trim="comment"
        class="write_comment-text_area"
        rows="8"
        placeholder="Write a comment here..."
        :class="{ loading: submitCommentCondition.loading }"
      ></textarea>
      <div
        v-if="submitCommentCondition.status === 'error'"
        class="write_comment-error"
      >
        {{ submitCommentCondition.msg }}
      </div>
      <button
        class="write_comment-submit"
        :disabled="comment.length === 0"
        :class="{ 'cb-unactive': comment.length === 0 }"
        @click="submitComment"
      >
        submit
      </button>
    </div>
    <div
      v-else-if="article !== undefined"
      class="write_comment-not-logged"
    >
      <router-link :to="{ name: 'registration' }">Register</router-link>
      or
      <router-link :to="{ name: 'login' }">login</router-link>
      to leave a comment
    </div>

    <div
      v-else
      class="loader"
    >
      <Loader />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import API from '@/api/index.api.js';
  import Loader from '@/components/loader/LoaderLines.vue';
  import getDate from '@/js/getCurrentTime.js';

  export default {
    name: 'TheArticle',
    components: {
      Loader,
    },
    data: () => ({
      showComments: true,
      comment: '',
      laodedArticle: undefined,
      submitCommentCondition: {
        status: '',
        msg: '',
      },
    }),
    computed: {
      ...mapGetters(['articlesLoading', 'user']),
      article() {
        let article = this.$store.getters.articles.find(
          (article) => article.id === +this.$route.params.id
        );

        if (article === undefined && this.articlesLoading === true) {
          this.loadArticle();
          return this.laodedArticle;
        }

        return article;
      },
    },
    created() {
      if (this.$store.getters.articles.length === 0) {
        this.loadArticles();
      }
    },

    methods: {
      ...mapActions(['loadArticles', 'sendComment']),
      loadArticle() {
        const promise = API.core.get('/article', this.$route.params.id);

        promise.then((data) => {
          this.laodedArticle = data;
        });

        promise.catch((e) => {
          console.log('[Article.vue > loadArticle]: err', e);
          this.$router.replace({ name: 'page404' });
        });
      },
      submitComment() {
        const localComment = {
          articleID: this.article.id,
          commentBody: this.comment,
          author: {
            ...this.user,
          },
          loading: true,
          status: '',
          time: getDate(),
        };

        const newComment = {
          articleID: this.article.id,
          commentBody: this.comment,
          done: () => {
            localComment.loading = false;
          },
          failed() {
            localComment.status = 'err';
          },
        };

        this.comment = '';

        this.insertCommentToArticleComments(localComment);

        this.sendComment(newComment);
      },
      insertCommentToArticleComments(comment) {
        this.article.comments.push(comment);
      },
    },
  };
</script>

<style lang="scss">
  .wrapper .article img {
    width: 100%;
  }
</style>

<style lang="scss" scoped>
  // local vars
  $article-width-desktop: 820px;
  $article-width-tablet: 700px;
  $article-width-mobile: 100%;

  // /local vars

  .link {
    @include link;
  }

  .loader {
    height: 84vh;
    display: flex;
    padding: auto;
    align-items: center;
    justify-content: center;
  }

  .article {
    margin: 30px 0;
    position: relative;

    @include view-wrapper;
    @include data-block;

    &-body-container {
      padding: $break 10px;
    }

    &-title {
      margin: $break 0;
      word-wrap: break-word;

      &-link {
        @include link;

        text-decoration: none;
        color: #000 !important;
        font-weight: 500;
      }
    }

    &-picture_placeholder {
      height: 450px;
    }

    &-img {
      width: 100%;
      height: auto;
    }

    &-data {
      display: grid;
      width: max-content;
      grid-template-columns: 110px 1fr;
      align-items: center;
      grid-gap: $break;
      padding: 0 0 10px;
      font-size: $font-size-s;
      font-style: italic;

      &-tags {
        display: grid;
        grid-auto-flow: dense;
        grid-template-columns: repeat(5, auto);
        grid-column-gap: 5px;
        grid-template-rows: 1fr;
        margin-top: 8px;

        &-tag {
          @include tag;

          overflow: hidden;
        }
      }
    }

    &-read_more {
      width: 100px;
      border: 1px solid $main-color;
      color: $main-color;

      @include button;
    }

    &-author {
      &-link {
        width: max-content;
        display: grid;
        align-items: center;
        grid-template-columns: $avatar-size-m 1fr;
        grid-gap: $break;

        &-avatar {
          @include avatar;
        }
      }
    }

    &-line {
      width: 100%;
      height: 1px;
      background-color: $home-background-color;
      margin: 10px auto;
    }

    &-body {
      word-wrap: break-word;

      img {
        max-width: 100%;
      }
    }
  }

  .comments {
    margin-bottom: 25px;
    padding: $break;

    @include data-block;

    & > *:nth-child(2) {
      border: none;
    }

    &-comment {
      border-top: 1px solid $home-background-color;
      padding-top: 15px;

      &-author {
        display: grid;
        align-items: center;
        grid-template-columns: $avatar-size-m max-content 1fr;
        grid-gap: 10px;

        &-img {
          @include avatar;
        }

        &-time {
          font-style: italic;
          font-size: $font-size-s;
          color: $muted-text-color;
        }
      }

      &.loading {
        opacity: 0.7;
      }

      &.err {
        &::after {
          content: 'Error! No comment was sent!';
          color: $red;
          font-style: italic;
          opacity: 1;
        }
      }
    }

    &-title {
      margin: $break 0;
    }
  }

  .write_comment {
    padding: $break;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    gap: 14px;

    button {
      width: max-content;
    }

    @include data-block;

    &-text_area {
      width: 100%;
      resize: vertical;
      min-height: 70px;
      max-height: 1000px;

      &.loading {
        opacity: 0.7;
      }
    }

    &-error {
      color: $red;
      font-style: italic;
      padding: $break 0;
    }

    &-submit {
      @include action-button;

      border: 1px solid $cta-color;
      color: $cta-color;
    }

    &-not-logged {
      @include data-block;

      padding: 25px $break;
      margin-bottom: 25px;
    }
  }
</style>
