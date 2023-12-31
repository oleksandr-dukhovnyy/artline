<template>
  <div
    class="modal"
    @click.self.stop="clickOutside"
  >
    <div
      v-if="modalType === 'confirm'"
      class="modal-confirm animate__animated animate__fadeInUp"
    >
      <p
        v-purify-html="text"
        class="modal-confirm-text"
      ></p>
      <div class="modal-confirm-controls">
        <button
          class="modal-confirm-controls-ok"
          @click="confirm('ok')"
        >
          ok
        </button>
        <button
          class="modal-confirm-controls-cancel"
          @click="confirm('cancel')"
        >
          cancel
        </button>
      </div>
    </div>

    <div
      v-if="modalType === 'prompt'"
      class="modal-prompt animate__animated animate__fadeInUp"
    >
      <p
        v-purify-html="text"
        class="modal-prompt-text"
        style="margin-bottom: 4px"
      ></p>
      <input
        v-model.trim="promptText"
        type="text"
        :placeholder="placeholder"
        class="modal-prompt-input"
      />
      <div class="modal-prompt-controls">
        <button
          class="modal-prompt-controls-ok"
          @click="prompt('ok')"
        >
          ok
        </button>
        <button
          class="modal-prompt-controls-cancel"
          @click="prompt('cancel')"
        >
          cancel
        </button>
      </div>
    </div>

    <div
      v-if="modalType === 'actions'"
      class="modal-actions animate__animated animate__fadeInUp"
    >
      <strong style="width: 100%; text-align: center"> More actions </strong>

      <button
        v-for="(button, i) in buttons"
        :key="i"
        class="modal-actions-button"
        :class="`modal-actions-button-${button.style}`"
        @click="actionClick(button.value)"
      >
        {{ button.text }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AModal',
    props: {
      modalType: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      buttons: {
        type: Array,
        default: () => [],
      },
    },
    data: () => ({
      promptText: '',
    }),
    methods: {
      confirm(str) {
        this.$emit('confirm', str === 'ok');
      },
      prompt(str) {
        if (str === 'ok') {
          this.$emit('prompt', this.promptText);
        } else {
          this.$emit('promptCancel');
        }
      },
      clickOutside() {
        this.$emit('clickOutside');
      },
      actionClick(f) {
        this.$emit('actionClick', f);
      },
    },
  };
</script>

<style lang="scss" scoped>
  $modal-width: 320px;
  $modal-height: 300px;
  $buttons-width: 290px;

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #fffc;

    @include block-border-radius;
    @include data-block;

    & > * {
      position: relative;
      width: $modal-width;
      height: $modal-height;
      padding: $break;
      background-color: #fff;
      -webkit-box-shadow: 0 0 9px 0 rgba(0, 0, 0, 20%);
      -moz-box-shadow: 0 0 9px 0 rgba(0, 0, 0, 20%);
      box-shadow: 0 0 9px 0 rgba(0, 0, 0, 20%);

      .modal-controls {
        position: absolute;
        bottom: $break;
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: $buttons-width;

        &-ok {
          @include action-button($red, #fff);
        }

        &-cancel {
          @include action-button;
        }
      }
    }

    &-confirm {
      &-controls {
        position: absolute;
        bottom: $break;
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: $buttons-width;

        &-ok {
          @include action-button($red, #fff);
        }

        &-cancel {
          @include action-button;
        }
      }
    }

    &-prompt {
      height: 175px;

      &-input {
        @include beauty-input;
      }

      &-text {
        margin-bottom: 0;
        font-size: $font-size-s;
        font-weight: 700;
      }

      &-controls {
        position: absolute;
        bottom: $break;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
        width: $buttons-width;

        &-ok {
          @include action-button($red, #fff);
        }

        &-cancel {
          @include action-button;
        }
      }
    }

    &-actions {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: $break;
      width: 320px;
      height: max-content;

      @include block-border-radius;

      &-button {
        &-red {
          @include action-button($red, #fff);

          background-color: transparent;

          &:hover {
            border: 1px solid $red !important;
          }
        }

        &-gray {
          @include action-button($muted-text-color, #fff);

          border: 1px solid $muted-text-color;
          background-color: transparent !important;
          color: $muted-text-color !important;

          &:hover {
            border: 1px solid $muted-text-color !important;
          }
        }
      }
    }
  }
</style>
