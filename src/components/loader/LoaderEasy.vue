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
    position: relative;
    width: 140px;

    div {
      position: absolute;
      top: 0;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background-color: hsl(0deg, 0%, 100%);
      transform: translateY(20px);
      animation: bounce 1s ease-in-out infinite;

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
