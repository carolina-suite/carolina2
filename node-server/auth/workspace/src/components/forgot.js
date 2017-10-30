
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
