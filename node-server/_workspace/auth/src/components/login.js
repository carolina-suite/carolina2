
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
