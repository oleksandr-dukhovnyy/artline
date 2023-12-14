<template>
  <section class="login animate__animated animate__fadeIn">
    <form
      class="login-form"
      @submit.prevent="submit"
    >
      <h2 class="login-title">Login</h2>

      <input
        v-model.trim="data.login"
        type="text"
        placeholder="login"
        class="login-form-input login-form-login"
        :class="{ error: errors.login }"
      />

      <input
        v-model.trim="data.password"
        type="password"
        placeholder="password"
        class="login-form-input login-form-password"
        :class="{ error: errors.password }"
      />

      <div
        v-if="isAuthError !== null && authError !== null"
        class="login-form-error"
      >
        {{ authError.msg }}
      </div>

      <hr />

      <div class="login-form-submit">
        <input
          type="submit"
          class="login-form-submit-bttn"
          :class="{ disabled: conditions.loading }"
          :disabled="conditions.loading"
          value="submit"
        />
      </div>
    </form>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'TheLogin',
    data: () => ({
      data: {
        login: 'jess-still',
        password: '123456',
      },
      errors: {
        login: false,
        password: false,
      },
      conditions: {
        loading: false,
      },
    }),
    computed: {
      ...mapGetters(['isAuthError', 'authError', 'user', 'authLoading']),
    },
    watch: {
      user: function () {
        if (this.isAuthError === false) {
          this.data = {
            login: '',
            password: '',
          };
        }
      },
      authLoading: function () {
        this.conditions.loading = this.authLoading;
      },
    },

    methods: {
      ...mapActions(['login']),
      submit() {
        this.login(this.data);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 83vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &-form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 14px;
      align-items: center;
      padding: $break;
      width: 350px;
      background-color: #fff;
      border-radius: $border-radius;

      hr {
        height: 1px;
        width: 100%;
        background-color: $muted-text-color;
        border: none;
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
        color: #f00;
        padding: 0 5px 10px;
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
