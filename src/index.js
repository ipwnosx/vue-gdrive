/**
 * vue-gdrive
 */
import VueGDrive from './gdrive'

/**
 * Directives
 */
import uploadArea from './directives/upload_area'

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

  const options = {};

  Object.assign(options, clientOptions);

  /**
   * Add State
   */
  Vue.util.defineReactive(Vue.prototype, state.namespace, state)

  /**
   * Add Methods
   */
  Vue.use(VueGDrive, options)

  /**
   * Add Directive
   */
  Vue.directive(`${ state.namespaceDirective }UploadArea`, uploadArea)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin;