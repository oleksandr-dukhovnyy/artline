<template>
	<div class="wrapper">
		<article v-if="article !== undefined" class="article animate__animated animate__slideInUp">
			<h2 class="article-title">
				{{ article.title }}
			</h2>
			<div class="article-data">
				<div class="article-data-creation_date">{{ article.creationDate }}</div>
				<div class="article-data-tags">
					<div
						class="article-data-tags-tag"
						v-for="(item, i) in article.tags"
						:key="i"
					>
						<router-link class="link" :to="{ name: 'tag', params: {tag: item} }">
							{{ item }}
						</router-link>
					</div>
				</div>
			</div>
			<img
				v-if="article.img !== ''"
				class="article-img"
				:src="article.img"
				alt="article picture"
				width="800"
				height="450"
			/>
			<div v-else class="article-picture_placeholder"></div>
			
			<p v-html="article.body" class="article-body"></p>

			<div class="article-line"></div>

			<div class="article-author">
				<router-link class="article-author-link" :to="{ name: 'user', params: {id: article.author.id} }">
					<img
						class="article-author-link-avatar"
						:src="article.author.avatar"
						alt="author avatar"
						width="40"
						height="40"
					/>
					<div class="article-author-link-name">
						{{ article.author.name }}
					</div>
				</router-link>
			</div>
		</article>
		<div v-if="article !== undefined" class="comments">
			<h4 class="comments-title">
				Comments: {{ article.comments.length }}
			</h4>
			<div
				v-for="(comment, i) in article.comments"
				:key="i"
				class="comments-comment"
				:class="{loading: comment.loading, err: comment.status === 'err'}"
			>
				<div class="comments-comment-author">
					<img
						width="40"
						height="40"
						:src="comment.author.avatar"
						alt="user_avatar"
						class="comments-comment-author-img"
					/>
					<strong class="comments-comment-author-name">
						<router-link
							class="link"
							:to="{ name: 'user', params: { id: comment.author.id } }"
						>
							{{ comment.author.name !== '' ? comment.author.name : comment.author.login }}
						</router-link>
					</strong>
					<div class="comments-comment-author-time" v-if="!comment.loading">at {{ comment.time }}</div>
					<div v-else class="comments-comment-author-time">loading...</div>
				</div>
				<p>
					{{ comment.commentBody }}
				</p>
			</div>
		</div>

		<div v-if="article !== undefined && user !== undefined && user !== null" class="write_comment">
			<h4>
				Write a comment:
			</h4>
			<textarea
				class="write_comment-text_area"
				rows="8"
				v-model="comment"
				:class="{loading: submitCommentCondition.loading}"
			></textarea>
			<div
				class="write_comment-error"
				v-if="submitCommentCondition.status === 'error'"
			>
				{{ submitCommentCondition.msg }}
			</div>
			<button
				class="write_comment-submit"
				@click="submitComment"
				:disabled="comment.length === 0"
				:class="{'cb-unactive': comment.length === 0}"
			>
				submit
			</button>
		</div>
		<div v-else-if="article !== undefined"
			class="write_comment-unlogged"
		>
			<router-link :to="{name: 'registration'}">Register</router-link>
			or
			<router-link :to="{name: 'login'}">login</router-link>
			to leave a comment
		</div>

		<div v-else class="loader">
			<Loader />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import API from '@/api/index.api.js';
import Loader from '@/components/loader/LoaderLines.vue';
import getDate from '@/js/getCurrentTime.js';

export default {
	name: 'Article',
	components: {
		Loader,
	},
	data: () => ({
		showComments: true,
		comment: '',
		laodedArticle: undefined,
		submitCommentCondition: {
			status: '',
			msg: ''
		}
	}),
	methods: {
		...mapActions(['loadArticles', 'sendComment']),
		loadArticle(){

			const promise = API.core.get('/article', this.$route.params.id);

			promise.then(data => {
				this.laodedArticle = data;
			});

			promise.catch(e => {
				console.log('[Article.vue > loadArticle]: err', e);
				this.$router.replace({name: 'page404'});
			});
		},
		submitComment(){

			const localComment = {
				articleID: this.article.id,
				commentBody: this.comment,
				author: {
					...this.user
				},
				loading: true,
				status: '',
				time: getDate()
			}

			const newComment = {
				articleID: this.article.id,
				commentBody: this.comment,
				done: () => {
					localComment.loading = false;
				},
				failed(){
					localComment.status = 'err';
				}
			}

			this.comment = '';

			this.insertCommentToArticleComments(localComment);

			this.sendComment(newComment);
		},
		insertCommentToArticleComments(comment){
			this.article.comments.push(comment);
		}
	},
	computed: {
		...mapGetters(['articlesLoading', 'user']),
		article() {
			let article = this.$store.getters.articles.find(
				(article) => article.id === +this.$route.params.id
			);

			if (article === undefined && this.articlesLoading === true) {
				this.loadArticle();
				return this.laodedArticle;
			}

			return article;
		},
	},
	created() {
		if (this.$store.getters.articles.length === 0) {
			this.loadArticles();
		}
	}
};
</script>

<style lang="scss">
@import '@/assets/scss/mixins.scss';

// local vars
$article-width-desktop: 820px;
$article-width-tablet: 700px;
$article-width-mobile: 320px;
// /local vars
@mixin block-width {
	@include desktop {
		width: $article-width-desktop;
	}
	@include tablet {
		width: $article-width-tablet;
	}
	@include mobile {
		width: $article-width-mobile;
	}
}

.link {
	@include link();
}

.loader {
	// width: $article-width;
	@include block-width;
	height: 84vh;
	display: flex;
	padding: auto;
	align-items: center;
	justify-content: center;
	margin-left: -343px;
}

.article {
	margin: 30px 0;
	padding: $break 10px;
	@include block-width;

	@include data-block;

	&-title {
		margin: $break 0px;
		word-wrap: break-word;

		&-link {
			@include link;
			text-decoration: none;
			color: #000 !important;
			font-weight: 500;
		}
	}

	&-picture_placeholder {
		@include block-width;
		height: 450px;
	}

	&-img {
		@include mobile {
			width: 300px;
			height: 168.75%;
		}
		@include tablet {
			width: 680px;
			height: calc(680px * 0.5625);
		}

		margin: 0 auto;
		border-radius: $border-radius;
	}

	&-data {
		display: grid;
		width: max-content;
		grid-template-columns: 110px 1fr;
		align-items: center;
		grid-gap: $break;
		padding: 0px 0px 10px;
		font-size: $font-size-s;
		font-style: italic;

		&-tags {
			display: grid;
			grid-auto-flow: dense;
			grid-template-columns: repeat(5, auto);
			grid-column-gap: 5px;
			grid-template-rows: 1fr;

			&-tag {
				@include tag;

				overflow: hidden;

				@include mobile {
					max-width: 75px;
				}
			}

			@include mobile {
				grid-template-columns: repeat(4, auto);
				grid-row-gap: 10px;
			}
		}

		@include mobile {
			grid-template-rows: 25px 1fr;
			grid-template-columns: unset;

		}
	}

	&-read_more {
		width: 100px;
		height: 35px;
		border: 1px solid $main-color;
		color: $main-color;

		@include button();
	}

	&-author {
		&-link {
			display: grid;
			align-items: center;
			grid-template-columns: $avatar-size-m 1fr;
			grid-gap: $break;

			&-avatar {
				@include avatar;
			}
		}
	}

	&-line {
		width: 100%;
		height: 1px;
		background-color: $home_background-color;
		margin: 10px auto;
	}
	
	&-body {
		word-wrap: break-word;
		img {
			max-width: 100%;
		}
	}
}

.comments {
	@include block-width;
	margin-bottom: 25px;
	padding: $break;
	@include data-block;

	& > *:nth-child(2) {
		border: none;
	}

	&-comment {
		border-top: 1px solid $home_background-color;
		padding-top: 15px;

		&-author {
			display: grid;
			align-items: center;
			grid-template-columns: $avatar-size-m max-content 1fr;
			grid-gap: 10px;

			&-img {
				@include avatar;
			}

			&-time {
				font-style: italic;
				font-size: $font-size-s;
				color: $muted-text-color;
			}
		}

		&.loading {
			opacity: 0.7;
		}

		&.err {
			&::after {
				content: 'Error! No comment was sent!';
				color: $red;
				font-style: italic;
				opacity: 1;
			}
		}
	}

	&-title {
		margin: $break 0;
	}
}

.write_comment {
	@include block-width;
	padding: $break;
	margin-bottom: 25px;

	@include data-block;

	&-text_area {
		width: 100%;
		resize: vertical;

		&.loading {
			opacity: 0.7;
		}
	}

	&-error {
		color: $red;
		font-style: italic;
		padding: $break 0;
	}

	&-submit {
		@include action-button;
		border: 1px solid $cta-color;
		color: $cta-color;
	}

	&-unlogged {
		@include data-block;
		padding: 25px $break;
		margin-bottom: 25px;
	}
}
</style>
