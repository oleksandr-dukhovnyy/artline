<template>
  <article class="article">
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
        class="link scalable"
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
    <img
      v-if="img"
      class="article-img"
      :src="img"
      :alt="title"
      width="800"
      height="450"
    />
    <div
      v-else
      class="article-picture_placeholder"
    ></div>
    <p
      class="article-preview"
      v-purify-html="body.slice(0, 300)"
    ></p>
    <router-link
      class="article-read_link"
      :to="{ name: 'article', params: { id: articleId } }"
    >
      <button class="article-read_more"> read more... </button>
    </router-link>
  </article>
</template>

<script>
  export default {
    name: 'FeedArticle',
    filters: {
      getFirstFewRows(t) {
        const sliced = t.split('').slice(0, 300);

        return sliced.join('') + '...';
      },
    },
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
  };
</script>

<style lang="scss" scoped>
  .article {
    background-color: #fff;
    padding: 10px $break;
    border-radius: $border-radius;
    width: 820px;
    position: relative;

    @include mobile {
      width: 100%;
    }

    @include tablet-landscape {
      width: 100%;
    }

    @include tablet-portrait {
      width: 500px;
    }

    // @include tablet-s {
    // 	@include landscape {
    // 		width: 100%;
    // 	}

    // 	@include portrait {
    // 		width: 500px;
    // 	}
    // }

    &-preview {
      word-wrap: break-word;
      padding-top: calc(52% + 14px);
    }

    &-title {
      margin: $break 0;

      &-link {
        @include link;

        text-decoration: none;
        color: #000 !important;
        font-weight: 500;
      }
    }

    &-picture_placeholder {
      width: 800px;
      height: 450px;
      margin: $break;
    }

    &-img {
      width: 100%;
      margin: 0 auto;
      display: flex;
      position: absolute;
      left: 0;
      color: #dedede;
      font-style: italic;
    }

    &-data {
      display: grid;
      width: max-content;
      grid-template-columns: 110px 1fr;
      grid-column-gap: 0;
      padding: 0 0 10px;
      font-size: $font-size-s;
      font-style: italic;

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
      grid-auto-flow: dense;
      grid-template-columns: repeat(5, auto);
      grid-column-gap: 5px;
      grid-template-rows: 1fr;
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
