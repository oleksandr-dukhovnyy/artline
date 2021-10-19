<template>

	<article class="article">
		<h2 class="article-title">
			<router-link class="article-title-link"
				:to="{ name: 'article', params: { id: articleId }}"
			>
				{{ title }}
			</router-link>
		</h2>
		<div class="article-data">
			<div class="article-data-creation_date">{{ creationDate }}</div>
			<router-link class="link" :to="{name: 'user', params: {id: author.id}}">
				<div class="article-data-author"> {{ author.name }} </div>
			</router-link>
			<div class="article-data-tags">
				<div class="article-data-tags-tag"
					v-for="(item, i) in tags"
					:key="i"
				>
					<router-link class="link" :to="{name: 'page404'}">
						{{ item }}
					</router-link>
				</div>
			</div>
		</div>
		<img
			v-if="img !== ''"
			class="article-img"
			:src="img" alt="article_picture" width="800" height="450"
		>
		<div
			v-else
			class="article-picture_placeholder"
		></div>
		<p v-html="body.slice(0, 300)"
			class="article-preview"
		></p>
		<router-link :to="{ name: 'article', params: { id: articleId }}">
			<button class="article-read_more">
				read more...
			</button>
		</router-link>
		
	</article>

</template>

<script>
/*
Article Structure
	title
	creation date
	author
	body
	img
	id
*/

// import {mapGetters} from 'vuex';

export default {
	props: [
		'title',
		'creationDate',
		'author',
		'body',
		'img',
		'articleId',
		'tags'
	],
	// computed: {
	// 	...mapGetters(['articles'])
	// },
	name: 'FeedArticle',
	filters: {
		getFirstFewRows( t ){
			const sliced = t.split('').slice(0, 300);

			return sliced.join('') + '...';
		}
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/mixins.scss';

	.article {
		margin: 0 0 30px 0;
		background-color: #fff;
		padding: $break 10px;
		border-radius: $border-radius;
		width: 820px;

		&-preview {
			word-wrap: break-word;
		}

		&-title{
			margin: $break 0px;

			&-link {
				@include link;
				text-decoration: none;
				color: #000 !important;
				font-weight: 500;
			}
		}

		&-picture_placeholder {
			width: 800px;
			height: 450px;
		}

		&-img {
			margin: 0 auto;
			border-radius: $border-radius;
		}

		&-data {
			display: grid;
			width: max-content;
			grid-template-columns: 110px 1fr;
			grid-gap: $break;
			padding: 0px 0px 10px;
			font-size: 0.8em;
			font-style: italic;
		}

		&-read_more {
			width: 100px;
			height: 35px;
			border: 1px solid $main-color;
			color: $main-color;
			
			@include button();
		}

		&-data-tags {
			display: grid;
			grid-auto-flow: dense;
			grid-template-columns: repeat(5, auto);
			grid-column-gap: 5px;
			grid-template-rows: 1fr;

			&-tag {
				@include tag;
			}
		}
	}

	.link {
		@include link();
	}

</style>