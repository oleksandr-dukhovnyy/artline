<template>

	<div class="modal"
		@click.self.stop="clickOutside"
	>
		<div
			v-if="modalType === 'confirm'"
			class="modal-confirm animate__animated animate__fadeInUp"
		>
			<p class="modal-confirm-text"
				v-html="text"
			>
			</p>
			<div class="modal-confirm-controlls">
				<button
					class="modal-confirm-controlls-ok"
					@click="confirm('ok')"
				>ok</button>
				<button
					class="modal-confirm-controlls-cancel"
					@click="confirm('cancel')"
				>cancel</button>
			</div>
			
		</div>

		<div
			v-if="modalType === 'prompt'"
			class="modal-prompt animate__animated animate__fadeInUp"
		>
			<p class="modal-prompt-text"
				v-html="text"
			>
			</p>
			<input type="text"
				v-model="promptText"
				:placeholder="placeholder"
				class="modal-prompt-input"
			>
			<div class="modal-prompt-controlls">
				<button
					class="modal-prompt-controlls-ok"
					@click="prompt('ok')"
				>ok</button>
				<button
					class="modal-prompt-controlls-cancel"
					@click="prompt('cancel')"
				>cancel</button>
			</div>
			
		</div>

		<div class="modal-actions animate__animated animate__fadeInUp"
			v-if="modalType === 'actions'"
		>
			<button
				v-for="(button, i) in buttons"
				:key="i"
				class="modal-actions-button"
				:class="{'modal-actions-button-red': button.style === 'red'}"
				@click="actionClick(button.value)"
			>
				{{ button.text }}
			</button>
		</div>
	</div>

</template>

<script>

export default {
	name: 'Modal',
	props: ['modalType', 'text', 'placeholder', 'buttons'],
	data: () => ({
		promptText: ''
	}),
	methods: {
		confirm(str){
			this.$emit('confirm', str === 'ok');
		},
		prompt(str){
			if(str === 'ok'){
				this.$emit('prompt', this.promptText);
			} else {
				this.$emit('promptCancel');
			}
		},
		clickOutside(){
			this.$emit('clickOutside');
		},
		actionClick(f){
			this.$emit('actionClick', f);
		}
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/mixins.scss';

	$modal-width: 400px;
	$modal-height: 300px;

	$buttons-width: 370px;

	.modal {
		width: 100vw;
		height: 100vh;
		background-color: #ffffffcc;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 10;
		top: 0px;
		left: 0px;

		@include data-block;

		& > * {
			width: $modal-width;
			height: $modal-height;
			background-color: #fff;
			-webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
			-moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
			box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.2);
			position: relative;
			padding: $break;

			&-controlls {
				position: absolute;
				bottom: $break;
				width: $buttons-width;
				display: grid;
				grid-template-columns: 1fr 1fr;

				&-ok {
					@include action-button($red, #fff);
				}
				&-cancel {
					@include action-button;
				}
			}
		}

		&-confirm {
			&-controlls {
				position: absolute;
				bottom: $break;
				width: $buttons-width;
				display: grid;
				grid-template-columns: 1fr 1fr;

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
				font-size: 0.8em;
				font-weight: 700;
				margin-bottom: 0px;
			}

			&-controlls {
				position: absolute;
				bottom: $break;
				width: $buttons-width;
				display: grid;
				grid-template-columns: 1fr 1fr;

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
			grid-template-columns: 1fr 1fr;

			grid-gap: $break;

			width: 360px;
			height: max-content;

			&-button {
				&-red {
					@include action-button($red, #fff);
				}
			}
		}
	}

</style>