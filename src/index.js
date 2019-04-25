/**
 * vue-gdrive
 */
import VueGDrive from './gdrive'

/**
 * Directives
 */
import uploadArea from './directives/upload_area'

/**
 * Plugins
 */
import VueGAPI from 'vue-gapi'

function plugin (Vue, clientOptions = {}) {

  /**
   * State
   */
  const state = {
    namespace: '$gdrive',
    namespaceDirective: 'gd',
    gapi: null,
    authInstance: null,
  };

  /**
   * Defaults
   * about scopes => https://developers.google.com/drive/api/v3/about-auth
   */
  const options = {
    gapi: {
      apiKey: '',
      clientId: '',
      discoveryDocs: [''],
      scope: '',
    },
    gdrive: {}
  };

  Object.assign(options, clientOptions);

  /**
   * Add State
   */
  Vue.util.defineReactive(Vue.prototype, state.namespace, state)

  /**
   * Add Methods
   */
  Vue.use(VueGAPI, options.gapi)
  Vue.use(VueGDrive, options.gdrive)

  /**
   * Add Directive
   */
  Vue.directive(`${ state.namespaceDirective }UploadArea`, uploadArea)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin;