<template>
  <div>
    <div
      id="loop"
      class="center"
    ></div>
    <div
      id="bike-wrapper"
      class="center"
    >
      <div
        id="bike"
        class="center-bike"
      ></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoaderBike',
  };
</script>

<style lang="scss" scoped>
  .center-bike {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 26px;
    margin-left: -12px;
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
  }

  #loop {
    width: 108px;
    height: 108px;
    border: $main-color solid 4px;
    border-radius: 200px;
  }

  #loop::before {
    content: '';
    position: relative;
    top: 100px;
    left: -100px;
    display: block;
    width: 300px;
    height: 4px;
    background: linear-gradient(
      to left,
      rgba(187, 95, 39, 0%) 0%,
      $main-color 30%,
      $main-color 70%,
      rgba(187, 95, 39, 0%) 100%
    );
  }

  #bike-wrapper {
    width: 108px;
    height: 108px;
    animation: drive 4s linear infinite;
  }

  #bike {
    width: 25px;
    height: 24px;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/133687/motorbike.png');
  }

  @keyframes drive {
    0% {
      margin-left: -364px;
      opacity: 0;
    }

    33% {
      margin-left: -50px;
      opacity: 1;
      transform: rotate(0deg);
    }

    66% {
      margin-left: -50px;
      opacity: 1;
      transform: rotate(-360deg);
    }

    100% {
      margin-left: 264px;
      opacity: 0;
      transform: rotate(-360deg);
    }
  }
</style>
