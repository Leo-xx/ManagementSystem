<template>
  <el-form :model="loginForm" class="login-container">
    <h3>登录页面</h3>
    <el-form-item>
      <el-input
        type="input"
        placeholder="请输入账号"
        v-model="loginForm.username"
      />
    </el-form-item>
    <el-form-item>
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="loginForm.password"
      /> </el-form-item
    ><el-form-item>
      <el-button type="primary" class="logBut" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { getCurrentInstance } from "@vue/runtime-core";
import { useStore } from "../store";
import { useRouter } from "vue-router";
export default {
  setup() {
    const loginForm = reactive({
      username: "admin",
      password: "admin",
    });
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    //click login button getMenu
    const login = async () => {
      let res = await proxy.$api.getMenu(loginForm);
      store.setMenu(res.data.data.menu);
      // store.addMenu(router);
      // console.log(res.data.data.token);
      store.setToken(res.data.data.token);
      router.push({
        name: "home",
      });
    };
    return {
      loginForm,
      login,
    };
  },
};
</script>

<style lang="less" scoped>
.login-container {
  margin: 180px auto;
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }
  .logBut {
    margin-left: 100px;
  }
}
</style>
