<template>
	<section class="user-contain animate__animated animate__slideInUp">
		<div v-if="user !== null" class="user">
			<div class="user-header">
				<img
					:src="user.avatar"
					alt="user_avatar"
					class="user-header-avatar"
					width="160"
					height="160"
				>
				<strong class="user-header-name">
					{{ user.name === '' ? `@${user.login}` : user.name }}
					<router-link
						:to="{ name: 'account', query: {id: user.id}}"
						v-if="currentLoggedUser !== null && currentLoggedUser.id === user.id"
						class="user-header-name-editbttn"
					>
						(edit profile)
					</router-link>
				</strong>
				<p class="user-header-about" v-if="user.about.length > 0">
					{{ user.about }}
				</p>
				<p class="empty" v-else>
					The user has written nothing about himself yet
				</p>
			</div>
			<div class="user-actions">
				<div class="user-actions-controlls">
					<button
						class="user-actions-controlls-button user-actions-controlls-show_user_articles"
						:class="{ active: showNow === 'articles' }"
						@click="showUserActions('articles')"
					>
						User articles ({{ userArticles.length }})
					</button>
					<button
						class="user-actions-controlls-button user-actions-controlls-show_user_comments"
						:class="{ active: showNow === 'comments' }"
						@click="showUserActions('comments')"
					>
						User commented ({{ userComments.length }})
					</button>
				</div>
				<div class="user-actions-content">
					<!-- articles-->
					<div
						class="user-actions-content-articles user-actions-content-comments animate__animated animate__fadeInUp"
						v-if="showNow === 'articles' && userArticles.length > 0"
					>
						<div
							class="user-actions-content-articles-article"
							v-for="(article, i) in userArticles"
							:key="i"
						>
							<div class="user-actions-content-articles-article-img">
								<img
									:src="article.img"
									alt="_article_img"
									width="800"
									height="450"
									class="user-actions-content-articles-article-img-img"
								/>
							</div>
							<div class="user-actions-content-articles-article-header">
								<h3 class="user-actions-content-articles-article-header-title">
									<router-link
										:to="{ name: 'article', params: { id: article.id } }"
										class="user-actions-content-articles-article-header-title-link"
									>
										{{ article.title }}
									</router-link>
								</h3>
								<div class="user-actions-content-articles-article-header-time">
									at {{ article.creationDate }}
								</div>
							</div>
						</div>
					</div>
					<div v-else-if="showNow === 'articles'" class="empty">
						The user has not written an article yet
					</div>

					<!-- comments-->
					<div
						class="user-actions-content-comments animate__animated animate__zoomIn"
						v-else-if="showNow === 'comments' && userComments.length > 0"
					>
						<div
							class="user-actions-content-comments-comment"
							v-for="(comment, i) in userComments"
							:key="i"
						>
							<h3 class="user-actions-content-comments-comment-article_title">
								<router-link
									:to="{ name: 'article', params: { id: comment.article.id } }"
									class="user-actions-content-comments-comment-article_title-link"
								>
									{{ comment.article.title }}
								</router-link>
							</h3>
							<div class="user-actions-content-comments-comment-author">
								<img
									:src="comment.comment.author.avatar"
									alt="user_avatar"
									width="40"
									height="40"
									class="user-actions-content-comments-comment-author-img"
								/>
								<strong
									class="user-actions-content-comments-comment-author-name"
								>
									<div class="link">
										{{ comment.comment.author.name }}
									</div>
								</strong>
								<div class="user-actions-content-comments-comment-author-time">
									at 02.03.20, 15:13
								</div>
							</div>
							<p>
								{{ comment.comment.commentBody }}
							</p>
						</div>
					</div>
					<div v-else class="empty">
						The user has not left comments on the articles yet
					</div>
				</div>
			</div>
		</div>
		<div v-else class="loader">
			<Loader />
		</div>
	</section>
</template>

<script>
import Loader from '@/components/loader/LoaderLines.vue';
import API from '@/api/index.api.js';
import { mapGetters } from 'vuex';

export default {
	name: 'Article',
	components: {
		Loader,
	},
	data: () => ({
		user: null,
		showNow: 'articles',
		userArticles: [],
		userComments: [],
	}),
	computed: {
		...mapGetters(['currentLoggedUser'])
	},
	created() {
		API.getUser(this.$route.params.id).then((user) => {
			this.user = user;
			if (user === undefined || user.id === undefined) {
				this.$router.replace({ name: 'page404' });
			} else {
				this.loadArticles([...this.user.posts, ...this.user.commented]);
			}
		});
	},
	methods: {
		showUserActions(acrionType = 'articles') {
			this.showNow = acrionType;
		},
		loadArticles(articlesIDs) {
			API.getArticles('', '', { arrOfId: articlesIDs }).then(({articles}) => {
				const userArticles = [];
				const userComments = [];

				articles.forEach((article) => {
					if (article.author.id === this.user.id) {
						userArticles.push(article);
					} else {
						article.comments.forEach((comment) => {
							if (this.user.id === comment.author.id) {
								userComments.push({
									comment,
									article: {
										title: article.title,
										id: article.id,
									},
								});
							}
						});
					}
				});

				this.setUserArticles(userArticles);
				this.setUserComments(userComments);
			});
		},
		setUserArticles(arr) {
			this.userArticles = arr;
		},
		setUserComments(arr) {
			this.userComments = arr;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

// local vars
// $user_page-width: 820px;
// /local vars

// local vars
$article-width-desktop: 820px;
$article-width-tablet: 650px;
$article-width-mobile: 300px;
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

.loader {
	@include block-width;
	height: 90vh;
	display: flex;
	padding: auto;
	align-items: center;
	justify-content: center;
	// margin-left: -343px;
}

.empty {
	font-style: italic;
	color: $muted-text-color;
}

.user {
	margin: $break 0;
	padding: 0 $break $break $break;
	@include data-block;
	@include block-width;

	&-contain {
		min-height: 90vh;
	}

	&-header {
		padding: $break 0;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: $avatar-size-l 20px 1fr;
		justify-content: center;
		grid-gap: $break;

		&-avatar {
			width: $avatar-size-l;
			height: $avatar-size-l;
			border-radius: 50%;
			margin: 0 auto;
		}

		&-name {
			font-size: $font-size-m;
			margin: 0 auto;

			&-editbttn {
				font-size: $font-size-s;
				color: $muted-text-color;
			}
		}
	}

	&-actions {
		&-controlls {
			margin-bottom: -1px;
			margin-left: 3px;
			&-button {
				margin-right: -1px;
				@include action-button;
				background-color: #fff;

				&.active {
					border-bottom: 1px solid transparent;
				}

				@include mobile {
					font-size: $font-size-s;
					&:hover {
						background-color: #fff;
						color: $cta-color;
					}
				}

				@include tablet {
					font-size: $font-size-s;
					&:hover {
						background-color: #fff;
						color: $cta-color;
					}
				}
			}
		}

		&-content {
			border-top: 1px solid $cta-color;
			padding: $break 0;

			&-comments {
				padding-top: 15px;

				& > * {
					border-top: 1px solid #e6e6e6;
				}

				&-comment {
					padding: 5px 0px;

					&:nth-child(1) {
						border-top: 1px solid #fff !important;
					}

					&-author {
						display: grid;
						align-items: center;
						grid-template-columns: $avatar-size-m max-content 1fr;
						grid-gap: 10px;
						font-size: $font-size-sm;

						&-img {
							@include avatar;
						}

						&-name {
							font-weight: 300;
						}

						&-time {
							font-style: italic;
							margin-top: 0.1em;
							font-size: $font-size-sm;
							opacity: 0.5;
						}
					}

					&-article_title {
						font-size: $font-size-sm;

						&-link {
							font-style: italic;
							@include link;
							color: #555 !important;
							font-weight: 500;
						}
					}
				}
			}

			&-title {
				margin: $break 0;
			}

			&-articles {
				&-article {
					&:nth-child(1) {
						border-top: 1px solid #fff !important;
					}

					display: grid;
					grid-template-columns: 100%;
					grid-template-rows: max-content 1fr;
					padding: $break 0;

					&-img {
						display: none;
						&-img {
							// width: 100%;
							@include mobile {
								width: 285px;
								height: calc(285px * 0.5625); // x * 9 / 16 === x * 0.5625 (image format 16:9)
							}

							@include tablet {
								width: 620px;
								height: calc(620px * 0.5625);
							}
						}
					}

					&-header {
						&-title {
							&-link {
								@include link;
							}
						}
						&-time {
							font-style: italic;
							color: #555;
						}
					}
				}
			}
		}
	}
}
</style>
