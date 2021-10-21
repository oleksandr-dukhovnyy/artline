<template>

	<div class="write"
		:class="{wait: authLoading}"
		@click="(e) => authLoading ? e.stopPropagation() : ''"
	>
		<div class="write-image">
			<div class="write-image-title"
				v-if="!conditions.previewON"
			>
				Image:
			</div>
			<img class="write-image-image"
				:src="article.img"
				@click="modals.showImagePicker = true"
				width="800"
				height="450"
				title="choose a photo"
				alt="article image"
			>

		</div>

		<div class="write-tags"
			:class="{'write-tags-muted': !conditions.previewON}"
		>
			<div class="write-tags-title"
				v-if="!conditions.previewON"
			>
				Tags:
			</div>
			<input
				v-if="!conditions.previewON"
				class="write-tags-input"
				type="text"
				placeholder="tags, comma separated"
				v-model="tagsStr"
			>
			<div class="write-tags-preview"
				v-else
			>
				<div class="write-tags-preview-tag"
					v-for="(tag, i) in article.tags"
					:key="i"
				>
					{{ tag }}
				</div>
			</div>
		</div>

		<div class="write-title">
			<div class="write-tags-title"
				v-if="!conditions.previewON"
			>
				Article title:
			</div>
			<input
				v-if="!conditions.previewON"
				class="write-title-input"
				type="text"
				placeholder="Article title"
				v-model="article.title"
			>
			<div class="write-title-preview"
				v-else
			>
				<h1 class="write-title-preview-text">
					<span v-if="article.title.length > 0">
						{{ article.title }}
					</span>
					<span v-else
						class="muted"
					>
						title
					</span>
				</h1>
			</div>
		</div>

		<div class="write-editor"
			v-if="!conditions.previewON"
		>
			<div class="write-editor-title">
				Content:
			</div>
			<quill-editor
				v-model="article.content"
				:options="editorOption"
				:readOnly="true"
				@change="updateLocalStorage"
			/>
		</div>

		<div class="write-preview"
			v-else
			v-html="preview"
		>
		</div>

		<div class="write-controlls">
			<button
				class="write-controlls-submit"

				:class="{'cb-unactive': !articleIsValide}"
				:disabled="!articleIsValide"

				@click="submitArticle"
			>submit</button>
			<button
				@click="conditions.previewON = !conditions.previewON"
				class="write-controlls-preview"
			>
				{{ conditions.previewON ? 'to editor' : 'to preview' }}
			</button>
		</div>

		<div class="write-modals">
			<Modal
				v-if="modals.showImagePicker"

				modalType="prompt"
				:text="modals.pickImageText"
				placeholder="url"

				@prompt="setImage"
				
				@clickOutside="modals.showImagePicker = false"
				@promptCancel="modals.showImagePicker = false"
			/>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Modal from '@/components/modal/Modal.vue';

const DEFAULT_ARTICLE_IMG = 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png';
const MIN_ARTICLE_LENGTH = 100;

const UNCOMPLATED_LOCAL_KEY = 'uncomplated-article';
let savedArticle = localStorage.getItem(UNCOMPLATED_LOCAL_KEY);

if (savedArticle === null) {
	savedArticle = {
		img: DEFAULT_ARTICLE_IMG,
		content: '',
		tags: [],
		title: ''
	}
} else {
	savedArticle = JSON.parse(savedArticle);
}

export default {
	name: 'NewArticle',
	components: {
		Modal
	},
	data: () => ({
		editorOption: {
			placeholder: 'What do you want to write about?'
		},
		conditions: {
			previewON: false
		},
		modals: {
			showImagePicker: false,
			pickImageText: 'Enter image url'
		},
		article: {...savedArticle},
		tagsStr: savedArticle.tags.join(', '),
	}),
	methods: {
		...mapActions(['sendNewArticle']),
		setImage(url){
			this.modals.showImagePicker = false;

			if(url !== '' && url.length > 3){
				this.article.img = url;
			} else {
				this.article.img = DEFAULT_ARTICLE_IMG;
			}

			this.updateLocalStorage();
		},
		submitArticle(){
			this.sendNewArticle(this.article);
		},
		updateLocalStorage(){
			localStorage.setItem(UNCOMPLATED_LOCAL_KEY, JSON.stringify(this.article));
		}
    },
	watch: {
		tagsStr(){
			this.article.tags = this.tagsStr
				.split(',')
				.map(tag => {
					return tag.replace(/^\s|\s$/, '')
				})
				.filter(t => t !== '' && !/^\s{0,}$/g.test(t));

			this.updateLocalStorage();
		},
		sendNewArticleLoadingStatus(){
			if(/done/g.test(this.sendNewArticleLoadingStatus)){
				this.article = {
					img: DEFAULT_ARTICLE_IMG,
					content: '',
					tags: [],
					title: ''
				}
				this.updateLocalStorage();

				this.$router.push({name: 'article', params: {id: this.sendNewArticleLoadingStatus.replace(/.{0,}\:/g, '')}});
			}
		}
	},
	computed: {
		...mapGetters(['authLoading', 'sendNewArticleLoadingStatus']),
		preview(){
			if(this.article.content.length < 1){
				return '<em style="color: #c2c2c2; font-style: italic;">empty...</em>'
			} else {
				return this.article.content;
			}
		},
		articleIsValide(){
			return [
				this.article.content.length > MIN_ARTICLE_LENGTH - 1,
				// this.article.img !== DEFAULT_ARTICLE_IMG,
				this.article.tags.length > 0,
				this.article.title.length > 2
			].every(r => r);
		}
	}
}

</script>

<style lang="scss">
	@import '@/assets/scss/mixins.scss';

	$article-width: 830px;

	.write-preview img {
		max-width: 100%;
	}

	.empty {
		color: #c2c2c2;
		font-style: italic;
	}

	.write {
		margin: $break;
		width: $article-width;
		@include data-block;
		padding: $break;

		&-image {
			padding: $break 0;

			&-title {
				font-size: 0.8em;
				font-weight: 700;
			}
		}

		&-controlls {
			padding: $break 0;
			border-top: 1px solid $invisible-color;
			margin-top: $break;

			&-submit, &-preview {
				@include action-button;
			}

			&-submit {
				margin-right: $break;
			}
		}

		&-tags {
			padding-bottom: $break;
			transition: 0.7s;
			width: max-content;

			&-muted {
				opacity: 0.2;
			}

			&-input {
				@include beauty-input;

				width: 200px !important;
				height: 30px !important;
			}

			&-title {
				font-size: 0.8em;
				font-weight: 700;
			}

			&:hover {
				opacity: 1;
				transition: 0.7s;
			}

			&-preview {
				display: flex;

				&-tag {
					@include tag;
				}
			}
		}

		&-editor {
			&-title {
				font-size: 0.8em;
				font-weight: 700;
			}
		}

		&-title {
			padding-bottom: $break;
			transition: 0.7s;

			&-input {
				@include beauty-input;
			}

			&-title {
				font-size: 0.8em;
				font-weight: 700;
			}

			&:hover {
				opacity: 1;
				transition: 0.7s;
			}

			&-preview {
				display: flex;

				&-tag {
					@include tag;
				}
			}
		}
	}

</style>