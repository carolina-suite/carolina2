
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
