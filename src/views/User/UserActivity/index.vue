<template>
  <div class="actions">
    <TabSelector
      :show-now="showNow"
      :comments-count="userComments.length"
      :articles-count="userArticles.length"
      @show-user-actions="showUserActivity"
    />
    <div class="actions-content">
      <UserArticles
        v-if="showNow === 'articles'"
        :user-articles="userArticles"
      />

      <UserComments
        v-if="showNow === 'comments'"
        :user-comments="userComments"
      />
    </div>
  </div>
</template>

<script>
  import TabSelector from './_TabSelector.vue';
  import UserArticles from './UserArticles.vue';
  import UserComments from './UserComments.vue';

  export default {
    name: 'UserActivity',
    components: {
      TabSelector,
      UserArticles,
      UserComments,
    },
    props: {
      userArticles: {
        type: Array,
        default: () => [],
      },
      userComments: {
        type: Array,
        default: () => [],
      },
    },
    data: () => ({
      showNow: 'articles',
    }),
    methods: {
      showUserActivity(activityTab) {
        this.showNow = activityTab;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .actions {
    &-content {
      border-top: 1px solid $cta-color;
    }
  }
</style>
