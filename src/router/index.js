import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Registration from '@/views/Registration.vue';
import Article from '@/views/Article.vue';
import User from '@/views/User.vue';
import Account from '@/views/Account.vue';

import Page404 from '@/views/Page_404.vue';

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
	// {
	// 	path: '/about',
	// 	name: 'About',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () =>
	// 		import(/* webpackChunkName: "about" */ '../views/About.vue'),
	// },
	{
		path: '/login',
		name: 'login',
		component: Login,
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
		component: User,
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
		path: '/404',
		name: 'page404',
		component: Page404,
	},
	{
		path: '*',
		redirect: '/404',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

const upBeforeScroll = ['user', 'page404', 'article', 'account'];

router.beforeEach((to, from, next) => {
	if (upBeforeScroll.includes(to.name)) {
		window.scrollTo(0, 0);
		console.log('[router.beforeEach]: scroll to top');
	}

	next();
});

export default router;
