<template>
  <section class="home">
    <div
      v-if="!articlesLoading"
      class="home-content"
    >
      <Feed :articles="articles" />
      <PopularTags />
    </div>
    <div
      v-else
      class="home-loader"
    >
      <Loader />
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  import Feed from '@/components/feed/Feed.vue';
  import PopularTags from '@/components/popular_tags/Popular_tags.vue';

  import Loader from '@/components/loader/LoaderLines.vue';

  export default {
    name: 'HomeView',
    components: { Feed, PopularTags, Loader },
    computed: {
      ...mapGetters(['articlesLoading', 'articles']),
    },
    // mounted() {
    // console.log('DEVICE_SCREEN_WIDTH', this.DEVICE_SCREEN_WIDTH);
    // alert('DEVICE_SCREEN_WIDTH: ' + this.DEVICE_SCREEN_WIDTH)
    // },
  };
</script>

<style lang="scss" scoped>
  .home {
    &-content {
      display: grid;
      grid-template-columns: 4fr 1fr;
      grid-gap: 30px;
      padding: 0 3%;
      max-width: $max-width;

      @include mobile {
        & {
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr;
          grid-gap: $break;
        }
      }

      @include mobile-m {
        width: 335px;
      }

      @include desktop {
        width: 850px;
      }

      @include desktop-s {
        grid-template-columns: 1fr;
      }
    }

    &-loader {
      height: $default-content-height;
    }
  }
</style>
