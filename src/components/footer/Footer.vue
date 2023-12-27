<template>
  <footer class="footer">
    <div class="footer-logo">
      <router-link
        class="footer-logo-text"
        :to="{ name: 'home' }"
        >ARTLINE</router-link
      >
    </div>
    <FooterCopyright />
  </footer>
</template>

<script>
  import FooterCopyright from '@/components/footer/Copyright.vue';

  export default {
    name: 'TheFooter',
    components: {
      FooterCopyright,
    },
  };
</script>

<style lang="scss" scoped>
  .footer {
    height: 180px;
    background-color: $main-color;
    position: relative;

    &-logo {
      padding: 20px;
      justify-content: center;
      display: flex;

      &-text {
        font-size: 28px;
        color: #fff;
        text-decoration: none;
      }
    }

    &-author {
      position: absolute;
      bottom: 10px;
      font-size: $font-size-s;
      color: #fff;
      text-align: center;
      width: 100%;

      &-email {
        margin-left: 10px;
      }
    }
  }
</style>
