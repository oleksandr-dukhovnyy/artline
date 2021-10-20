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
		<Pagination
			:items="paginationItems"

			@selectPage="_loadArticles"
		/>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import FeedArticle from '@/components/feed/FeedArticle.vue';
import Pagination from '@/components/feed/Pagination.vue';

export default {
	name: 'Feed',
	// data(){
	// 	return {
			
	// 	}
	// },
	props: {
		articles: Array,
		from: {
      		type: Number,
      		default: 0
    	},
		to: {
      		type: Number,
      		default: 10
    	},
	},
	computed: {
		...mapGetters(['paginationItems'])
	},
	methods: {
		...mapActions(['loadArticles']),
		_loadArticles(from = 0, to = 10){
			this.loadArticles({
				from, to
			});
		}
	},
	components: {
		FeedArticle,
		Pagination
	},
	mounted(){
		if(this.articles === undefined){
			this._loadArticles();
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/vars.scss';

	.feed {
		padding: 25px 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
</style>