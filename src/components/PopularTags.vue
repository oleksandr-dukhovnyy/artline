<template>
  <div class="tags">
    <div class="tags__contain animate__animated animate__zoomIn">
      <strong> Popular tags: </strong>
      <div
        v-for="(tag, i) in popularTags"
        :key="i"
        class="tags__tag"
      >
        <router-link
          class="link"
          :to="{ name: 'tag', params: { tag } }"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'PopularTags',
    computed: {
      ...mapGetters(['popularTags', 'popularTagsLoaded']),
    },
    created() {
      if (this.popularTagsLoaded === false) {
        this.loadPopularTags();
      }
    },
    methods: {
      ...mapActions(['loadPopularTags']),
    },
  };
</script>

<style lang="scss" scoped>
  .tags {
    height: max-content;
    min-height: 65px;
    padding: $break;
    background-color: #fff;

    // height: 65px;

    @include block-border-radius;

    &__contain {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;

      strong {
        display: flex;
        align-items: center;
      }
    }

    &__tag {
      display: inline-block;
      margin: 5px;

      @include tag;
    }
  }

  .link {
    @include link;

    font-size: $font-size-sm;
    font-style: italic;
  }
</style>
