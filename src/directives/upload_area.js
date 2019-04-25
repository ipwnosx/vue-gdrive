import { asyncForEach, readFileAsync } from '../utils'

const uploadArea = (() => {
  const state = new WeakMap()

  return {
    _onDragOverHandler (e) {
      e.preventDefault()
    },
    // _onClickHandler (e) {
    // },
    _onChangeHandler (e) {
      e.preventDefault()

      const switchCase = {
        'drop': () => { return e.dataTransfer.files },
        'change': () => { return e.target.files },
      };
      const fileList = switchCase[e.type]();

      if ( !fileList ) {
        return
      }

      asyncForEach([...fileList], async (file) => {
        const result = await readFileAsync(file);

        if (typeof result !== 'string') {
          throw 'read file error';
        }

        const arraySplitBase64 = result.split(','); // [Mime Type, Data]
        const data = {
          base64: arraySplitBase64[1],
          fileName: file.name,
          fileType: file.type,
        };

        this.binding.def._uploadFile(data);
      })
    },
    _uploadFile (data) {
      const boundary = '-------314159265358979323846';
      const delimiter = `\r\n--${ boundary }\r\n`;
      const closeDelim = `\r\n--${ boundary }--`;
      const contentType = data.fileType;
      const metaData = {
        name: data.fileName,
        mimeType: contentType,
      };

      // append optional metaData
      Object.assign(metaData, this.metaExtends || {});

      const multipartRequestBody =
        `${ delimiter }content-type: application/json; charset=UTF-8\r\n\r\n${ JSON.stringify(metaData) }${ delimiter }content-transfer-encoding: base64\r\ncontent-type: ${ contentType }\r\n\r\n${ data.base64 }${ closeDelim }`;

      this.uploadOptions.headers = { 'Content-Type': `multipart/related; boundary="${ boundary }"` };
      this.uploadOptions.body = multipartRequestBody;

      /**
       * Google API Client Libraries => API requests
       * https://developers.google.com/api-client-library/javascript/reference/referencedocs#api-requests
       */
      const req = this.$gdrive.gapi.client.request(this.uploadOptions);

      try {
        req.execute(objFile => {
          // upload success.
          if ( this.callback ) {
            this.callback(objFile)
          }
        })
      } catch (e) {
        console.error(e)
      }
    },
    bind (el, binding, vnode) {
      const data = {}
      const uploadOptionsDefault = {
        path: '/upload/drive/v3/files',
        method: 'POST',
        params: { uploadType: 'multipart' },
      }

      data.$gdrive = vnode.context.$gdrive;
      data.binding = binding;

      if ( binding.value ) {
        if ( binding.value['uploadOptions'] instanceof Object ) {
          data.uploadOptions = Object.assign(uploadOptionsDefault, binding.value['uploadOptions'])
        }
        if ( binding.value['metaExtends'] instanceof Object ) {
          data.metaExtends = binding.value['metaExtends']
        }
        if ( typeof binding.value['callback'] === 'function' ) {
          data.callback = binding.value['callback']
        }
      } else {
        data.uploadOptions = uploadOptionsDefault
        data.metaExtends = {};
      }

      // set state
      state.set(el, data)

      binding.def._uploadFile = binding.def._uploadFile.bind(data)
      binding.def._onChangeHandler = binding.def._onChangeHandler.bind(data)
      // binding.def._onClickHandler = binding.def._onClickHandler.bind(data)

      el.addEventListener('dragover', binding.def._onDragOverHandler)
      el.addEventListener('drop', binding.def._onChangeHandler)
      el.addEventListener('change', binding.def._onChangeHandler)
      // el.addEventListener('click', binding.def._onClickHandler)
    },
    unbind (el, binding, vnode) {
      state.delete(el)

      el.removeEventListener('dragover', binding.def._onDragOverHandler, false)
      el.removeEventListener('drop', binding.def._onChangeHandler, false)
      el.removeEventListener('change', binding.def._onChangeHandler, false)
      // el.removeEventListener('click', binding.def._onClickHandler, false)
    },
    componentUpdated (el, binding, vnode) {
      // vnode.context.$gdrive.update()
    },
    update (el, binding, vnode) {
      const data = state.get(el)
      // vnode.context.$gdrive.update()
    }
  }
})()

export default uploadArea;