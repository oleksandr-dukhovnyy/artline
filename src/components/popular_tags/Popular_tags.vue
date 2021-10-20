<template>

	<div class="home-popular_tags animate__animated animate__fadeInRight">
		<strong>
			Popular tags:
		</strong>
		<div class="home-popular_tags-contain">
			<div
				class="home-popular_tags-contain-tag"
				v-for="(tag, i) in popularTags"
				:key="i"
			>
				<router-link class="link" :to="{name: 'tag', params: {tag}}">
					{{ tag }}
				</router-link>
			</div>
		</div>

	</div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
	name: 'PopularTags',
	computed: {
		...mapGetters(['popularTags', 'popularTagsLoaded'])
	},
	methods: {
		...mapActions(['loadPopularTags'])
	},
	created(){
		if(this.popularTagsLoaded === false){
			this.loadPopularTags();
		}
		
	}
	// data: () => ({
		// popularTags: [
		// 	'JavaScript',
		// 	'JS',
		// 	'CSS',
		// 	'Math',
		// 	'Games',
		// 	'History',
		// 	'Crazy Code',
		// 	'blog',
		// 	'Microsoft Blog',
		// ]
	// })
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/mixins.scss';

	.home-popular_tags {
		margin-top: 26px;
		background-color: #fff;
		// height: 70vh;
		height: max-content;
		// position: fixed;
		// width: 100%;
		// right: 0px;
		// overflow: hidden;

		padding: $break;
		border-radius: $border-radius;

		&-contain {
			display: grid;
			grid-auto-flow: dense;
			grid-gap: 5px;
			grid-template-rows: repeat(10, max-content);
			grid-template-columns: 1fr 1fr;
			margin-top: $break;
			width: 100%;

			&-tag {
				width: max-content;
				height: max-content;
				
				@include tag;
			}
		}

		
	}

	.link {
		@include link();
		font-style: italic;
		font-size: 0.9em;
	}

</style>