import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// libs
import vPurifyHTML from 'v-purify-html';
import purifyConfig from '../purify-config';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';
import 'animate.css';

Vue.use(VueQuillEditor);
Vue.use(vPurifyHTML, purifyConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export { router as Router };
