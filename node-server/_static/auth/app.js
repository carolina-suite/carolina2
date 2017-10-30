var TEMPLATES = {};
TEMPLATES["site/alert"] = `<div v-bind:class="'alert alert-' + severity">
  {{ message }}
  <ul v-if="itemList">
    <li v-for="item in itemList">{{ item }}</li>
  </ul>

  <p v-if="alertLink"><a v-bind:href="alertLink">{{ alertLinkTitle }}</a></p>
</div>
`;
TEMPLATES["auth/root"] = `
<div class="container">
  <checking v-if="currentPage==pages.CHECKING" @nav="handleNav"></checking>
  <login v-if="currentPage==pages.LOGIN" @nav="handleNav" @next="handleNext"></login>
  <register v-if="currentPage==pages.REGISTER" @nav="handleNav"></register>
  <profile v-if="currentPage==pages.PROFILE" @nav="handleNav"></profile>
  <edit v-if="currentPage==pages.EDIT" @nav="handleNav"></edit>
  <password v-if="currentPage==pages.PASSWORD" @nav="handleNav"></password>
  <forgot v-if="currentPage==pages.FORGOT" @nav="handleNav"></forgot>
</div>
`;
TEMPLATES["auth/checking"] = `<p>Checking login status...</p>
`;
TEMPLATES["auth/login"] = `
<form class="form-signin" @submit.prevent="login">

  <h2 class="form-signin-heading">Login</h2>

  <p>Don't have an account? Then please <a href='' @click.stop.prevent="emitRegister">sign up</a>.</p>
  <p>Forget your password? Then please <a href='' @click.stop.prevent="emitForgot">get it reset</a>.</p>

  <alert v-if="errorMessage" :message="errorMessage" :severity="'danger'"></alert>

  <label for="inputUsername" class="sr-only">Username</label>
  <input id="inputUsername" class="form-control" type="text" placeholder="Username" required autofocus v-model="username" />

  <label for="inputPassword" class="sr-only">Password</label>
  <input id="inputPassword" class="form-control" type="password" placeholder="password" required v-model="password" />

  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
</form>
`;
TEMPLATES["auth/register"] = `<form class="form-signin" @submit.prevent="register">

  <h2 class="form-signin-heading">Register</h2>

  <alert v-if="successMessage" :message="successMessage" :severity="'success'"></alert>
  
  <p>Already have an account? <a href='' @click.stop.prevent="emitLogin">sign in</a>.</p>

  <alert v-if="errorMessage" :message="errorMessage" :severity="'danger'"></alert>

  <label for="inputUsername" class="sr-only">Username</label>
  <input id="inputUsername" class="form-control" type="text" placeholder="Username" required autofocus v-model="username" />

  <label for="inputEmail" class="sr-only">E-Mail Address (optional)</label>
  <input id="inputEmail" class="form-control" type="email" placeholder="Email Address" autofocus v-model="email" />

  <label for="inputPassword" class="sr-only">Password</label>
  <input id="inputPassword" class="form-control" type="password" placeholder="password" required autofocus v-model="password1" />

  <label for="inputPassword2" class="sr-only">Confirm Password</label>
  <input id="inputPassword2" class="form-control" type="password" placeholder="confirm password" required autofocus v-model="password2" />

  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
</form>
`;
TEMPLATES["auth/profile"] = `
<div v-if="ready">

  <h3>{{ profile.username }}</h3>

  <p v-if="profile.isAdmin"><span class="badge badge-info">ADMIN ACCOUNT</span></p>

  <img class="img img-rounded" v-if="profile.imageUrl" v-bind:src="profile.imageUrl" />

  <p v-if="profile.name"><b>Name:</b> {{ profile.name }}</p>
  <p v-if="profile.email"><b>E-Mail Address:</b> {{ profile.email }}</p>

  <a class="btn btn-lg btn-info btn-block" href='' @click.stop.prevent="emitEdit">Update Info</a>
  <a class="btn btn-lg btn-warning btn-block" href='' @click.stop.prevent="emitPassword">Change Password</a>
  <a class="btn btn-lg btn-danger btn-block" href='' @click.stop.prevent="logout">Logout</a>
</div>
<p v-else>Fetching your data...</p>
`;
TEMPLATES["auth/edit"] = `
<form class="form-signin" @submit.prevent="update">

  <h2 class="form-signin-heading">Edit Account Values</h2>

  <alert v-if="errorMessage" :message="errorMessage" :severity="'danger'"></alert>

  <label for="inputEmail" class="sr-only">Email Address</label>
  <input id="inputEmail" class="form-control" type="email" placeholder="email@example.com" autofocus v-model="email" />

  <label for="inputName" class="sr-only">Name</label>
  <input id="inputName" class="form-control" type="text" placeholder="Your Name" v-model="name" />

  <label for="inputImageUrl" class="sr-only">Image Url</label>
  <input id="inputImageUrl" class="form-control" type="text" placeholder="http://example.com/image.png" v-model="imageUrl" />

  

  <button class="btn btn-lg btn-warning btn-block" type="submit">Update</button>
  <a class="btn btn-lg btn-secondary btn-block" href='' @click.stop.prevent="emitProfile">Cancel</a>
</form>
`;
TEMPLATES["auth/password"] = `
<form class="form-signin" @submit.prevent="updatePassword">

  <h2 class="form-signin-heading">Update Password</h2>

  <p>Don't have an account? Then please <a href='' @click.stop.prevent="emitRegister">sign up</a>.</p>

  <alert v-if="errorMessage" :message="errorMessage" :severity="'danger'"></alert>

  <label for="inputOldPassword" class="sr-only">Current Password</label>
  <input id="inputOldPassword" class="form-control" type="password" placeholder="currentpassword" required autofocus v-model="oldPassword" />

  <label for="inputNewPassword" class="sr-only">New Password</label>
  <input id="inputNewPassword" class="form-control" type="password" placeholder="newpassword" required v-model="newPassword" />

  <button class="btn btn-lg btn-info btn-block" type="submit">Update</button>
</form>
`;
TEMPLATES["auth/forgot"] = `
<form class="form-signin" @submit.prevent="reset">

  <h2 class="form-signin-heading">Forgot Password</h2>

  <alert v-if="successMessage" :message="successMessage" :severity="'info'"></alert>

  <p>Go back and <a href='' @click.stop.prevent="emitLogin">sign in</a>.</p>

  <label for="inputUsername" class="sr-only">Username</label>
  <input id="inputUsername" class="form-control" type="text" placeholder="Username" required autofocus v-model="username" />

  <button class="btn btn-lg btn-warning btn-block" type="submit">Reset</button>
</form>
`;

var Carolina = {};

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
Carolina.auth = new AuthLib();

PAGES = {
  CHECKING: 0,
  REGISTER: 1,
  LOGIN: 2,
  PROFILE: 3,
  EDIT: 4,
  PASSWORD: 5,
  FORGOT: 6
};

Vue.component('alert', {
  template: TEMPLATES['site/alert'],
  props: ['message', 'itemList', 'severity', 'alertLink', 'alertLinkTitle']
});

Vue.component('checking', {
  template: TEMPLATES['auth/checking'],
  mounted: async function() {
    var check = await Carolina.auth.authCheck();
    if (check) {
      this.$emit('nav', PAGES.PROFILE);
    }
    else this.$emit('nav', PAGES.LOGIN);
  }
});

Vue.component('login', {
  template: TEMPLATES['auth/login'],
  data: function() {
    return {
      username: '',
      password: '',
      errorMessage: null
    }
  },
  methods: {
    emitRegister: function() {
      this.$emit('nav', PAGES.REGISTER);
    },
    emitForgot: function() {
      this.$emit('nav', PAGES.FORGOT);
    },
    login: async function() {
      this.errorMessage = null;
      var res = await Carolina.auth.login(this.username, this.password);
      if (!res.success) this.errorMessage = res.message;
      else this.$emit('next');
    }
  }
});

Vue.component('register', {
  template: TEMPLATES['auth/register'],
  data: function () {
    return {
      username: '',
      email: '',
      password1: '',
      password2: '',
      errorMessage: null,
      successMessage: null
    }
  },
  methods: {
    emitLogin: function() {
      this.$emit('nav', PAGES.LOGIN);
    },
    register: async function() {
      this.successMessage = null;
      this.errorMessage = null;
      if (this.password1 != this.password2) {
        this.errorMessage = "Passwords do not match.";
        return;
      }
      var res = await Carolina.auth.register(this.username, this.email, this.password1);
      if (!res.success) this.errorMessage = res.message;
      else this.successMessage = "Registration successful. Click below to sign in.";
    }
  }
})

Vue.component('profile', {
  template: TEMPLATES['auth/profile'],
  data: function() {
    return {
      ready: false,
      profile: null
    };
  },
  mounted: async function() {
    this.profile = await Carolina.auth.getProfile();
    this.ready = true;
  },
  methods: {
    emitEdit: function() {
      this.$emit('nav', PAGES.EDIT);
    },
    emitLogout: function() {
      this.$emit('nav', PAGES.LOGIN);
    },
    emitPassword: function() {
      this.$emit('nav', PAGES.PASSWORD);
    },
    logout() {
      Carolina.auth.logout();
      this.emitLogout();
    }
  }
});

Vue.component('edit', {
  template: TEMPLATES['auth/edit'],
  data: function() {
    return {
      email: '',
      name: '',
      imageUrl: ''
    };
  },
  mounted: async function() {
    var profile = await Carolina.auth.getProfile();
    this.email = profile.email;
    this.name = profile.name;
    this.imageUrl = profile.imageUrl;
  },
  methods: {
    emitProfile: function() {
      this.$emit('nav', PAGES.PROFILE);
    },
    update: async function() {
      await Carolina.auth.updateProfile({
        email: this.email,
        name: this.name,
        imageUrl: this.imageUrl
      });
      this.emitProfile();
    }
  }
})

Vue.component('password', {
  template: TEMPLATES['auth/password'],
  data: function() {
    return {
      oldPassword: '',
      newPassword: '',
      errorMessage: null
    }
  },
  methods: {
    emitProfile: function() {
      this.$emit('nav', PAGES.PROFILE);
    },
    updatePassword: async function() {
      this.errorMessage = null;
      var res = await Carolina.auth.updatePassword(this.oldPassword, this.newPassword);
      if (!res.success) this.errorMessage = res.message;
      else this.emitProfile();
    }
  }
})

Vue.component('forgot', {
  template: TEMPLATES['auth/forgot'],
  data: function() {
    return { username: '', successMessage: null };
  },
  methods: {
    reset: async function() {
      var res = await Carolina.auth.forgotPassword(this.username);
      console.log(res);
      if (res.success) {
        this.successMessage = res.message;
      }
    },
    emitLogin: function() {
      this.$emit('nav', PAGES.LOGIN);
    }
  }
})

var app = new Vue({
  el: '#app',
  data: function() {
    return {
      pages: PAGES,
      currentPage: PAGES.CHECKING
    }
  },
  template: TEMPLATES['auth/root'],
  mounted: function () {
    // do an authCheck
  },
  methods: {
    handleNav: function(n) {
      this.currentPage = n;
    },
    handleNext: function() {
      var nextPage = window.localStorage.getItem('carolinaNext');
      if (nextPage != null) {
        window.localStorage.removeItem('carolinaNext');
        window.location = nextPage;
      }
      else {
        this.handleNav(PAGES.PROFILE);
      }
    }
  }
});
