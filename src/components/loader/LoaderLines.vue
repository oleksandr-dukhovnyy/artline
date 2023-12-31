<template>
  <div class="wrapper">
    <div> Loading... </div>
  </div>
</template>

<script>
  export default {
    name: 'LoaderLines',
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    div {
      margin: auto 0;
    }
  }
</style>
