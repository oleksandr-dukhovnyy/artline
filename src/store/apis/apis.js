import API from '@/api/index.api.js';
import { Router } from '@/main.js';

const tokenLSKey = 'user-auth-token';

export default {
  actions: {
    async logout({ commit, state }) {
      const logout = API.logout(state.token);

      commit('setLoading', true);

      logout.then((res) => {
        if (res.success) {
          commit('setToken', '');
          commit('setUserData', null);
          commit('setLoading', false);
          Router.push({ name: 'home' });
        } else {
          commit('setToken', '');
          commit('setUserData', null);
          window.location.reload(true);
        }
      });

      logout.catch(() => {
        commit('setToken', '');
        commit('setUserData', null);
        window.location.reload(true);
      });
    },
    async autoLogin({ commit, state }) {
      if (state.token !== null) {
        commit('setLoading', true);
        const autoLogin = API.loginWidthToken(state.token);

        autoLogin.then((res) => {
          commit('setUserData', res.userData);
          commit('setUserDataLoaded', true);
          commit('setLoading', false);
        });

        autoLogin.catch((res) => {
          commit('setLoading', false);
        });
      }
    },
    async login({ commit }, { login, password }) {
      commit('setError', false);
      commit('setErrorRes', null);
      commit('setLoading', true);

      const logging = API.login(login, password);

      logging.then((res) => {
        commit('setLoading', false);
        if (res.success === true) {
          commit('setUserData', res.userData);
          commit('setToken', res.token);
          commit('setUserDataLoaded', true);
          Router.push({ name: 'home' });
        } else {
          commit('setError', true);
          commit('setErrorRes', res);
        }
      });

      logging.catch((res) => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setLoaded', true);

        commit('setErrorRes', res);
      });
    },
    async register({ commit, dispatch, state }, userData) {
      const registration = API.register(userData);

      commit('setLoading', true);
      commit('setError', false);
      commit('setErrorRes', null);

      registration.then((res) => {
        if (res.success === true) {
          commit('setLoading', false);

          commit('setUserData', res.userData);
          commit('setToken', res.token);
          dispatch('autoLogin');
          console.log('res', res);
          Router.push({ name: 'account', query: { id: res.user.id } });
        } else {
          commit('setLoading', false);
          commit('setError', true);

          commit('setErrorRes', res);
        }
      });

      registration.catch((res) => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setLoaded', true);

        commit('setErrorRes', res);
      });
    },
    async editAccount({ commit, state }, { newValues }) {
      commit('setUALoading', true);

      const editAccount = API.editAccount(state.user, state.token, newValues);

      editAccount.then((res) => {
        commit('setUALoading', false);
        commit('setUserData', res.userData);
      });

      editAccount.catch((res) => {
        commit('setUALoading', false);
        console.log('editError', res);
      });
    },
    async deleteAccount({ commit, state }) {
      commit('setLoading', true);

      const deleting = API.deleteAccount(state.token, state.user.id);

      deleting.then((res) => {
        commit('setLoading', false);
        commit('setUserData', null);
        Router.push({ name: 'home' });
      });

      deleting.catch((res) => {
        console.error(res.msg, res);
      });
    },
    async sendComment(
      { commit, state },
      { commentBody, articleID, done, failed }
    ) {
      const commentSending = API.sendComment({
        commentBody,
        articleID,
        token: state.token,
        userID: state.user.id,
      });

      commit('setLoading', true);

      commentSending.then((res) => {
        commit('setLoading', false);

        if (res.success === true) {
          done();
        } else {
          failed();
        }
      });

      commentSending.catch((res) => {
        commit('setLoading', false);
        failed();
      });
    },
    async sendNewArticle({ commit, state }, article) {
      const newArticleRequest = API.writeNewArticle(
        article,
        state.token,
        state.user.id
      );

      commit('setLoading', true);
      commit('setSendNewArticleLoadingStatus', 'send');

      newArticleRequest.then((res) => {
        commit('setSendNewArticleLoadingStatus', `done:${res.newArticleID}`);
        commit('setLoading', false);
      });

      newArticleRequest.catch((res) => {
        commit('setSendNewArticleLoadingStatus', 'failed');
        commit('setLoading', false);
        console.log('new article error', res);
      });
    },
  },
  mutations: {
    // conditions
    setError(state, payload = true) {
      state.conditions.error = payload;
    },
    setErrorRes(state, payload) {
      state.conditions.errorRes = payload;
    },
    setLoading(state, payload = true) {
      state.conditions.loading = payload;
    },
    setUALoading(state, payload) {
      state.conditions.UALoading = payload;
    },
    setUserDataLoaded(state, payload) {
      state.conditions.userDataLoaded = payload;
    },
    setSendNewArticleLoadingStatus(state, payload) {
      state.conditions.sendNewArticleLoadingStatus = payload;
    },
    setUserData(state, userData) {
      state.user = userData;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(tokenLSKey, token);
    },
  },
  state: {
    user: null,
    token: localStorage.getItem(tokenLSKey),
    conditions: {
      error: false,
      loading: false,
      errorRes: null,
      UALoading: false,
      userDataLoaded: false,
      sendNewArticleLoadingStatus: '',
    },
  },
  getters: {
    user: (s) => s.user,
    isAuthError: (s) => s.conditions.error,
    authError: (s) => s.conditions.errorRes,
    authLoading: (s) => s.conditions.loading,
    currentLoggedUser: (s) => s.user,
    UALoading: (s) => s.conditions.UALoading,
    userDataLoaded: (s) => s.conditions.userDataLoaded,
    sendNewArticleLoadingStatus: (s) =>
      s.conditions.sendNewArticleLoadingStatus,
  },
};
