import Vue from 'vue'
import App from './app.vue'
import VueGDrive from '../src'

// ignored file
import auth from './auth'

Vue.config.debug = true

Vue.use(VueGDrive, {
  /**
   * for DEMO
   */
  gapi: {
    apiKey: auth.apiKey,
    clientId: auth.clientId,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.file',
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
})