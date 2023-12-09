<template>
  <div class="home-popular_tags">
    <strong> Popular tags: </strong>
    <div class="home-popular_tags-contain">
      <div
        class="home-popular_tags-contain-tag"
        v-for="(tag, i) in popularTags"
        :key="i"
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
    methods: {
      ...mapActions(['loadPopularTags']),
    },
    created() {
      if (this.popularTagsLoaded === false) {
        this.loadPopularTags();
      }
    },
  };
</script>

<style lang="scss" scoped>
  .home-popular_tags {
    margin-top: $break;
    background-color: #fff;
    height: max-content;
    padding: $break;
    border-radius: $border-radius;

    @include mobile {
      & {
        grid-row: 1;
      }
    }

    @include desktop-s {
      & {
        display: none;
      }
    }

    &-contain {
      display: grid;
      grid-auto-flow: dense;
      grid-gap: 5px;
      grid-template-rows: repeat(10, auto);
      grid-template-columns: 1fr 1fr;
      margin-top: $break;
      width: 100%;

      @include mobile {
        & {
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: minmax(1fr, max-content);
          grid-template-rows: auto;
        }
      }

      &-tag {
        width: max-content;
        height: max-content;

        @include tag;
      }
    }
  }

  .link {
    @include link;

    font-style: italic;
    font-size: $font-size-sm;
  }
</style>
