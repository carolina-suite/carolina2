
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
