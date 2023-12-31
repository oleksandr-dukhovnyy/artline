<template>
  <footer class="footer">
    <div class="footer-logo">
      <router-link
        class="footer-logo-text"
        :to="{ name: 'home' }"
        @click.native="scrollToTop"
        >ARTLINE</router-link
      >
    </div>
    <FooterCopyright />
  </footer>
</template>

<script>
  import FooterCopyright from '@/components/footer/Copyright.vue';
  import scrollToTop from '@/js/scroll-to-top';

  export default {
    name: 'TheFooter',
    components: {
      FooterCopyright,
    },
    methods: {
      scrollToTop() {
        scrollToTop();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .footer {
    position: relative;
    height: 180px;
    background-color: $main-color;

    &-logo {
      display: flex;
      justify-content: center;
      padding: 20px;

      &-text {
        color: #fff;
        font-size: 28px;
        text-decoration: none;
      }
    }

    &-author {
      position: absolute;
      bottom: 10px;
      width: 100%;
      color: #fff;
      font-size: $font-size-s;
      text-align: center;

      &-email {
        margin-left: 10px;
      }
    }
  }
</style>
