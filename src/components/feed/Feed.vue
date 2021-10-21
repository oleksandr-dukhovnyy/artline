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
			:paginationPages="paginationItems"

			@selectPage="_loadArticles"

			v-if="paginationItems > 1 && articles !== undefined && articles.length > 0"
		/>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import FeedArticle from '@/components/feed/FeedArticle.vue';
import Pagination from '@/components/feed/Pagination.vue';

export default {
	name: 'Feed',
	props: {
		articles: Array,
	},
	computed: {
		...mapGetters(['paginationItems', 'articlesLoading'])
	},
	methods: {
		...mapActions(['loadArticles']),
		_loadArticles(page){
			if (page !== undefined && !isNaN(page)) {
				this.$router.push({name: this.$route.name, query: {page}});
				this.loadCurrentArticles();
			}
		},
		loadCurrentArticles(){
			let queryPage = (+this.$route.query.page) - 1 || 0;

			if(queryPage < 0){
				queryPage = 0;
				this.$router.push({name: this.$route.name, query: {page: this.paginationItems}});
			}

			if(queryPage > this.paginationItems && this.paginationItems !== null){
				console.log('queryPage > this.paginationItems', this.paginationItems);
				this.$router.push({name: this.$route.name, query: {page: this.paginationItems}});
				queryPage = this.paginationItems;
			}

			if (isNaN(queryPage)) {
				console.log('load1', 0, 10);
				this.loadArticles({
					from: 0, to: 10
				});
			} else {
				console.log('load2', queryPage * 10, (queryPage+1) * 10);
				this.loadArticles({
					from: queryPage * 10, to: (queryPage+1) * 10
				});
			}
		}
	},
	components: {
		FeedArticle,
		Pagination
	},
	created(){
		if(this.articles !== undefined && this.articles.length === 0 && !this.articlesLoading){
			this.loadCurrentArticles();
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/vars.scss';

	.feed {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
</style>