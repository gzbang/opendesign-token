<script setup lang="ts">
import { ref } from "vue";

const fonts = [
  {
    weight: 100,
    name: "Thin",
  },
  {
    weight: 300,
    name: "Light",
  },
  {
    weight: 400,
    name: "Regular",
  },
  {
    weight: 500,
    name: "Medium",
  },
  {
    weight: 700,
    name: "Bold",
  },
  {
    weight: 900,
    name: "Black",
  },
];
const numbers = "0123456789";
const letters = "abcdefghijklmnopqrstuvwxyz";
const letters_UP = letters.toUpperCase();
const text = "开发者可以自由选择字体字重构建界面信息层级，。？！《》“”：；‘’";
const symbols = ".,:;?()[]{}!@#$%^&*<>/\\|'";

const size = ref(16);
const onChange = (e: any) => {
  size.value = e.target?.value || 16;
};

const ua = window.navigator.userAgent.toLowerCase();
const isApple = /(ios|ipad|iphone|macintosh)/.test(ua);
const isAndroid = /android/.test(ua);
const isWindows = /windows/.test(ua);
</script>
<template>
  <div class="page">
    <h1>字体对比</h1>
    <div class="size">字号：<input type="text" @change="onChange" :value="size" /></div>
    <div class="section" :style="{ fontSize: `${size}px` }">
      <div class="head">字重</div>
      <div class="head">weight</div>
      <div class="head">样例</div>
      <template v-for="item in fonts">
        <div class="cell name" :style="`font-weight: ${item.weight}`">{{ item.name }}</div>
        <div class="cell weight" :style="`font-weight: ${item.weight}`">{{ item.weight }}</div>
        <div class="cell fonts" :style="`font-weight: ${item.weight}`">
          <p class="system">系统默认</p>
          <p class="system">{{ numbers }}{{ letters }}{{ letters_UP }}{{ symbols }}</p>
          <p class="system">{{ text }}</p>
          <p class="harmony-sc">鸿蒙中文</p>
          <p class="harmony-sc">{{ numbers }}{{ letters }}{{ letters_UP }}{{ symbols }}</p>
          <p class="harmony-sc">{{ text }}</p>
          <p class="harmony">鸿蒙西文</p>
          <p class="harmony">{{ numbers }}{{ letters }}{{ letters_UP }}{{ symbols }}</p>
          <p></p>
          <p
            class="opendesign"
            :class="{
              apple: isApple,
              android: isAndroid,
              windows: isWindows,
            }"
          >
            OpenDesign
          </p>
          <p class="opendesign">{{ numbers }}{{ letters }}{{ letters_UP }}{{ symbols }}</p>
          <p class="opendesign">{{ text }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  text-align: center;
}
.size {
  position: absolute;
  right: 24px;
  input {
    width: 60px;
    height: 32px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
}
h1 {
  text-align: center;
  font-size: 32px;
}
.section {
  padding: 0 32px;
  margin: auto;
  display: inline-grid;
  grid-template-columns: 80px 80px auto;
  text-align: left;
}
.head {
  font-weight: bold;
  margin-bottom: 24px;
}
p {
  margin: 0;
}
.cell {
  margin-bottom: 16px;
}
.fonts {
  display: grid;
  grid-template-columns: 100px 900px auto;
  gap: 4px;
}

.system {
  font-family: -apple-system;
}
.opendesign {
  font-family: "HarmonyOS Sans SC", Roboto, "Helvetica Neue", Helvetica, system-ui, -apple-system, sans-serif;
  &.widows {
    font-family: "HarmonyOS SC", Arial, "Microsoft YaHei UI", sans-serif;
  }
}
.harmony-sc {
  font-family: "HarmonyOS SC";
}

.harmony {
  font-family: "HarmonyOS";
}
</style>
