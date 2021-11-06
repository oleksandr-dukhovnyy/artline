import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// libs
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';

import 'animate.css';

// import setDeviceType from '@/js/setDeviceType.js';
// /libs

//  libs setup
// setDeviceType();
Vue.use(VueQuillEditor);
// /libs setup

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');

export { router as Router };
