import GoogleAuthService from './GoogleAuthService'

export default {
  install: async function (Vue, clientConfig) {
    const _this = Vue.prototype.$gdrive;
    const $methods = [
      'getFiles',
      'createFile',
      'deleteFile',
      'updatePermission',
    ];

    $methods.forEach(method => {
      Vue.prototype[_this.namespace][method] = () => { return 'Loading Google API...' }
    })

    /**
     * Load API
     */
    const gapi = await Vue.prototype.$getGapiClient();

    _this.gapi = gapi;
    _this.authInstance = _this.gapi.auth2.getAuthInstance();

    /**
     * Instantiate service
     */
    const googleAuthService = new GoogleAuthService(_this);

    $methods.forEach(method => {
      Vue.prototype[_this.namespace][method] = googleAuthService[method]
    })
  }
}