<template>
  <el-aside :width="store.isCollapse ? '64px' : '180px'">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="grey"
      text-color="#fff"
      :collapse="store.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-if="!store.isCollapse">通用后台管理</h3>
      <h3 v-if="store.isCollapse">后台</h3>
      <el-menu-item
        :index="item.label"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <!-- 动态引入icon -->
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :Index="subItem.path"
            v-for="subItem in item.children"
            :key="subItem.subIdex"
            @click="showPage(subItem)"
          >
            <!-- <template> -->
            <!-- 动态引入icon -->
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
            <!-- </template> -->
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { useStore } from "../store";
// import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
export default {
  setup() {
    const list = [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "house",
        url: "Home/Home",
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "Edit",
        url: "MallManage/MallManage",
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "UserManage/UserManage",
      },
      {
        path: "/other",
        name: "other",

        label: "其他",
        icon: "location",
        url: "Other",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "setting",
            url: "Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting",
            url: "Other/PageTwo",
          },
        ],
      },
    ];
    const router = useRouter();
    const store = useStore();

    const asyncList = store.menu;

    const hasChildren = () => {
      //list.filter 过滤符合条件数组
      return asyncList.filter((item) => item.children);
    };
    const noChildren = () => {
      return asyncList.filter((item) => !item.children);
    };

    //点击左侧菜单栏 跳转路由
    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });
      store.selectMenu(item);
    };
    const showPage = (subItem) => {
      router.push({
        name: subItem.name,
      });
      // console.log(subItem);
      store.selectMenu(subItem);
    };
    return {
      hasChildren,
      noChildren,
      store,
      // router,
      clickMenu,
      showPage,
    };
  },
};
</script>
<style lang="less" scoped>
// .el-menu-vertical-demo {
//   height: 100%;
// }
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
}
</style>
