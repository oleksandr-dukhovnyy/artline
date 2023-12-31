<template>
  <div
    class="write"
    :class="{ wait: authLoading }"
    @click="(e) => (authLoading ? e.stopPropagation() : '')"
  >
    <div class="write-image">
      <div
        v-if="!conditions.previewON"
        class="write-image-title write-label"
      >
        Image:
      </div>
      <img
        class="write-image-image"
        :src="article.img"
        width="800"
        height="450"
        title="choose a photo"
        alt="article image"
        @click="modals.showImagePicker = true"
      />
    </div>

    <div
      class="write-tags"
      :class="{ 'write-tags-muted': !conditions.previewON }"
    >
      <div
        v-if="!conditions.previewON"
        class="write-tags-title write-label"
      >
        Tags:
      </div>
      <input
        v-if="!conditions.previewON"
        v-model.trim="tagsStr"
        class="write-tags-input"
        type="text"
        placeholder="tags, comma separated"
      />
      <div
        v-else
        class="write-tags-preview"
      >
        <div
          v-for="(tag, i) in article.tags"
          :key="i"
          class="write-tags-preview-tag"
        >
          {{ tag }}
        </div>
      </div>
    </div>

    <div class="write-title">
      <div
        v-if="!conditions.previewON"
        class="write-tags-title write-label"
      >
        Article title:
      </div>
      <input
        v-if="!conditions.previewON"
        v-model.trim="article.title"
        class="write-title-input"
        type="text"
        placeholder="Article title"
      />
      <div
        v-else
        class="write-title-preview"
      >
        <h1 class="write-title-preview-text">
          <span v-if="article.title.length > 0">
            {{ article.title }}
          </span>
          <span
            v-else
            class="muted"
          >
            title
          </span>
        </h1>
      </div>
    </div>

    <div
      v-if="!conditions.previewON"
      class="write-editor"
    >
      <div class="write-editor-title write-label"> Content: </div>
      <quill-editor
        v-model.trim="article.content"
        :options="editorOption"
        :read-only="true"
        @change="updateLocalStorage"
      />
    </div>

    <div
      v-else
      v-purify-html="preview"
      class="write-preview"
    ></div>

    <div class="write-controls">
      <button
        class="write-controls-submit"
        :class="{ 'cb-inactive': !articleIsValid }"
        :disabled="!articleIsValid"
        @click="submitArticle"
      >
        submit
      </button>
      <button
        class="write-controls-preview"
        @click="conditions.previewON = !conditions.previewON"
      >
        {{ conditions.previewON ? 'to editor' : 'to preview' }}
      </button>
    </div>

    <div class="write-modals">
      <Modal
        v-if="modals.showImagePicker"
        modal-type="prompt"
        :text="modals.pickImageText"
        placeholder="url"
        @prompt="setImage"
        @clickOutside="modals.showImagePicker = false"
        @promptCancel="modals.showImagePicker = false"
      />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Modal from '@/components/modal/Modal.vue';

  const DEFAULT_ARTICLE_IMG =
    'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png';
  const MIN_ARTICLE_LENGTH = 100;

  const UNCOMPLETED_LOCAL_KEY = 'uncomplated-article';
  let savedArticle = localStorage.getItem(UNCOMPLETED_LOCAL_KEY);

  if (savedArticle === null) {
    savedArticle = {
      img: DEFAULT_ARTICLE_IMG,
      content: '',
      tags: [],
      title: '',
    };
  } else {
    savedArticle = JSON.parse(savedArticle);
  }

  export default {
    name: 'NewArticle',
    components: {
      Modal,
    },
    data: () => ({
      editorOption: {
        placeholder: 'What do you want to write about?',
      },
      conditions: {
        previewON: false,
      },
      modals: {
        showImagePicker: false,
        pickImageText: 'Enter image url',
      },
      article: { ...savedArticle },
      tagsStr: savedArticle.tags.join(', '),
    }),

    computed: {
      ...mapGetters(['authLoading', 'sendNewArticleLoadingStatus']),
      preview() {
        if (this.article.content.length < 1) {
          return '<em style="color: #c2c2c2; font-style: italic;">empty...</em>';
        } else {
          return this.article.content;
        }
      },
      articleIsValid() {
        return [
          this.article.content.length > MIN_ARTICLE_LENGTH - 1,
          // this.article.img !== DEFAULT_ARTICLE_IMG,
          this.article.tags.length > 0,
          this.article.title.length > 2,
        ].every((r) => r);
      },
    },
    watch: {
      tagsStr() {
        this.article.tags = this.tagsStr
          .split(',')
          .map((tag) => {
            return tag.replace(/^\s|\s$/, '');
          })
          .filter((t) => t !== '' && !/^\s{0,}$/g.test(t));

        this.updateLocalStorage();
      },
      sendNewArticleLoadingStatus() {
        if (/done/g.test(this.sendNewArticleLoadingStatus)) {
          this.article = {
            img: DEFAULT_ARTICLE_IMG,
            content: '',
            tags: [],
            title: '',
          };
          this.updateLocalStorage();

          this.$router.push({
            name: 'article',
            params: {
              id: this.sendNewArticleLoadingStatus.replace(/.{0,}\:/g, ''),
            },
          });
        }
      },
    },
    methods: {
      ...mapActions(['sendNewArticle']),
      setImage(url) {
        this.modals.showImagePicker = false;

        if (url !== '' && url.length > 3) {
          this.article.img = url;
        } else {
          this.article.img = DEFAULT_ARTICLE_IMG;
        }

        this.updateLocalStorage();
      },
      submitArticle() {
        this.sendNewArticle(this.article);
      },
      updateLocalStorage() {
        localStorage.setItem(
          UNCOMPLETED_LOCAL_KEY,
          JSON.stringify(this.article)
        );
      },
    },
  };
</script>

<style lang="scss">
  $article-mobile-width: 100%;
  $article-desktop-width: 830px;

  .write-preview img {
    max-width: 100%;
  }

  .empty {
    color: #c2c2c2;
    font-style: italic;
  }

  .write {
    display: flex;
    flex-direction: column;
    margin: $break;
    padding: $break;

    @include view-wrapper;
    @include data-block;

    &-label {
      margin-bottom: 4px;
    }

    &-image {
      padding: $break 0;

      &-title {
        font-size: $font-size-s;
        font-weight: 700;
      }

      &-image {
        width: 100%;

        @include block-border-radius;
      }
    }

    &-controls {
      margin-top: $break;
      padding: $break 0;
      border-top: 1px solid $invisible-color;

      &-submit,
      &-preview {
        @include action-button;
      }

      &-submit {
        margin-right: $break;
      }
    }

    &-tags {
      width: max-content;
      padding-bottom: $break;
      transition: 0.7s;

      &-input {
        @include beauty-input;

        width: 200px !important;
        height: 30px !important;
      }

      &-title {
        font-size: $font-size-s;
        font-weight: 700;
      }

      &:hover {
        opacity: 1;
        transition: 0.7s;
      }

      &-preview {
        display: flex;

        &-tag {
          @include tag;
        }
      }
    }

    &-editor {
      flex: 1;

      &-title {
        font-size: $font-size-s;
        font-weight: 700;
      }
    }

    &-title {
      padding-bottom: $break;
      transition: 0.7s;

      &-input {
        @include beauty-input;
      }

      &-title {
        font-size: $font-size-s;
        font-weight: 700;
      }

      &:hover {
        opacity: 1;
        transition: 0.7s;
      }

      &-preview {
        display: flex;

        &-tag {
          @include tag;
        }
      }
    }
  }
</style>
