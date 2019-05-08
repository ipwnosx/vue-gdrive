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
     * Depends on another plugin `uuki/vue-gapi`. (https://github.com/uuki/vue-gapi)
     */
    const gapi = await Vue.prototype.$getGapiClient()
                  .catch((e) => {
                    console.error('vue-gapi is not installed. Please `$yarn add uuki/gapi`', e)
                    return;
                  })

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