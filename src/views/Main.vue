<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container>
        <common-header />
        <common-tab />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTab from "../components/CommonTab.vue";
export default defineComponent({
  components: {
    CommonHeader,
    CommonAside,
    CommonTab,
  },
});
</script>
<style lang="less" scoped>
// body {
//   margin: 0;
//   padding: 0;
// }
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
}
.common-layout {
  .lay-container {
    flex-wrap: nowrap;
  }
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background: grey;
    }
  }
}
</style>
