<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
// @ts-ignore
import { generate as ArcoGenerate } from "@arco-design/color";
import { generate as AntGenerate } from "@ant-design/colors";

document.title = "Design Token -- Color Generate";

const theme = ref("light");

const changeTheme = () => {
  if (theme.value === "light") {
    theme.value = "dark";
  } else {
    theme.value = "light";
  }
};

const color1Pick = ref<string>("#f0ff00");
const arcoColors = computed(() => {
  const r = [];
  for (let i = 1; i <= 10; i++)
    r.push(
      ArcoGenerate(color1Pick.value, {
        index: i,
        dark: theme.value === "dark",
      })
    );
  return r;
});
const antColors = computed(() => {
  return AntGenerate(color1Pick.value, {
    theme: theme.value === "dark" ? "dark" : "default",
  });
});

console.log(arcoColors, antColors.value);
</script>
<template>
  <div class="page-demo">
    <h2>Color Generate</h2>
    <div @click="changeTheme" class="theme-btn">{{ theme }}</div>

    <div class="mix-section">
      <div class="color-box">
        <div class="name">Color 1</div>
        <div class="value"><input type="text" v-model="color1Pick" style="width: 100px" /></div>
        <div class="color-item" :style="{ backgroundColor: color1Pick }"><input type="color" v-model="color1Pick" class="color-picker" /></div>
      </div>
      <div class="color-list">
        <h2>Arco Design</h2>
        <div class="color-item" v-for="(item, idx) in arcoColors" :key="idx" :style="{ backgroundColor: item }">
          <div class="value">{{ item }}</div>
        </div>
      </div>
      <div class="color-list">
        <h2>Ant Design</h2>
        <div class="color-item" v-for="(item, idx) in antColors" :key="idx" :style="{ backgroundColor: item }">
          <div class="value">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-demo {
  text-align: center;
  font-size: 18px;
}
h2 {
  font-size: 48px;
}
.color-item {
  width: 400px;
  height: 60px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  position: relative;
  margin: auto;
}

input {
  line-height: 32px;
  padding: 0 4px;
  width: 60px;
  border: 1px solid #eee;
}

.mix-section {
  display: flex;
  gap: 80px;
  justify-content: center;
}
.slider {
  width: 300px;
}
.value {
  margin: 8px 0;
}
.name {
  font-size: 32px;
  margin-bottom: 12px;
  font-weight: bold;
}
.chanel {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.color-percent {
  margin-bottom: 40px;
}
.color-picker {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
}
.theme-btn {
  cursor: pointer;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  user-select: none;
}
</style>
