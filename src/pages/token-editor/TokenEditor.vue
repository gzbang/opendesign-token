<script setup lang="ts">
import OTokens from '../../shared/token/opendesign-token.json';
import OpenMindTokens from '../../shared/token/openmind-token.json';
import AscendTokens from '../../shared/token/ascend-token.json';
import KunpengTokens from '../../shared/token/kunpeng-token.json';
import MindSporeTokens from '../../shared/token/mindspore-token.json';
import { normalizeTokens, getVars, getVarsByType } from './token';
import { ref, computed } from 'vue';
import { rgbToHex } from '../../shared/utils';

document.title = 'Design Token -- Editor';

const themeList = [
  { name: 'opendesign', token: OTokens },
  { name: 'openmind', token: OpenMindTokens },
  { name: 'ascend', token: AscendTokens },
  { name: 'kunpeng', token: KunpengTokens },
  { name: 'mindspore', token: MindSporeTokens }
];

const currentThemeIdx = ref(0);

const themeType = computed(() => themeList[currentThemeIdx.value].name);

const Tokens = computed(() => themeList[currentThemeIdx.value].token);

const currentStyle = ref('light');

const tokenList = computed(() => normalizeTokens(Tokens.value));

const currentTypeIdx = ref(0);
const currentType = computed(() => tokenList.value[currentTypeIdx.value].type);
const onNavClick = (idx: number) => {
  currentTypeIdx.value = idx;
};

const vars = computed(() => getVars(Tokens.value, currentStyle.value));
const paletteVars = computed(() =>
  getVarsByType(Tokens.value, currentStyle.value, 'palette')
);

const getPaletteVal = (colorStr: string) => {
  const rlt = {
    rgba: '',
    hex: ''
  };
  const regArr = colorStr.match(/^(rgba?\()var\((.*?)\)(.*)/);

  let paletteKey: string;
  if (regArr) {
    paletteKey = regArr[2];
  }

  const palette = paletteVars.value.find((item) => {
    return Object.keys(item)[0] === paletteKey;
  });

  if (palette) {
    const val = palette[Object.keys(palette)[0]];

    const rgbaStr = colorStr.replace(
      /^(rgba?\()var\((.*?)\)(.*)/,
      ($0, $1, $2, $3) => {
        return $1 + val + $3;
      }
    );

    rlt.rgba = rgbaStr;
    rlt.hex = rgbToHex(val);
  }
  return rlt;
};

getPaletteVal('rgb(var(--o-mixedgray-1))');

const style = computed(() => {
  const s = {};
  vars.value.forEach((item) => {
    Object.assign(s, item);
  });
  return s;
});

const changeStyle = () => {
  currentStyle.value = currentStyle.value === 'light' ? 'dark' : 'light';
};

const onThemeTypeClick = (idx: number) => {
  currentThemeIdx.value = idx;
};
</script>
<template>
  <div class="design-token-page" :style="style" :data-o-theme="currentStyle">
    <svg style="width: 0; height: 0; visibility: hidden; display: block">
      <symbol id="icon1" viewBox="0 0 32 32">
        <path
          fill="currentColor"
          d="M14.667 4c5.891 0 10.667 4.776 10.667 10.667 0 2.464-.836 4.733-2.239 6.539l4.448 4.451-1.886 1.886-4.449-4.449a10.62 10.62 0 0 1-6.541 2.24C8.776 25.334 4 20.558 4 14.667S8.776 4 14.667 4zm0 2.667a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"
        />
      </symbol>
      <symbol id="edit" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
        ></path>
      </symbol>
    </svg>

    <div class="style-switch" @click="changeStyle">
      <svg
        v-if="currentStyle === 'light'"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M16 12c2.209 0 4 1.791 4 4s-1.791 4-4 4c-2.209 0-4-1.791-4-4s1.791-4 4-4v0zM16 9.333c-3.682 0-6.667 2.985-6.667 6.667s2.985 6.667 6.667 6.667c3.682 0 6.667-2.985 6.667-6.667s-2.985-6.667-6.667-6.667v0zM15.333 6.667h1.333c0.368 0 0.667-0.298 0.667-0.667v-2.667c0-0.368-0.298-0.667-0.667-0.667h-1.333c-0.368 0-0.667 0.298-0.667 0.667v2.667c0 0.368 0.298 0.667 0.667 0.667zM16.667 25.333h-1.333c-0.368 0-0.667 0.298-0.667 0.667v2.667c0 0.368 0.298 0.667 0.667 0.667h1.333c0.368 0 0.667-0.298 0.667-0.667v-2.667c0-0.368-0.298-0.667-0.667-0.667zM28.667 14.667h-2.667c-0.368 0-0.667 0.298-0.667 0.667v1.333c0 0.368 0.298 0.667 0.667 0.667h2.667c0.368 0 0.667-0.298 0.667-0.667v-1.333c0-0.368-0.298-0.667-0.667-0.667zM6.667 16.667v-1.333c0-0.368-0.298-0.667-0.667-0.667h-2.667c-0.368 0-0.667 0.298-0.667 0.667v1.333c0 0.368 0.298 0.667 0.667 0.667h2.667c0.368 0 0.667-0.298 0.667-0.667zM23.067 9.867c0.125 0.126 0.296 0.197 0.473 0.197s0.348-0.071 0.473-0.197l1.88-1.867c0.126-0.125 0.197-0.296 0.197-0.473s-0.071-0.348-0.197-0.473l-0.933-0.933c-0.125-0.126-0.296-0.197-0.473-0.197s-0.348 0.071-0.473 0.197l-1.88 1.88c-0.126 0.125-0.197 0.296-0.197 0.473s0.071 0.348 0.197 0.473l0.933 0.92zM8.933 22.133c-0.125-0.126-0.296-0.197-0.473-0.197s-0.348 0.071-0.473 0.197l-1.88 1.867c-0.126 0.125-0.197 0.296-0.197 0.473s0.071 0.348 0.197 0.473l0.933 0.933c0.125 0.126 0.296 0.197 0.473 0.197s0.348-0.071 0.473-0.197l1.88-1.88c0.126-0.125 0.197-0.296 0.197-0.473s-0.071-0.348-0.197-0.473l-0.933-0.92zM24 22.133c-0.125-0.126-0.296-0.197-0.473-0.197s-0.348 0.071-0.473 0.197l-0.933 0.933c-0.126 0.125-0.197 0.296-0.197 0.473s0.071 0.348 0.197 0.473l1.88 1.88c0.125 0.126 0.296 0.197 0.473 0.197s0.348-0.071 0.473-0.197l0.933-0.933c0.126-0.125 0.197-0.296 0.197-0.473s-0.071-0.348-0.197-0.473l-1.88-1.88zM8 9.867c0.125 0.126 0.296 0.197 0.473 0.197s0.348-0.071 0.473-0.197l0.933-0.933c0.25-0.263 0.245-0.678-0.013-0.933l-1.867-1.893c-0.125-0.126-0.296-0.197-0.473-0.197s-0.348 0.071-0.473 0.197l-0.933 0.933c-0.126 0.125-0.197 0.296-0.197 0.473s0.071 0.348 0.197 0.473l1.88 1.88z"
        ></path>
      </svg>
      <svg
        v-else
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M10.643 6.363c0.282 3.891 1.958 7.55 4.72 10.302 2.744 2.744 6.384 4.407 10.253 4.684-2.324 3.939-6.85 6.016-11.348 5.207s-8.019-4.333-8.828-8.835c-0.808-4.502 1.267-9.033 5.203-11.358v0zM12.523 2.667h-0.187c-6.218 1.884-10.24 7.902-9.604 14.374s5.751 11.591 12.216 12.227c6.466 0.636 12.479-3.389 14.361-9.613v0c0.064-0.242-0.002-0.499-0.173-0.681l-0.12-0.12c-0.138-0.125-0.321-0.187-0.507-0.174h-0.080c-0.54 0.069-1.083 0.104-1.627 0.107-3.89 0.002-7.595-1.666-10.175-4.58s-3.788-6.795-3.319-10.66c0.015-0.207-0.057-0.41-0.2-0.561l-0.12-0.12c-0.124-0.125-0.291-0.196-0.467-0.2z"
        ></path>
      </svg>
    </div>
    <div class="theme-switch">
      <div
        v-for="(item, idx) in themeList"
        :key="item.name"
        class="theme-item"
        :class="{ 'is-active': themeType === item.name }"
        @click="onThemeTypeClick(idx)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="token-body">
      <div class="token-nav">
        <h2>Design Token</h2>
        <div
          v-for="(item, idx) in tokenList"
          :key="item.type"
          class="token-nav-item"
          @click="onNavClick(idx)"
          :class="{ active: item.type === currentType }"
        >
          <div>{{ item.name }}</div>
          <div class="type">{{ item.type }}</div>
        </div>
      </div>
      <div class="token-list">
        <div
          class="token-section"
          v-for="item in tokenList"
          :key="item.type"
          :class="item.type"
          v-show="item.type === currentType"
        >
          <template v-if="item.type !== 'font'">
            <div class="token-catg-list">
              <div
                class="token-catg"
                v-for="catg in item.value"
                :key="catg.catg"
              >
                <div class="token-catg-name">
                  {{ catg.name }}<span>{{ catg.catg }}</span>
                </div>
                <div class="token-vars" :class="[item.type, catg.catg]">
                  <div
                    class="token-item"
                    :class="[item.type, catg.catg]"
                    v-for="tk in catg.value"
                    :key="tk.key"
                  >
                    <template v-if="tk.value[currentStyle]">
                      <div
                        class="token-display color"
                        v-if="item.type === 'color'"
                      >
                        <div
                          class="token-show color"
                          :style="{ background: tk.value[currentStyle] }"
                        ></div>
                        <div class="token-val">
                          {{ tk.value[currentStyle] }}
                        </div>
                        <div class="token-val">
                          {{ getPaletteVal(tk.value[currentStyle]).rgba }}
                        </div>
                        <div class="token-val">
                          {{ getPaletteVal(tk.value[currentStyle]).hex }}
                        </div>
                      </div>
                      <div
                        class="token-display palette"
                        v-else-if="item.type === 'palette'"
                      >
                        <div
                          class="token-show palette"
                          :style="{
                            background: `rgb(${tk.value[currentStyle]})`
                          }"
                        ></div>
                        <div class="token-val">
                          rgb: {{ tk.value[currentStyle] }}
                        </div>
                        <div class="token-val">
                          hex:
                          {{ rgbToHex(tk.value[currentStyle]) }}
                        </div>
                      </div>
                      <div
                        class="token-display"
                        v-else-if="item.type === 'shadow'"
                      >
                        <div
                          class="token-show shadow"
                          :style="{ boxShadow: tk.value[currentStyle] }"
                        ></div>
                        <div class="token-val">
                          {{ tk.value[currentStyle] }}
                        </div>
                      </div>
                      <div
                        class="token-display size"
                        v-else-if="catg.catg === 'control_size'"
                      >
                        <div class="token-show size">
                          <div
                            class="token-show-size-box"
                            :style="{ height: tk.value[currentStyle] }"
                          ></div>
                        </div>
                        <div class="token-val">
                          {{ tk.value[currentStyle] }}
                        </div>
                      </div>
                      <div
                        class="token-display"
                        v-else-if="
                          catg.catg === 'icon_size' ||
                          catg.catg === 'icon_size_control'
                        "
                      >
                        <div class="token-show icon">
                          <div
                            class="token-icon"
                            :style="{ fontSize: tk.value[currentStyle] }"
                          >
                            <svg>
                              <use xlink:href="#icon1" />
                            </svg>
                          </div>
                        </div>
                        <div class="token-val">
                          {{ tk.value[currentStyle] }}
                        </div>
                      </div>
                      <div
                        class="token-display"
                        v-else-if="
                          catg.catg === 'radius' ||
                          catg.catg === 'radius_control'
                        "
                      >
                        <div
                          class="token-show radius"
                          :style="{ borderRadius: tk.value[currentStyle] }"
                        ></div>
                        <div class="token-val">
                          {{ tk.value[currentStyle] }}
                        </div>
                      </div>
                      <div
                        class="token-display"
                        v-else-if="item.type === 'gap'"
                      >
                        <div class="token-show gap">
                          <div class="token-box"></div>
                          <div
                            class="token-box"
                            :style="{ marginTop: tk.value[currentStyle] }"
                          ></div>
                        </div>
                        <div class="token-val">
                          {{ tk.value[currentStyle] }}
                        </div>
                      </div>
                      <div
                        class="token-display animation"
                        v-else-if="item.type === 'animation'"
                      >
                        <div class="token-show">
                          <div
                            class="token-ball"
                            v-if="catg.catg === 'duration'"
                            :style="{
                              animationDuration: tk.value[currentStyle]
                            }"
                          ></div>
                          <div
                            class="token-ball"
                            v-if="catg.catg === 'easing'"
                            :style="{
                              animationTimingFunction: tk.value[currentStyle]
                            }"
                          ></div>
                        </div>
                        <div class="token-val">
                          {{ tk.value[currentStyle] }}
                        </div>
                      </div>
                    </template>
                    <div class="token-name">
                      {{ tk.name }}
                      <span class="token-key">--o-{{ tk.key }}</span>
                    </div>
                    <div class="token-desc">{{ tk.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="token-item"
              v-for="(tk, idx) in item.value[0].value"
              :key="tk.key"
            >
              <div class="token-display font">
                <div class="token-val">
                  字号[{{ tk.key }}]: {{ tk.value[currentStyle] }}
                </div>
                <div class="token-val">
                  行高[{{ item.value[1].value[idx].key }}]:
                  {{ item.value[1].value[idx].value[currentStyle] }}
                </div>
                <div
                  class="token-show-font"
                  :style="{
                    fontSize: tk.value[currentStyle],
                    lineHeight: item.value[1].value[idx].value[currentStyle]
                  }"
                >
                  {{ tk.name }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:root {
  --c1: #000;
  --c2: #fff;
  --c3: #666;
  --c4: #333;
}
[data-o-theme='dark'] {
  --c1: #fff;
  --c2: #000;
  --c3: #f7f7f7;
  --c4: #ededed;
}

.design-token-page {
  background-color: var(--o-color-fill1);
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -2px;
}
h2 {
  text-align: center;
  padding: 24px 0 36px;
  margin: 0;
  background-color: #002fa7;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
}
.token-body {
  display: flex;
}
.token-nav {
  background-color: #f9f9f9;
  position: sticky;
  top: 0;
  display: inline-block;
  width: 120px;
  vertical-align: top;
  height: 100vh;
}
.token-nav-item {
  text-align: center;
  font-size: 24px;
  color: #000;
  padding: 24px;
  cursor: pointer;

  .type {
    font-size: 0.6em;
    color: #666;
  }

  &.active {
    background-color: #c7d7ff;
  }
}
.token-list {
  padding-top: 24px;
  height: 100vh;
  width: calc(100vw - 120px);
  overflow: auto;
  padding-left: 48px;
}
.token-section {
  padding-bottom: 24px;
  margin-bottom: 24px;
}

.token-catg {
  margin-bottom: 24px;
}
.token-catg-name {
  font-size: 20px;
  color: var(--c1);
  > span {
    font-size: 0.8em;
    color: var(--c3);
    margin-left: 8px;
  }
}
.token-vars {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  align-items: flex-end;
  &.palette {
    justify-content: flex-start;
  }
}
.token-item {
  text-align: center;
  margin: 12px;

  &.animation {
    width: 100%;
    text-align: left;
  }
  &.palette {
    margin: 0;
  }

  &.size {
    min-width: 240px;
  }
}
.token-display {
  min-width: 150px;

  &.font {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .token-val {
      margin-right: 12px;
      margin-top: 0;
    }
    .token-show-font {
      margin-left: 36px;
    }
  }
  &.palette {
    .token-show {
      margin: 0;
      width: 100%;
    }
  }
}

.token-show-size-box {
  width: 120px;
  border: 1px solid #999;
  margin: auto;
}
.token-show {
  margin: auto;

  &.color {
    width: 100px;
    height: 60px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  &.palette {
    height: 60px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  }
  &.size {
    height: 60px;
    display: flex;
    align-items: flex-end;
  }
  &.shadow {
    width: 120px;
    height: 120px;
  }
  &.icon {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.radius {
    width: 64px;
    height: 64px;
    border: 1px solid #999;
  }
}
.token-val {
  margin-top: 8px;
  color: var(--c3);
  font-size: 12px;
}
.token-name {
  margin-top: 8px;
  font-size: 14px;
  color: var(--c4);
}
.token-desc {
  margin-top: 4px;
  font-size: 12px;
  color: var(--c3);
}
.token-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    vertical-align: top;
    width: 1em;
    height: 1em;
    color: currentColor;
  }
}
.token-box {
  width: 120px;
  height: 32px;
  margin: auto;
  background-color: #eee;
}

@keyframes move {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(300px, 0, 0);
  }
}

.token-ball {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #aaa;
  animation: move infinite;
  animation-duration: 1000ms;
  animation-timing-function: linear;
}

.style-switch {
  cursor: pointer;
  position: fixed;
  top: 48px;
  right: 160px;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.1);
}

.theme-switch {
  position: fixed;
  top: 48px;
  right: 0;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.1);
}
.theme-item {
  cursor: pointer;
  + .theme-item {
    margin-top: 8px;
  }
  &:hover {
    color: blue;
  }
  &.is-active {
    color: red;
    text-decoration: underline;
  }
}
</style>
