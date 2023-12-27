<template>
  <div class="tags">
    <strong> Popular tags: </strong>
    <div class="tags__contain">
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
    margin-top: $break;
    background-color: #fff;
    height: max-content;
    padding: $break;

    @include block-border-radius;

    &__contain {
      margin-top: $break;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    &__tag {
      display: inline-block;
      margin: 5px;

      @include tag;
    }
  }

  .link {
    @include link;

    font-style: italic;
    font-size: $font-size-sm;
  }
</style>
