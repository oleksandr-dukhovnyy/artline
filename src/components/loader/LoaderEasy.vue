<template>
  <div class="bounce">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'EasyLoader',
  };
</script>

<style lang="scss" scoped>
  .bounce {
    width: 140px;
    position: relative;

    div {
      border-radius: 100%;
      height: 10px;
      width: 10px;
      background-color: hsl(0deg, 0%, 100%);
      animation: bounce 1s ease-in-out infinite;
      position: absolute;
      top: 0;
      transform: translateY(20px);

      &:first-of-type {
        left: -20px;
        animation-delay: 0.2s;
      }

      &:nth-of-type(2) {
        animation-delay: 0.1s;
      }

      &:last-of-type {
        left: 20px;
      }
    }
  }

  @keyframes bounce {
    50% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(20px);
    }
  }
</style>
