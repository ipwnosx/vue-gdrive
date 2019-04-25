export default class GoogleAuthService {

  constructor ($gdrive) {
    this.$gdrive = $gdrive;

    this.createFile = this.createFile.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.getFiles = this.getFiles.bind(this)
    this.updatePermission = this.updatePermission.bind(this)
  }

  // NOTE: handleErr method, this is private
  _handleErr (err) {
    console.error(err)
  }

  /**
   * Drive API => files:create
   * https://developers.google.com/drive/api/v3/reference/files/create
   */
  async createFile (options = {}) {
    const { result } = await this.$gdrive.gapi.client.drive.files.create(options);

    console.log(result)

    if ( !result.id ) {
      return 'Create failed.';
    }

    return result;
  }

  /**
   * Drive API => files:delete
   * https://developers.google.com/drive/api/v3/reference/files/delete
   */
  async deleteFile (options = {}) {
    const result = await this.$gdrive.gapi.client.drive.files.delete(options);

    if ( result.status !== 204 ) {
      return 'Delete failed.';
    }

    return result;
  }

  /**
   * Drive API => files:list
   * https://developers.google.com/drive/api/v3/reference/files/list
   */
  async getFiles (options = {}) {
    const { result } = await this.$gdrive.gapi.client.drive.files.list(options);

    if ( !result.files || !result.files[0] ) {
      return 'No files found.';
    }
    return result;
  }

  /**
   * Drive API => files:permissions
   * https://developers.google.com/drive/api/v3/reference/permissions
   */
  async updatePermission (options = {}) {
    // const { result } = await this.$gdrive.gapi.client.drive.files.update(options);

    // return result;
  }
}