<template>
	<section class="login animate__animated animate__fadeIn">
		<h2 class="login-title">Login</h2>
		<form
			@submit.prevent="submit"
			class="login-form"
		>
			<input type="text"
				v-model="data.login"
				placeholder="login"

				class="login-form-input login-form-login"
				:class="{error: errors.login}"
			>
			
			<input type="password"
				v-model="data.password"
				placeholder="password"

				class="login-form-input login-form-password"
				:class="{error: errors.password}"
			>
			
			<div
				v-if="isAuthError !== null && authError !== null"
				class="login-form-error"
			>
				{{ authError.msg }}
			</div>

			<div class="login-form-submit">
				<input type="submit"
					class="login-form-submit-bttn"
					:class="{disabled: conditions.loading}"
					:disabled="conditions.loading"
					value="submit"
				>
			</div>
		</form>
	</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'Login',
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
			loading: false
		},
	}),
	watch: {
		user: function() {
			if (this.isAuthError === false) {
				this.data = {
					login: '',
					password: '',
				};
			}
		},
		authLoading: function() {
			this.conditions.loading = this.authLoading;
		},
	},
	computed: {
		...mapGetters(['isAuthError', 'authError', 'user', 'authLoading'])
	},
	methods: {
		...mapActions(['login']),
		submit() {
			this.login(this.data);
		},
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/mixins.scss';

	.login {
		width: 100%;
		height: 83vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		&-title {
			margin: 0 0 2vh;
		}

		&-form {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
    		align-items: center;
			padding: $break;

			width: 25vw;
			min-width: 300px;

			background-color: #fff;
			border-radius: $border-radius;

			&-input {
				width: 100%;
				height: 10vh;
				padding: 1.5vh;
				margin-bottom: $break;
				font-size: 1em;

				&.error {
					@include input-error;
				}
			}

			&-submit {
				width: 100%;

				&-bttn {
					height: 6vh;
					@include button;
					border: 1px solid $cta-color;
					color: $cta-color;
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