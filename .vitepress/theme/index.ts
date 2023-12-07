import Theme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import './custom.css';

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'layout-top': () =>
        h(defineAsyncComponent(() => import('../components/Banner.vue')))
    });
  }
};
