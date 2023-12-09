<template>
  <div class="contain animate__animated animate__zoomIn">
    <div>
      <strong> Error | 404 </strong>
      <p> something went wrong... </p>
      <p>
        <router-link
          class="go-to-home"
          :to="{ name: 'home' }"
          >go to home page</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageError404',
  };
</script>

<style lang="scss" scoped>
  .contain {
    height: calc(100vh - 35px);
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;
    }

    strong {
      font-size: 50px;
      font-weight: bolder;
    }
  }

  .go-to-home {
    @include link;
  }
</style>
