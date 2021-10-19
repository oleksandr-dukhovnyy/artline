import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// libs
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';

import 'animate.css';
// /libs

Vue.config.productionTip = false;

Vue.use(VueQuillEditor /* { default global options } */);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');

export { router as Router };
