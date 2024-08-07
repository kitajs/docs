<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

defineProps<{
  version: string;
}>();

const el = ref<HTMLElement>();
const { height } = useElementSize(el);

watchEffect(() => {
  if (height.value) {
    document.documentElement.style.setProperty(
      '--vp-layout-top-height',
      `${height.value + 16}px`
    );
  }
});

const dismiss = () => {
  localStorage.setItem(
    'header-warning',
    (Date.now() + 8.64e7).toString() // current time + 1 day
  );
  document.documentElement.classList.add('banner-dismissed');
};
</script>

<template>
  <div ref="el" class="banner">
    <div class="text">
      <b style="font-size: 1.12rem">Kita</b> is undergoing <b>major</b> changes
      and is unready for production use until <b>v2</b> is released.
    </div>

    <button type="button" @click="dismiss">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
        />
      </svg>
    </button>
  </div>
</template>

<style>
.banner-dismissed {
  --vp-layout-top-height: 0px !important;
}
html {
  --vp-layout-top-height: 88px;
}
@media (min-width: 375px) {
  html {
    --vp-layout-top-height: 64px;
  }
}
@media (min-width: 768px) {
  html {
    --vp-layout-top-height: 40px;
  }
}
</style>

<style scoped>
.banner-dismissed .banner {
  display: none;
}

.banner {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  font-size: 1rem;
  z-index: var(--vp-z-index-layout-top);
  padding: 8px;
  text-align: center;
  background-color: var(--vp-c-brand-2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease;
}

.text {
  flex: 1;
}

a {
  text-decoration: underline;
}

svg {
  width: 32px;
  height: 32px;
  margin-left: 8px;
}

svg:hover {
  cursor: pointer;
  color: var(--vp-button-brand-bg);
}
</style>
