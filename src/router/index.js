import Vue from 'vue';
import VueRouter from 'vue-router';

// lazy components:
// import Login from '@/views/Login.vue';
// import User from '@/views/User.vue';
// import writeArticle from '@/views/New_article.vue';
// import Page404 from '@/views/Page_404.vue';

import Home from '@/views/Home.vue';
import Registration from '@/views/Registration.vue';
import Article from '@/views/Article.vue';
import Account from '@/views/Account.vue';
import Tag from '@/views/Tag.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'home' },
  },
  {
    path: '/feed/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    // component: Login,
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/user/:id',
    name: 'user',
    // component: User,
    component: () => import('../views/User.vue'),
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article,
  },
  {
    path: '/feed/:pageid',
    name: 'feed',
    component: Home,
  },
  {
    path: '/write-article',
    name: 'new-article',
    // component: writeArticle,
    component: () => import('../views/New_article.vue'),
  },
  {
    path: '/articles/tag/:tag',
    name: 'tag',
    component: Tag,
  },
  {
    path: '/404',
    name: 'page404',
    // component: Page404,
    component: () => import('../views/Page_404.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  /* eslint-disable-next-line no-undef */
  base: process.env.NODE_ENV === 'production' ? '/artline/' : '/',
  routes,
});

const upBeforeScroll = [
  'user',
  'page404',
  'article',
  'account',
  'new-article',
  'home',
];

router.beforeEach((to, from, next) => {
  if (upBeforeScroll.includes(to.name)) {
    window.scrollTo(0, 0);
    console.log('[router.beforeEach]: scroll to top');
  }

  next();
});

export default router;
