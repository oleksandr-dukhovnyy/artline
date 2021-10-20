<template>
	<section class="home">
    	<div class="home-content"
			v-if="!articlesLoading"
		>
			<Feed
				:articles="articles"
			/>
			<PopularTags />
		</div>
		<div class="home-loader"
			v-else
		>
			<Loader />
		</div>
	</section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import Feed from '@/components/feed/Feed.vue';
import PopularTags from '@/components/popular_tags/Popular_tags.vue'

import Loader from '@/components/loader/LoaderLines.vue';

export default {
	name: 'Home',
	components: { Feed, PopularTags, Loader },
	methods: {
		...mapActions(['loadArticles'])
	},
	computed: {
		...mapGetters(['articlesLoading', 'articles'])
	},
	mounted(){
		this.loadArticles();
	}
};
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/vars.scss';

	.home {
		&-content {
			display: grid;
			grid-template-columns: 4fr 1fr;
			grid-gap: 30px;
			padding: 0px 3%;
			max-width: $max-width;
		}

		&-loader {
			height: 84vh;
			width: 600px;
			display: flex;
			// justify-content: center;
			align-items: center;
		}
	}
</style>