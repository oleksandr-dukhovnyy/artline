<template>

	<footer class="footer">
		<div class="footer-logo">
			<router-link class="footer-logo-text" :to="{name: 'home'}">ARTLINE</router-link>
		</div>
		<div class="footer-author">
			SCRIPT developers studio © in 2021 <span class="footer-author-email">feat@vip-person.net</span>
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
		position: relative;

		&-logo {
			padding: 20px;
			&-text {
				font-size: 2em;
				color: #fff;
				text-decoration: none;
			}
		}

		&-author {
			position: absolute;
			bottom: 10px;
			font-size: 0.8em;
			color: #fff;
			text-align: center;
			width: 100%;

			&-email {
				margin-left: 10px;
			}
		}
	}

</style>