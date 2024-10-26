<script setup lang="ts">
import { ref, watch } from "vue";

import Tokens from "./opendesign-token-color.json";

document.title = "Design Token -- Color";
const theme = ref("light");

const changeTheme = () => {
  if (theme.value === "light") {
    theme.value = "dark";
  } else {
    theme.value = "light";
  }
};
const ColorPalette: any = {
  base: Tokens.base,
  blue: Tokens.blue,
  yellow: Tokens.yellow,
  green: Tokens.green,
  orange: Tokens.orange,
  red: Tokens.red,
  gray: Tokens.gray,
  mixedgray: Tokens.mixedgray,
};

const style = ref({});
Object.keys(ColorPalette).forEach((k: any) => {
  const item = ColorPalette[k];
  item.value.forEach((si: any) => {
    const n = `--o-${si.key}`;
    (style.value as any)[n] = si.value[theme.value];
  });
});

const LightToken: any = [];
const ColorToken = {
  fill: Tokens.fill,
  info: Tokens.info,
  control: Tokens.control,
  mask: Tokens.mask,
  primary: Tokens.primary,
  success: Tokens.success,
  warning: Tokens.warning,
  danger: Tokens.danger,
};
Object.keys(ColorToken).forEach((k: string) => {
  const item = (ColorToken as Record<string, any>)[k];

  LightToken.push({
    key: k,
    name: item.name,
    desc: item.description,
    value: item.value.map((sItem: any) => {
      return {
        key: sItem.key,
        description: sItem.description,
        value: sItem.value.light,
      };
    }),
  });
});
</script>
<template>
  <div class="page-demo" :class="{ dark: theme === 'dark' }" :style="style">
    <h2>应用色</h2>
    <div class="catg-list">
      <div class="token-catg" v-for="catg in LightToken" :key="catg.key">
        <h3>
          {{ catg.name }} <span>{{ catg.key }}</span>
        </h3>
        <div class="token-list">
          <table>
            <tr v-for="tk in catg.value" :key="tk.key">
              <td><div class="token-box" :style="{ background: tk.value }"></div></td>
              <td>
                <div class="token-name">{{ tk.key }}</div>
              </td>
              <td>
                <div class="token-val">{{ tk.value }}</div>
              </td>
              <td>
                <div class="token-desc">{{ tk.description }}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div>
      <div class="row">
        <h2>色盘</h2>
        <div @click="changeTheme" class="theme-btn">{{ theme }}</div>
      </div>
      <div class="palette-catg">
        <div class="catg-item" v-for="(item, key) in ColorPalette" :key="key">
          <div class="catg-key">{{ item.name }} {{ key }}</div>
          <div class="color-item" v-for="(sItem, idx) in item.value" :key="idx">
            <div class="color-box" :style="{ background: `rgb(${(sItem as any).value[theme]})` }"></div>
            <div class="">
              <div class="color-key">{{ sItem.key }}</div>
              <div class="color-val">{{ `rgb(${(sItem as any).value[theme]})` }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
h2 {
  margin-top: 40px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-demo {
  padding: 0 24px 32px;
  color: #000;
  &.dark {
    background-color: #000;
    color: #fff;
  }
}
.catg-key {
  font-size: 18px;
  margin-bottom: 8px;
}
.color-key {
  font-size: 14px;
}
.color-val {
  font-size: 12px;
  opacity: 0.6;
}
.theme-btn {
  cursor: pointer;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
}
.palette-catg {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.color-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.color-box {
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 8px;
  box-shadow: 0 0 1px rgba($color: #000000, $alpha: 0.5);
}
.token-box {
  width: 100px;
  height: 40px;
  // border-radius: 4px;
  box-shadow: 0 0 1px rgba($color: #000000, $alpha: 0.5);
  flex-shrink: 0;
}
.catg-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.token-item {
  display: flex;
  margin-bottom: 12px;
  gap: 12px;
}
.token-val {
  flex-shrink: 0;
}
.token-name {
  flex-shrink: 0;
}
.token-list {
  table {
    border-collapse: collapse;
  }
  td {
    padding: 0 4px;
  }
}
</style>
