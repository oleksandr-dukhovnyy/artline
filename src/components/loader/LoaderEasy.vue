<template>

	<div class="bounce">
      <div></div>
      <div></div>
      <div></div>
    </div>

</template>

<script>

export default {
	name: 'EasyLoader'
}

</script>

<style lang="scss" scoped>
	.bounce {
		width: 140px;
		position: relative;

		div {
			border-radius: 100%;
			height: 10px;
			width: 10px;
			background-color: hsl(0, 0%, 100%);
			animation: bounce 1s ease-in-out infinite;
			position: absolute;
			top: 0;
			transform: translatey(20px);

			&:first-of-type {
				left: -20px;
				animation-delay: 0.20s;
			}

			&:nth-of-type(2) {
				animation-delay: 0.10s;
			}

			&:last-of-type {
				left: 20px;
			}

		}
	}

	@keyframes bounce {
		50% {transform: translatey(-20px);}
		100% {transform: translatey( 20px);}
	}
</style>