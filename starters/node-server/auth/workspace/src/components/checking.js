
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
