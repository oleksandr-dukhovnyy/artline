<template>
  <div class="wrapper">
    <div>
      © <a :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FooterCopyright',
    data: () => ({
      email: 'script@vip-person.net',
    }),
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 23px;
    font-size: 12px;
    text-align: center;

    div {
      width: 310px;
      padding-top: 10px;
      border-top: 1px solid #fff;
      color: #999;
    }

    a {
      color: #999;
      text-decoration: underline;
    }
  }
</style>
