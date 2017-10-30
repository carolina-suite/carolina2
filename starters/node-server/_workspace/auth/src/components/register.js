
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
