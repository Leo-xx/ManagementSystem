<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in store.tabList"
      :key="item.name"
      :disable-transitions="false"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeTag(item)"
      @close="closeTag(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store/index";
export default {
  setup() {
    let store = useStore();
    const router = useRouter();
    const route = useRoute();

    const changeTag = (item) => {
      router.push(item.path);
    };
    const closeTag = (item, index) => {
      let length = store.tabList.length - 1;
      //调用store中删减数组的方法
      store.reduceTablist(item);
      //做判断
      //如果关闭的标签页不是当前的标签页 那就什么也不做
      if (route.name !== item.name) {
        return;
      }
      if (route.name == item.name) {
        router.push({
          name: store.tabList[index - 1].name,
        });
      } else {
      }
    };
    return {
      store,
      changeTag,
      closeTag,
    };
  },
};
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
