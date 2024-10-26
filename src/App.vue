<script setup lang="ts">
import { routes } from "./router";
</script>

<template>
  <header>
    <nav>
      <div v-for="item in routes" class="nav-item">
        <router-link :to="item.path" class="link">{{ item.title }}</router-link>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>
<style lang="scss">
// @import url("./assets/fonts/HarmonyOS/harmonyos-fonts.css");
</style>

<style scoped lang="scss">
header {
  height: 48px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
}
nav {
  display: flex;
}
.nav-item {
  display: flex;
  padding: 0 20px;
  &:hover {
    background-color: #eee;
  }
}
.link {
  display: flex;
  align-items: center;
  color: #333;
}
</style>
