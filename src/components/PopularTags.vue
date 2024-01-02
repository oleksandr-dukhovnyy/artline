<template>
  <div class="tags">
    <strong> Popular tags: </strong>
    <div class="tags__contain">
      <div
        v-for="(tag, i) in popularTags"
        :key="i"
        class="tags__tag animate__animated animate__zoomIn"
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
    padding: $break;
    background-color: #fff;

    @include block-border-radius;

    &__contain {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-top: $break;
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
