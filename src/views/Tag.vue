<template>
	<div class="wrapper">
		<section class="tag" v-if="!articlesByTagLoading">
			<div class="tag-header">
				<h1
					class="tag-header-title"
				>
					Articles width tag "<span class="tag-header-title-cta">{{ $route.params.tag }}</span>"
				</h1>
				<div class="tag-header-articles_width_tag">
					Articles with tag: {{ articlesByTagCount !== null ? articlesByTagCount : 'loading...' }}
				</div>
			</div>

			<div class="tag-articles">
				<Articles
					:articles="articlesByTag"
				/>
			</div>
		
		</section>

		<div v-else class="loader">
			<Loader />
		</div>
	</div>
	

</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Articles from '@/components/feed/Feed';
import Loader from '@/components/loader/LoaderLines.vue';

export default {
	name: 'Tag',
	components: {
		Articles, Loader
	},
	data: () => ({
		articlesWidthTag: 120
	}),
	methods: {
		...mapActions(['loadArticlesByTag', 'getArticlesByTagCount'])
	},
	created(){
		this.loadArticlesByTag({
			tag: this.$route.params.tag,
			from: 0,
			to: 10
		});

		this.getArticlesByTagCount(this.$route.params.tag);
	},
	computed: {
		...mapGetters(['articlesByTagLoading', 'articlesByTag', 'articlesByTagCount'])
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/mixins.scss';

	.loader {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wrapper {
		min-height: 83vh;
	}

	.tag {
		width: 850px;

		@include mobile {
			width: 100%;
		}

		@include tablet {
			width: 530px;
		}

		padding: $break;

		&-header {
			@include data-block;
			padding: $break 0;

			&-title {
				text-align: center;

				&-cta {
					color: $cta-color;
				}
			}

			&-articles_width_tag {
				text-align: center;
			}
		}
	}

</style>
