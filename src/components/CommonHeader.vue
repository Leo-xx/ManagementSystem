<template>
  <el-header>
    <div class="l-content">
      <!-- 图标引入 -->
      <el-button @click="collapseAside" style="margin-right: 10px">
        <el-icon><Menu /></el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="store.currentMenu.path"
          v-if="store.currentMenu"
          >{{ store.currentMenu.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/images/user.JPG" alt="" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="signOut">退出 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { useStore } from "../store/index";
import { useRouter } from "vue-router";
export default {
  setup() {
    let store = useStore();
    let router = useRouter();
    //折叠按钮 点击事件
    let collapseAside = () => {
      store.updateIsCollapse();
      // console.log(store);
      // console.log(store.isCollapse);
    };
    const signOut = () => {
      store.cleanMenu();
      store.cleanToken();
      router.push({
        name: "login",
      });
    };
    return {
      store,
      collapseAside,
      signOut,
    };
  },
};
</script>
<style lang="less" scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: cornflowerblue;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  & > h3 {
    margin-left: 20px;
    color: #fff;
  }
}
// .bread /deep/ span {
//   color: #fff !important;
//   cursor: pointer !important;
// }
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
