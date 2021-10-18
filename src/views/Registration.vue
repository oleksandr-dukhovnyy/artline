<template>
	<section class="registration animate__animated animate__fadeIn">
		<h2 class="registration-title">Registration</h2>
		<form @submit.prevent="submit" class="registration-form">
			<input
				type="text"
				v-model="data.login"
				placeholder="login"
				class="registration-form-input registration-form-login"
			/>

			<input
				type="email"
				v-model="data.email"
				placeholder="email"
				class="registration-form-input registration-form-password"
			/>

			<input
				type="password"
				v-model="data.password"
				placeholder="password"
				class="registration-form-input registration-form-password"
			/>

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
	name: 'Registration',
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
		user: function() {
			console.log('user updated', this.isAuthError);

			if (this.isAuthError === false) {
				this.redirect();
				this.data = {
					login: '',
					password: '',
					email: '',
				};
			}
		},
		authLoading: function() {
			this.condition.loading = this.authLoading;
		},
	},
	methods: {
		...mapActions(['register']),
		submit() {
			this.register(this.data);
		},
		redirect() {
			// console.log( 'redirect' );
			this.$router.push({ name: 'home' });
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

.registration {
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
			padding: 0 5px 5px;
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
