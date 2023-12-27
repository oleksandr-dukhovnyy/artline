import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// libs
import vPurifyHTML from 'v-purify-html';
import purifyConfig from '../purify-config';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.snow.css';
import 'animate.css';
import * as Sentry from '@sentry/vue';

Vue.use(VueQuillEditor);
Vue.use(vPurifyHTML, purifyConfig);

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    Vue,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    tracesSampleRate: 1.0,
    tracePropagationTargets: [/\.github\.io/],

    // Capture Replay for 10% of all sessions,
    replaysSessionSampleRate: 0.1,

    // plus for 100% of sessions with an error
    replaysOnErrorSampleRate: 1.0,
  });
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export { router as Router };
