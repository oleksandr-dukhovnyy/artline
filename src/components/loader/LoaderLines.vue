<template>

	<div class="wrapper">
		<div>
			Loading...
		</div>
	</div>

</template>

<script>

export default {
	name: 'Loader'
}

</script>

<style lang="scss" scoped>
	.wrapper{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		div {
			margin: auto 0;
		}
	}
</style>