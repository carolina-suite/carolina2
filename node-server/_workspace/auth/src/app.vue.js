
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
