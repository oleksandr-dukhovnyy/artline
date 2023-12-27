<template>
  <section class="contain">
    <div
      v-if="userNotNullAndUndf"
      class="account"
    >
      <div class="account-header">
        <div class="account-header-avatar">
          <img
            alt="Avatar not found"
            :src="newData.avatar"
            width="150"
            height="150"
            class="account-header-avatar-img"
          />
          <img
            width="38"
            height="38"
            class="account-header-avatar-edit"
            src="@/assets/icons/edit_24x24.png"
            @click="chooseAPhoto"
          />
        </div>

        <em class="account-header-login"> @{{ user.login }} </em>
      </div>
      <div class="account-info">
        <div class="account-info-name">
          <div class="account-info-name-title">Name:</div>
          <input
            v-model.trim="newData.name"
            type="text"
            class="account-info-name-input"
            placeholder="Name"
          />
        </div>

        <div class="account-info-about">
          <div class="account-info-about-title"> About user: </div>
          <textarea
            v-model.trim="newData.about"
            class="account-info-about-input"
            placeholder="Write something about yourself"
          >
          </textarea>
        </div>
      </div>
      <button
        class="account-submit"
        :class="{ 'cb-unactive': !dataEdited && !UALoading }"
        :disabled="!dataEdited && !UALoading"
        @click="updateUserData"
      >
        {{ submitAccountEditsBttText }}
      </button>
      <button
        class="account-delete_changes"
        :class="{ 'cb-unactive': !dataEdited && !UALoading }"
        :disabled="!dataEdited && !UALoading"
        @click="setNewDataToDefault"
      >
        Delete changes
      </button>
      <div class="account-settings">
        <strong
          class="account-settings-bttn"
          @click="showMoreActions"
          >More</strong
        >
      </div>
    </div>

    <div
      v-if="userNotNullAndUndf"
      class="activity"
    >
      <h2>Activity:</h2>
      <div class="activity-controls">
        <button
          class="activity-controls-select_posts"
          :class="{ active: showNow === 'posts' }"
          @click="showUserActions('posts')"
        >
          My articles ({{ userPosts !== null ? userPosts.length : '...' }})
        </button>
        <button
          class="activity-controls-select_comments"
          :class="{ active: showNow === 'comments' }"
          @click="showUserActions('comments')"
        >
          My commented ({{
            userComments !== null ? userComments.length : '...'
          }})
        </button>
      </div>
      <div class="activity-data">
        <div
          v-if="
            showNow === 'posts' && userPosts !== null && userPosts.length > 0
          "
          class="activity-data-posts animate__animated animate__fadeInUp"
        >
          <div
            v-for="(article, i) in userPosts"
            :key="i"
            class="activity-data-posts-article"
          >
            <div class="activity-data-posts-article-img">
              <img
                :src="article.img"
                alt="_article_img"
                width="800"
                height="450"
              />
            </div>
            <div class="activity-data-posts-article-header">
              <h3 class="activity-data-posts-article-header-title">
                <router-link
                  :to="{ name: 'article', params: { id: article.id } }"
                  class="activity-data-posts-article-header-title-link"
                >
                  {{ article.title }}
                </router-link>
              </h3>
              <div class="activity-data-posts-article-header-time">
                at {{ article.creationDate }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="showNow === 'posts'"
          class="empty"
        >
          {{
            userPosts === null
              ? 'loading...'
              : 'The user has not written an article yet'
          }}
        </div>

        <div
          v-if="
            showNow === 'comments' &&
            userComments !== null &&
            userComments.length > 0
          "
          class="activity-data-comments"
        >
          <div
            v-for="(comment, i) in userComments"
            :key="i"
            class="activity-data-comments-comment animate__animated animate__zoomIn"
          >
            <h3 class="activity-data-comments-comment-article_title">
              <router-link
                :to="{ name: 'article', params: { id: comment.article.id } }"
                class="activity-data-comments-comment-article_title-link"
              >
                {{ comment.article.title }}
              </router-link>
            </h3>
            <div class="activity-data-comments-comment-author">
              <img
                :src="comment.comment.author.avatar"
                alt="user_avatar"
                width="40"
                height="40"
                class="activity-data-comments-comment-author-img"
              />
              <strong class="activity-data-comments-comment-author-name">
                <div class="link">
                  {{ comment.comment.author.name }}
                </div>
              </strong>
              <div class="activity-data-comments-comment-author-time">
                at 02.03.20, 15:13
              </div>
            </div>
            <p>
              {{ comment.comment.commentBody }}
            </p>
          </div>
        </div>
        <div
          v-else-if="showNow === 'comments'"
          class="empty"
        >
          {{
            userComments === null
              ? 'loading...'
              : 'The user has not left comments on the articles yet'
          }}
        </div>
      </div>
    </div>
    <div v-if="!userNotNullAndUndf"> loading... </div>
    <Modal
      v-if="modals.showConfirm"
      modal-type="confirm"
      :text="modals.deleteAccountText"
      @confirm="confirmResult"
      @clickOutside="closeConfirm"
    />
    <Modal
      v-if="modals.showPrompt"
      modal-type="prompt"
      :text="modals.inputImageUrlText"
      placeholder="url"
      @prompt="promptResult"
      @clickOutside="modals.showPrompt = false"
      @promptCancel="modals.showPrompt = false"
    />
    <Modal
      v-if="modals.showMoreActions"
      modal-type="actions"
      :buttons="[
        {
          text: 'Log out',
          value: 'logOut',
          style: 'red',
        },
        {
          text: 'Change email',
          value: 'changeEmail',
          style: 'gray',
        },
      ]"
      @actionClick="handleMoreActionsClick"
      @clickOutside="modals.showMoreActions = false"
    />
    <!-- <Modal
			v-if="modals.showMoreActions"
			modalType="actions"
			
			@actionClick="handleMoreActionsClick"
			@clickOutside="modals.showMoreActions = false"

			:buttons="[{
					text: 'Log out',
					value: 'logOut',
					style: 'red'
				},
				{
					text: 'Delete accout',
					value: 'deleteAccount',
					style: 'red'
			}]"
		/> -->
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import API from '@/api/index.api.js';
  import Modal from '@/components/modal/Modal.vue';

  const getters = ['user', 'authLoading', 'UALoading', 'userDataLoaded'];
  const actions = ['logout', 'deleteAccount', 'editAccount'];

  export default {
    name: 'MyAccount',
    components: {
      Modal,
    },
    data() {
      return {
        showNow: 'posts',
        newData: {
          name: '',
          about: '',
          avatar: '',
        },
        userPosts: null,
        userComments: null,
        userDataSted: false,
        submitAccountEditsBttText: 'update user data',
        modals: {
          showConfirm: false,
          deleteAccountText:
            'You are realy watn to <span style="color: #f00;">delete</span> your account?<br>We <strong>cannot</strong> undo this action.<br>All your posts and comments does not deleted.',

          inputImageUrlText: 'Enter url',
          showPrompt: false,

          showMoreActions: false,
        },
      };
    },
    computed: {
      ...mapGetters(getters),
      dataEdited() {
        const fields = Object.keys(this.newData);
        return fields.some((field) => this.newData[field] !== this.user[field]);
      },
      userNotNullAndUndf() {
        return this.user !== undefined && this.user !== null;
      },
    },
    watch: {
      authLoading() {
        if (this.authLoading === false) {
          if (this.user === null || this.user === undefined) {
            this.$router.push({ name: 'login' });
          }
        }
      },
      userDataLoaded() {
        if (this.userDataLoaded === true) {
          this.setUserData();
        }
      },
      UALoading() {
        if (this.UALoading === true) {
          this.submitAccountEditsBttText = 'updating...';
        } else {
          this.submitAccountEditsBttText = 'update user data';
        }
      },
    },
    created() {
      if (this.userDataLoaded || this.authLoading) {
        this.setUserData();
      } else {
        this.$router.push({ name: 'registration' });
      }
    },

    methods: {
      ...mapActions(actions),
      setUserData() {
        if (this.userDataLoaded === true) {
          this.setNewDataToDefault();

          this.userDataSted = true;
          const resolve = ({ articles }) => {
            this.userComments = [];

            this.userPosts = articles.filter(
              (a) => a.author.id === this.user.id
            );

            articles.forEach((article) => {
              const comments = article.comments.filter(
                (comment) => comment.author.id === this.user.id
              );

              comments.forEach((comment) => {
                this.userComments.push({
                  comment,
                  article: {
                    id: article.id,
                    title: article.title,
                  },
                });
              });
            });
          };
          const reject = (err) => {
            console.error('Account.vue > created (hook) > reject', err);
          };
          API.getArticles(resolve, reject, {
            arrOfId: [...this.user.posts, ...this.user.commented],
          });
        }
      },
      chooseAPhoto() {
        this.modals.showPrompt = true;
      },
      showUserActions(newCondition = 'posts') {
        this.showNow = newCondition;
      },
      setNewDataToDefault() {
        this.newData.name = this.user.name;
        this.newData.about = this.user.about;
        this.newData.avatar = this.user.avatar;
      },
      updateUserData() {
        if (this.dataEdited) {
          this.editAccount({
            newValues: JSON.parse(JSON.stringify(this.newData)),
          });
        }
      },
      _deleteAccount() {
        this.modals.showConfirm = true;
      },
      confirmResult(rez) {
        this.closeConfirm();
        if (rez === true) {
          this.deleteAccount();
        }
      },
      closeConfirm() {
        this.modals.showConfirm = false;
      },

      promptResult(data) {
        const defaultImgUrl =
          'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/300/000000/external-user-interface-kiranshastry-lineal-kiranshastry.png';

        this.newData.avatar = data !== '' ? data : defaultImgUrl;
        this.modals.showPrompt = false;
      },

      showMoreActions() {
        this.modals.showMoreActions = true;
      },
      handleMoreActionsClick(action) {
        switch (action) {
          case 'deleteAccount':
            this.showMoreActions();
            break;

          case 'logOut':
            this.modals.showMoreActions = false;
            this.logout();
            break;

          case 'changeEmail':
            prompt('new email');
            break;
        }

        // if (action === 'deleteAccount') {
        //   this._deleteAccount();
        // } else if (action === 'logOut') {
        //   this.modals.showMoreActions = false;
        //   this.logout();
        // }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .empty {
    padding-top: $break;
    font-style: italic;
    color: $muted-text-color;
  }

  .contain {
    margin: 25px 0;

    @include view-wrapper;
    @include data-block;

    background-color: transparent;

    .account {
      @include data-block;

      padding: $break;
      margin-bottom: $break;

      &-header {
        padding: $break;
        margin-bottom: $break;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 150px 1fr;
        grid-gap: $break;
        place-items: center center;

        &-avatar {
          position: relative;
          width: 150px;
          height: 150px;
          background-color: #ededed;
          border-radius: 50%;
          text-align: center;
          line-height: 150px;
          color: #a7a7a7;

          &-img {
            @include avatar-custom(150px);
          }

          &-edit {
            position: absolute;
            top: 110px;
            right: 0;
            background-color: #fff;
            border-radius: 50%;
            padding: 6px;
            border: 1px solid #000;
            cursor: pointer;
          }
        }

        &-login {
          color: $muted-text-color;
        }
      }

      &-info {
        display: grid;
        grid-gap: $break;
        padding-bottom: $break;

        &-name {
          &-title {
            font-size: $font-size-s;
            font-weight: 700;
          }

          &-input {
            @include beauty-input;

            border: 1px solid $invisible-color !important;

            &::placeholder {
              color: $muted-text-color;
            }
          }
        }

        &-about {
          &-title {
            font-size: $font-size-s;
            font-weight: 700;
          }

          &-input {
            @include beauty-textarea;

            border: 1px solid $invisible-color !important;

            &::placeholder {
              color: $muted-text-color;
            }
          }
        }
      }

      &-submit {
        @include action-button;
      }

      &-delete_changes {
        @include action-button($red, #fff);

        margin-left: $break;
      }

      &-settings {
        margin-top: $break;

        &-bttn {
          @include link;

          cursor: pointer;
          border-bottom: 1px dotted $link-color;
        }
      }
    }

    .activity {
      @include data-block;

      padding: $break;

      &-controls {
        padding-left: 5px;

        &-select {
          width: 100%;

          &_posts {
            @include action-button($cta-color, transparent, 'no');

            border-radius: 0;
            background-color: transparent;
            transform: none !important;

            &.active {
              border-bottom: 1px solid #fff;
            }
          }

          &_comments {
            @include action-button($cta-color, transparent, 'no');

            margin-left: -1px;
            border-radius: 0;
            background-color: transparent;
            transform: none !important;

            &.active {
              border-bottom: 1px solid #fff;
            }
          }

          &_settings {
            margin-left: -1px;

            @include action-button($cta-color, transparent, 'no');

            &.active {
              border-bottom: 1px solid #fff;
            }
          }
        }
      }

      &-data {
        margin-top: -1px;
        border-top: 1px solid $main-color;

        &-posts {
          &-article {
            padding-top: $break;
            border-top: 1px solid $muted-text-color;

            &:nth-child(1) {
              border-top: 1px solid #fff !important;
            }

            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: max-content 1fr;
            margin: $break 0;

            &-img {
              & > img {
                width: 100%;
                height: auto;
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

        &-comments {
          padding-top: 15px;

          & > * {
            border-top: 1px solid #e6e6e6;
          }

          &-comment {
            padding: 5px 0;

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

        &-account_settings {
          margin-top: $break;

          &-logout {
            @include action-button($red, #fff);

            margin-left: $break;
            opacity: 0.8;

            &:hover {
              opacity: 1;
            }
          }

          &-delete_accout {
            @include action-button($red, #fff);

            margin-left: $break;
          }
        }
      }
    }
  }
</style>
