import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "",
    redirect: "/token-editor",
  },
  {
    path: "/token-editor",
    name: "token-editor",
    title: "Token编辑",
    component: () => import("./pages/token-editor/TokenEditor.vue"),
  },
  {
    path: "/token-color",
    name: "token-color",
    title: "Token 颜色",
    component: () => import("./pages/token-color/TokenColor.vue"),
  },
  {
    path: "/color-mix",
    name: "color-mix",
    title: "颜色混合器",
    component: () => import("./pages/color-mix/ColorMix.vue"),
  },
  {
    path: "/color-contrast",
    name: "color-contrast",
    title: "颜色对比度",
    component: () => import("./pages/color-contrast/ColorContrast.vue"),
  },
  {
    path: "/color-generate",
    name: "color-generate",
    title: "衍生色生成",
    component: () => import("./pages/color-generate/ColorGenerate.vue"),
  },
  {
    path: "/fonts",
    name: "fonts",
    title: "字体",
    component: () => import("./pages/font/TheFonts.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory("./"),
  routes,
});
