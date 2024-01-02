<template>
  <div class="separator">
    <span> {{ title }} </span>
  </div>
</template>

<script>
  export default {
    name: 'ResultsSeparator',
    props: {
      title: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style scoped lang="scss">
  $color: #bdbdbd;

  .separator {
    width: 100%;
    margin: 15px 0 -6px;

    span {
      color: $color;
      font-size: 14px;
    }

    hr {
      height: 1px;
      margin: 0;
      margin-bottom: 6px;
      border: none;
      background-color: $color;
    }
  }
</style>
