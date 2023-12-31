<template>
  <div
    v-if="user"
    class="user"
  >
    <img
      :src="user.avatar"
      alt="Avatar not found"
      class="user-avatar"
      width="160"
      height="160"
    />
    <strong class="user-name">
      {{ user.name === '' ? `@${user.login}` : user.name }}

      <router-link
        v-if="currentLoggedUser !== null && currentLoggedUser.id === user.id"
        :to="{ name: 'account', query: { id: user.id } }"
        class="user-name-edit-btn"
      >
        (edit profile)
      </router-link>
    </strong>
    <p
      v-if="user.about.length > 0"
      class="user-about"
    >
      {{ user.about }}
    </p>
    <p
      v-else
      class="empty"
    >
      The user has written nothing about himself yet
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'UserInfo',
    props: {
      user: {
        type: Object,
        default: null,
      },
    },
    computed: {
      ...mapGetters(['currentLoggedUser']),
    },
  };
</script>

<style lang="scss" scoped>
  .user {
    display: grid;
    grid-template-rows: $avatar-size-l 20px 1fr;
    grid-template-columns: 1fr;
    grid-gap: $break;
    justify-content: center;
    padding: $break 0;

    &-avatar {
      position: relative;
      width: 150px;
      height: 150px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #ededed;
      color: #a7a7a7;
      line-height: 150px;
      text-align: center;
    }

    &-name {
      margin: 0 auto;
      font-size: $font-size-m;

      &-edit-btn {
        color: $muted-text-color;
        font-size: $font-size-s;
      }
    }
  }
</style>
