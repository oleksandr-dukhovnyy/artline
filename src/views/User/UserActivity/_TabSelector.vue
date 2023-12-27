<template>
  <div class="tab-selector">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-selector__button"
      :class="{ active: showNow === tab.id }"
      @click="$emit('show-user-actions', tab.id)"
    >
      {{ tab.buttonText }} ({{ tab.count }})
    </button>
  </div>
</template>

<script>
  export default {
    name: 'TabSelector',

    props: {
      showNow: {
        type: String, // 'articles' or 'comments'
        default: 'articles',
      },

      commentsCount: {
        type: Number,
        default: 0,
      },

      articlesCount: {
        type: Number,
        default: 0,
      },
    },
    emits: {
      showUserActions: String,
    },
    computed: {
      tabs() {
        return [
          {
            id: 'articles',
            buttonText: 'User articles',
            count: this.articlesCount,
          },
          {
            id: 'comments',
            buttonText: 'User commented',
            count: this.commentsCount,
          },
        ];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tab-selector {
    margin-bottom: -1px;
    margin-left: 3px;

    &__button {
      margin-right: -1px;

      @include action-button;

      border-radius: 0;
      background-color: #fff;

      &.active {
        border-bottom: 1px solid transparent;
      }
    }
  }
</style>
