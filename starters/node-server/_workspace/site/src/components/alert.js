
Vue.component('alert', {
  template: TEMPLATES['site/alert'],
  props: ['message', 'itemList', 'severity', 'alertLink', 'alertLinkTitle']
});
