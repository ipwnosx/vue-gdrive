<template>
  <div class="demo">
    <h1>DEMO</h1>

    <section class="pattern">

      <div class="pattern__content">
        <h2 class="pattern__head">Auth, Create, Delete, List</h2>

        <ul class="serviceList">
          <li><a class="button" @click="login">Login</a></li>
          <li><a class="button" @click="logout">Logout</a></li>
          <li><a class="button" @click="isAuthenticated">Authenticated</a></li>
          <li><a class="button" @click="getUserData">User data</a></li>
          <li><a class="button" @click="createFile">Create File</a></li>
          <li><a class="button" @click="deleteFile">Delete File</a></li>
          <li><a class="button" @click="getFiles">Get File</a></li>
        </ul>
      </div>

      <div class="pattern__content">
        <h2 class="pattern__head">Upload</h2>

        <div class="droppable" v-gd-upload-area="uploadArea" />
      </div>

    </section>

  </div>
</template>

<script>
  // ignored file
  import auth from './auth'

  export default {
    name: 'App',
    data() {
      return {
        uploadArea: {
          uploadOptions: {
            path: '/upload/drive/v3/files',
          },
          metaExtends: {
            parents:[auth.testFolderId]
          },
          callback: this.onUploaded
        }
      }
    },
    methods: {
      login () {
        this.$login()
      },
      logout () {
        this.$logout()
      },
      isAuthenticated () {
        const loginState = this.$isAuthenticated()
        console.log(loginState)
      },
      getUserData () {
        const userData = this.$getUserData()
        console.log(userData)
      },
      async createFile () {
        const result = await this.$gdrive.createFile({
          name: 'dummy',
          parents: [auth.testFolderId],
          uploadType: "media",
          fields: "id, name, parents",
          media: {
            mimeType: "text/plain"
          },
          resource: {
            mimeType: "application/vnd.google-apps.document"
          }
        })
        console.log(result)
      },
      async deleteFile () {
        const result = await this.$gdrive.deleteFile({
          fileId: ''
        })
        console.log(result)
      },
      async getFiles () {
        const result = await this.$gdrive.getFiles({
          orderBy: 'folder,modifiedTime',
          q: `trashed=false and ${ auth.testFolderId } in parents`,
          fields: 'files(id, name, kind, size, mimeType, lastModifyingUser, modifiedTime, iconLink, owners, folderColorRgb, shared, webViewLink, webContentLink), nextPageToken',
        })
        console.log(result)
      },
      async updatePermission () {
        const result = await this.$gdrive.updatePermission()
        console.log(result)
      },
      onUploaded (objFile) {
        console.log(objFile)
      }
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    font-size: 16px;
  }

  p {
    line-height: 1.8;
    margin: 0;
    letter-spacing: .02em;
  }

  .demo {
    width: 800px;
    margin: auto;
    padding: 40px 0;
  }

  .pattern {
    min-height: 250px;
    margin-bottom: 40px;
  }

  .pattern__content {
    font-weight: bold;
  }

  .serviceList {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .droppable {
    position: relative;
    width: 600px;
    height: 100px;
    background-color: #318cef;
    border-radius: 6px;
    z-index: 0;
    cursor: pointer;

    &::before {
      content: 'Drag it here.';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      z-index: -1;
    }
  }

  .button {
    display: block;
    width: 160px;
    padding: 7px 14px;
    color: #fff;
    text-align: center;
    background-color: #2d967f;
    border-radius: 3px;
    cursor: pointer;
    box-sizing: border-box;
    transition: opacity .2s 0s ease-out;

    &:hover {
      opacity: .8;
    }
  }
</style>