<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { hexToRGB, rgbaToHex, getColorContrast } from "./util";

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

const color2Pick = ref<string>("#345A7F");

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
  r: 52,
  g: 90,
  b: 127,
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
const contrast = computed(() => {
  const v = getColorContrast(
    {
      r: color1.r,
      g: color1.g,
      b: color1.b,
    },
    {
      r: color2.r,
      g: color2.g,
      b: color2.b,
    }
  );
  return Number(v.toFixed(2));
});

const getLevel = (v: number, type: "normal" | "large") => {
  if (type === "normal") {
    if (v >= 7) {
      return "AAA";
    } else if (v >= 4.5) {
      return "AA";
    }
    return "FAIL";
  } else if (type === "large") {
    if (v >= 4.5) {
      return "AAA";
    } else if (v >= 3) {
      return "AA";
    }
    return "FAIL";
  }
};
const normalLevel = computed(() => {
  return getLevel(contrast.value, "normal");
});

const largeLevel = computed(() => {
  return getLevel(contrast.value, "large");
});
</script>
<template>
  <div class="page-demo">
    <h2>颜色对比度</h2>
    <div class="mix-section">
      <div class="color-item">
        <div class="name">Color 1</div>

        <div class="color-box" :style="{ backgroundColor: color1Str }">
          <input type="color" v-model="color1Pick" class="color-picker" />
          <div class="test-text" :style="{ color: color2Str }">
            <h3>无障碍色彩对比度</h3>
            <p>为了确保尽可能多的人可以使用您的产品，对比度需要符合WCAG 的 AA级 与 AAA级 标准。</p>
            <p>WCAG 的 AA级 要求小文本与背景的对比度至少为4.5：1，大文本与背景的对比度至少为3：1。</p>
            <p>WCAG 的 AAA级 要求小文本与背景的对比度至少为7：1，大文本与背景的对比度为4.5：1。</p>
            <p><span style="font-size: 18px; font-weight: bold">小文本指字号在19px以下的粗体文本类型</span>，或者是字号在24px以下的常规文本类型。</p>
            <p>
              <span style="font-size: 19px; font-weight: bold">大文本指字号至少是19px以上，字重为粗体的文本类型</span>，<span style="font-size: 24px"
                >或者字号是24px以上的常规体文本。</span
              >
            </p>
          </div>
        </div>
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

      <div class="color-item contrast">
        <div class="name">对比度</div>
        <div class="contrast-val">{{ contrast }} : 1</div>
        <div class="level-wrap">
          <div class="contrast-level">
            正常文本: <span class="level" :class="{ warning: normalLevel === 'FAIL' }">{{ normalLevel }}</span>
          </div>
          <div class="contrast-level">
            大文本: <span class="level" :class="{ warning: largeLevel === 'FAIL' }">{{ largeLevel }}</span>
          </div>
        </div>
        <p>参考： <a href="https://www.w3.org/TR/WCAG20/" target="_blank">WCAG 2.0</a></p>
      </div>
      <div class="color-item">
        <div class="name">Color 2</div>
        <div class="color-box" :style="{ backgroundColor: color2Str }">
          <input type="color" v-model="color2Pick" class="color-picker" />
          <div class="test-text" :style="{ color: color1Str }">
            <h3>无障碍色彩对比度</h3>
            <p>为了确保尽可能多的人可以使用您的产品，对比度需要符合WCAG 的 AA级 与 AAA级 标准。</p>
            <p>WCAG 的 AA级 要求小文本与背景的对比度至少为4.5：1，大文本与背景的对比度至少为3：1。</p>
            <p>WCAG 的 AAA级 要求小文本与背景的对比度至少为7：1，大文本与背景的对比度为4.5：1。</p>
            <p><span style="font-size: 18px; font-weight: bold">小文本指字号在19px以下的粗体文本类型</span>，或者是字号在24px以下的常规文本类型。</p>
            <p>
              <span style="font-size: 19px; font-weight: bold">大文本指字号至少是19px以上，字重为粗体的文本类型</span>，<span style="font-size: 24px"
                >或者字号是24px以上的常规体文本。</span
              >
            </p>
          </div>
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
  width: 600px;
  // height: 400px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  position: relative;
  margin: auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.color-item.contrast {
  min-width: 250px;
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
  text-align: left;
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
.contrast-val {
  font-size: 72px;
  font-weight: bold;
  margin: 60px 0;
}
.level-wrap {
  text-align: left;
}
.contrast-level {
  font-size: 32px;
  display: flex;
  justify-content: space-between;
  .level {
    color: #05d205;
    display: inline-block;
    width: 72px;
  }
  .warning {
    color: red;
  }
}

.test-text {
  padding: 24px;
  text-align: left;
}

h3 {
  font-size: 24px;
}
</style>
