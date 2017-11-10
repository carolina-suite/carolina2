
class AuthLib {
  constructor() {
    this.currentUser = null;
    this.token = window.localStorage.getItem('carolinaToken');
    this.axios = axios.create({
      headers: { 'Content-Type': 'application/json' },
      validateStatus: function(s) {
        return s < 500;
      }
    });
  }
  async authPost(url, data, redirectPath) {

    data.carolinaToken = this.token;
    var res = await this.axios.post(url, data);

    if (redirectPath && res.status == 401) {
      window.localStorage.setItem('carolinaNext', redirectPath);
      window.location = '/auth';
    }
    else return res.data;
  }
  async login(username, password) {
    var res = await this.axios.post('/auth/api/login', {
      username: username,
      password: password
    });
    if (res.data.success == true) {
      window.localStorage.setItem('carolinaToken', res.data.token);
      this.token = res.data.token;
      this.currentUser = username;
    }
    return res.data;
  }
  logout() {
    window.localStorage.removeItem('carolinaToken');
    this.currentUser = null;
    this.token = null;
  }
  async register(username, email, password) {
    var res = await this.axios.post('/auth/api/register', {
      username: username,
      email: email,
      password: password
    });
    if (res.data.success == true) {
      window.localStorage.setItem('carolinaToken', res.data.token);
      this.token = res.data.token;
    }
    return res.data;
  }
  async authCheck() {
    var res = await this.authPost('/auth/api/check', {}, null);
    return res.success;
  }
  async getProfile() {
    return await this.authPost('/auth/api/get-profile', {}, null);
  }
  async updateProfile(details) {
    return await this.authPost('/auth/api/update-profile', details, null);
  }
  async updatePassword(oldPassword, newPassword) {
    return await this.authPost('/auth/api/update-password', {
      oldPassword: oldPassword,
      newPassword: newPassword
    }, null);
  }
  async forgotPassword(username) {
    var res = await this.axios.post('/auth/api/forgot', { username: username });
    return res.data;
  }
}
var CarolinaAuth = new AuthLib();
export CarolinaAuth;
