<script setup>
// store.addMenu(router);
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

//全局路由守卫
import { useStore } from "./store";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
router.beforeEach((to, from, next) => {
  store.getToken();
  const token = store.token;
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});
</script>

<template>
  <router-view />
</template>

<style>
#app {
  height: 100%;
}
</style>
