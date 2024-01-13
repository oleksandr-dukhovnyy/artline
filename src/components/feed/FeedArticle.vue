<template>
  <article class="article">
    <div class="article-content">
      <h2 class="article-title">
        <router-link
          class="article-title-link scalable"
          :to="{ name: 'article', params: { id: articleId } }"
        >
          {{ title }}
        </router-link>
      </h2>
      <div class="article-data">
        <div class="article-data-creation_date">{{ creationDate }}</div>
        <router-link
          class="link scalable animate__animated animate__slideInRight animate__faster"
          :to="{ name: 'user', params: { id: author.id } }"
        >
          <div class="article-data-author">{{ author.name }}</div>
        </router-link>
        <div class="article-data-tags">
          <div
            v-for="(item, i) in tags"
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
      v-if="img"
      class="article-img animate__animated animate__fadeIn animate__faster"
      :src="img"
      :alt="title"
      width="800"
      height="450"
    />
    <div
      v-else
      class="article-picture_placeholder"
    ></div>
    <div class="article-content">
      <p
        v-purify-html.clear-all="shortBody"
        class="article-preview"
      ></p>
      <router-link
        class="article-read_link animate__animated animate__zoomIn"
        :to="{ name: 'article', params: { id: articleId } }"
      >
        <button class="article-read_more"> read more... </button>
      </router-link>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'FeedArticle',
    props: {
      title: {
        type: String,
        default: '',
      },
      creationDate: {
        type: String,
        default: '',
      },
      author: {
        type: Object,
        default: () => {},
      },
      body: {
        type: String,
        default: '',
      },
      img: {
        type: String,
        default: '',
      },
      articleId: {
        type: Number,
        default: -1,
      },
      tags: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      shortBody() {
        const content = this.body.slice(0, 300).trim();

        if (this.body.length > 300) return `${content}...`;

        return content;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .article {
    margin: 0 auto;
    background-color: #fff;

    @include block-border-radius;

    &-preview {
      font-size: 18px;
      word-wrap: break-word;
    }

    &-content {
      padding: $break;
    }

    &-title {
      margin: $break 0;

      &-link {
        @include link;

        color: #000 !important;
        font-weight: 500;
        text-decoration: none;
      }
    }

    &-picture_placeholder {
      width: 800px;
      height: 450px;
      margin: $break;
    }

    &-img {
      width: 100%;
      height: auto;
    }

    &-data {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 110px 1fr;
      grid-column-gap: 0;
      align-items: center;
      width: max-content;
      padding: 0 0 10px;
      font-size: $font-size-s;
      font-style: italic;

      &-author {
        font-size: 14.4px; // 0.9em
        font-weight: 700;
      }

      &-creation_date {
        width: max-content;
      }
    }

    &-read {
      &_link {
        display: flex;
        width: max-content;
        text-decoration: none;
      }

      &_more {
        @include button;

        width: max-content;
      }
    }

    &-data-tags {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: repeat(5, auto);
      grid-auto-flow: dense;
      grid-column-gap: 5px;
      width: max-content;
      margin-top: 8px;

      &-tag {
        @include tag;
      }
    }
  }

  .link {
    @include link;
  }
</style>
