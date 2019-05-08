import Vue from 'vue'
import App from './app.vue'
import VueGDrive from '../src'

/**
 * Plugins
 */
import VueGAPI from 'vue-gapi'

// ignored file
import auth from './auth'

Vue.config.debug = true

/**
 * Defaults
 * about scopes => https://developers.google.com/drive/api/v3/about-auth
 */
Vue.use(VueGAPI, {
  apiKey: auth.apiKey,
  clientId: auth.clientId,
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  scope: 'https://www.googleapis.com/auth/drive.file',
})
Vue.use(VueGDrive)

new Vue({
  el: '#app',
  render: h => h(App),
})