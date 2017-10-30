
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
