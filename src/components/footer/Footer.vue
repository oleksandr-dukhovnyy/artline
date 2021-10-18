<template>

	<footer class="footer">
		<div class="footer-logo">
			<router-link class="footer-logo-text" :to="{name: 'home'}">ARTLINE</router-link>
		</div>
	</footer>

</template>

<script>

export default {
	name: 'Footer'
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/mixins.scss';

	.footer {
		height: 210px;
		background-color: $main-color;

		&-logo {
			padding: 20px;
			&-text {
				font-size: 2em;
				color: #fff;
				text-decoration: none;
			}
		}
	}

	// .link {
	// 	@include link;

	// 	color: #fff;
	// }

</style>