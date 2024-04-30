import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import '@shikijs/vitepress-twoslash/style.css';
import type { EnhanceAppContext } from 'vitepress';
import Theme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';
import './custom.css';

export default {
  extends: Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'layout-top': () =>
        h(defineAsyncComponent(() => import('../components/Banner.vue')))
    });
  },
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue);
  }
};
