<template>
	<div class="feed animate__animated animate__fadeIn">
		<FeedArticle
			v-for="(article, i) in articles"
			:key="i"

			:title="article.title"
			:creationDate="article.creationDate"
			:author="article.author"
			:body="article.body"
			:img="article.img"
			:articleId="article.id"
			:tags="article.tags"
		/>
		<Pagination />
	</div>
</template>

<script>
import {mapGetters} from 'vuex';

import FeedArticle from '@/components/feed/FeedArticle.vue';
import Pagination from '@/components/feed/Pagination.vue';

export default {
	name: 'Feed',
	computed: {
		...mapGetters(['articles'])
	},
	components: {
		FeedArticle,
		Pagination
	},
	mounted(){
		// this.loadArticles();
	}
}
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/vars.scss';

	.feed {
		padding: 25px 0;
	}
</style>