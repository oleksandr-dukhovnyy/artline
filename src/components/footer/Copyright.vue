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
    font-size: 12px;
    display: flex;
    bottom: 30px;
    justify-content: center;
    position: absolute;
    text-align: center;
    width: 100%;
    height: 23px;

    div {
      border-top: 1px solid #fff;
      padding-top: 10px;
      width: 310px;
      color: #999;
    }

    a {
      text-decoration: underline;
      color: #999;
    }
  }
</style>
