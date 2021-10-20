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
					Articles width tag: {{ articlesByTagCount !== null ? articlesByTagCount : 'loading...' }}
				</div>
			</div>

			<div class="tag-articles">
				<Articles
					:articles="articlesByTag"
				/>
			</div>
		
		</section>

		<div v-else>
			Loading...
		</div>
	</div>
	

</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Articles from '@/components/feed/Feed';

export default {
	name: 'Tag',
	components: {
		Articles
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

	.tag {
		width: 850px;
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

		// &-articles {
			// @include data-block;

			// text-align: center;
		// }
	}

</style>