<template>
  <section class="registration animate__animated animate__fadeIn">
    <h2 class="registration-title">Registration</h2>
    <form
      class="registration-form"
      @submit.prevent="submit"
    >
      <input
        v-model.trim="data.login"
        type="text"
        placeholder="login"
        class="registration-form-input registration-form-login"
      />

      <input
        v-model.trim="data.email"
        type="email"
        placeholder="email"
        class="registration-form-input registration-form-password"
      />

      <input
        v-model.trim="data.password"
        type="password"
        placeholder="password"
        class="registration-form-input registration-form-password"
      />

      <hr />

      <div
        v-if="isAuthError !== null && authError !== null"
        class="registration-form-error"
      >
        {{ authError.msg }}
      </div>

      <div class="registration-form-submit">
        <input
          type="submit"
          class="registration-form-submit-bttn"
          :class="{ loading: condition.loading }"
          :disabled="condition.loading"
          value="submit"
        />
      </div>
    </form>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'RegistrationView',
    data: () => ({
      data: {
        login: 'bla-bla-' + Math.floor(Math.random() * 9999),
        password: '123123123',
        email: 'some@gmail.com',
      },
      errors: {
        login: false,
        password: false,
        email: false,
      },
      condition: {
        loading: false,
      },
    }),
    computed: {
      ...mapGetters(['user', 'isAuthError', 'authError', 'authLoading']),
    },
    watch: {
      user() {
        if (this.isAuthError === false) {
          this.redirect();
          this.data = {
            login: '',
            password: '',
            email: '',
          };
        }
      },
      authLoading() {
        this.condition.loading = this.authLoading;
      },
    },
    methods: {
      ...mapActions(['register']),
      submit() {
        this.register(this.data);
      },
      redirect() {
        this.$router.push({ name: 'home' });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .registration {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 83vh;

    &-form {
      display: flex;
      flex-direction: column;
      gap: 14px;
      justify-content: flex-start;
      align-items: center;
      width: 350px;
      padding: $break;
      background-color: #fff;

      @include block-border-radius;

      hr {
        width: 100%;
        height: 1px;
        border: none;
        background-color: $muted-text-color;
      }

      &-input {
        @include input;

        &.error {
          @include input-error;
        }
      }

      &-submit {
        width: 100%;

        &-bttn {
          // height: 35px;
          width: 100%;
          padding: 14px 20px;

          @include button;
        }
      }

      &-error {
        padding: 0 5px 10px;
        color: #f00;
        font-style: italic;
      }
    }
  }

  .disabled {
    @include loading-animation-text;

    &,
    &:hover,
    &:active {
      cursor: progress !important;
    }
  }
</style>
