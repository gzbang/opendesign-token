<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { hexToRGB, rgbaToHex } from "./util";

document.title = "Design Token -- Color Mix";
const color1Pick = ref<string>("#fff");

watch(
  () => color1Pick.value,
  (v) => {
    console.log(v);

    const c = hexToRGB(v);
    color1.r = c.r;
    color1.g = c.g;
    color1.b = c.b;
  }
);

const color2Pick = ref<string>("#4587c4");

watch(
  () => color2Pick.value,
  (v) => {
    console.log(v);

    const c = hexToRGB(v);
    color2.r = c.r;
    color2.g = c.g;
    color2.b = c.b;
  }
);

const color1 = reactive({
  r: 255,
  g: 255,
  b: 255,
  a: 100,
  p: 50,
});

const color1Str = computed(() => {
  return `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${color1.a / 100})`;
});
const color1Hex = ref(rgbaToHex(color1Str.value));

watch(
  () => color1Hex.value,
  (v) => {
    const c = hexToRGB(v);
    color1.r = c.r;
    color1.g = c.g;
    color1.b = c.b;
  }
);

const color2 = reactive({
  r: 69,
  g: 135,
  b: 196,
  a: 100,
  p: 50,
});

const color2Str = computed(() => {
  return `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${color2.a / 100})`;
});
const color2Hex = ref(rgbaToHex(color2Str.value));

watch(
  () => color2Hex.value,
  (v) => {
    const c = hexToRGB(v);
    color2.r = c.r;
    color2.g = c.g;
    color2.b = c.b;
  }
);

const color3 = computed(() => {
  return {
    r: Math.ceil((color1.r * color1.p) / 100 + (color2.r * color2.p) / 100),
    g: Math.ceil((color1.g * color1.p) / 100 + (color2.g * color2.p) / 100),
    b: Math.ceil((color1.b * color1.p) / 100 + (color2.b * color2.p) / 100),
    a: Math.ceil((color1.a * color1.p) / 100 + (color2.a * color2.p) / 100),
  };
});

const color3Str = computed(() => {
  return `rgba(${color3.value.r}, ${color3.value.g}, ${color3.value.b}, ${color3.value.a / 100})`;
});
const color3Hex = computed(() => {
  const v = rgbaToHex(color3Str.value);
  return v;
});
</script>
<template>
  <div class="page-demo">
    <h2>Color Mix</h2>
    <div class="mix-section">
      <div class="color-item">
        <div class="name">Color 1</div>

        <div class="color-box" :style="{ backgroundColor: color1Str }"><input type="color" v-model="color1Pick" class="color-picker" /></div>
        <div class="value">{{ color1Str }}</div>
        <div class="value"><input type="text" v-model="color1Hex" style="width: 100px" /></div>
        <div class="color-input">
          <div class="chanel">
            R:
            <input type="range" min="0" max="255" class="slider" v-model="color1.r" />
            <input type="text" v-model="color1.r" />
          </div>
          <div class="chanel">
            G:
            <input type="range" min="0" max="255" class="slider" v-model="color1.g" />
            <input type="text" v-model="color1.g" />
          </div>
          <div class="chanel">
            B:
            <input type="range" min="0" max="255" class="slider" v-model="color1.b" />
            <input type="text" v-model="color1.b" />
          </div>
          <div class="chanel">
            A:
            <input type="range" min="0" max="100" class="slider" v-model="color1.a" disabled />
            <input type="text" v-model="color1.a" readonly />
          </div>
        </div>
        <div class="color-percent">
          <span>混合比：<input type="range" min="0" max="100" class="slider" v-model="color1.p" /> <input type="text" v-model="color1.p" />% </span>
        </div>
      </div>
      <div class="color-item">
        <div class="name">Color 2</div>
        <div class="color-box" :style="{ backgroundColor: color2Str }">
          <input type="color" v-model="color2Pick" class="color-picker" />
        </div>
        <div class="value">{{ color2Str }}</div>
        <div class="value"><input type="text" v-model="color2Hex" style="width: 100px" /></div>
        <div class="color-input">
          <div class="chanel">
            R:
            <input type="range" min="0" max="255" class="slider" v-model="color2.r" />
            <input type="text" v-model="color2.r" />
          </div>
          <div class="chanel">
            G:
            <input type="range" min="0" max="255" class="slider" v-model="color2.g" />
            <input type="text" v-model="color2.g" />
          </div>
          <div class="chanel">
            B:
            <input type="range" min="0" max="255" class="slider" v-model="color2.b" />
            <input type="text" v-model="color2.b" />
          </div>
          <div class="chanel">
            A:
            <input type="range" min="0" max="100" class="slider" v-model="color2.a" disabled />
            <input type="text" v-model="color2.a" readonly />
          </div>
        </div>
        <div class="color-percent">
          <span>混合比：<input type="range" min="0" max="100" class="slider" v-model="color2.p" /> <input type="text" v-model="color2.p" /> % </span>
        </div>
      </div>
      <div class="color-item">
        <div class="name">混合颜色</div>
        <div class="color-box" :style="{ backgroundColor: color3Str }"></div>
        <div class="value">{{ color3Str }}</div>
        <div class="value">{{ color3Hex }}</div>
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
.color-box {
  width: 400px;
  height: 400px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  position: relative;
  margin: auto;
  border-radius: 8px;
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
</style>
