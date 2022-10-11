<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover" style="margin-bottom: 20px">
        <div class="user">
          <img src="src\assets\images\user.JPG" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间<span>2022-9-12</span></p>
          <p>上次登录地点<span>广州</span></p>
        </div>
      </el-card>
      <el-card shadow="hover">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="detail">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <!-- 动态引入图标 -->
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="">
            <p class="val">¥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    let tableData = ref([]);
    let countData = ref([]);
    const tableLabel = {
      name: "课程",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总共购买",
    };
    const getTableList = async () => {
      await axios
        .get(
          "https://www.fastmock.site/mock/7013b3338b0834109ca2baeb4952aba3/api/home/getTableData"
        )
        .then((res) => {
          if (res.data.code == 200) {
            tableData.value = res.data.homeData.tableData;
          }
          // console.log(res);
        });
    };
    const getCountData = async () => {
      await axios
        .get(
          "https://www.fastmock.site/mock/7013b3338b0834109ca2baeb4952aba3/api/home/getCountData"
        )
        .then((res) => {
          if (res.data.code == 200) {
            countData.value = res.data.data;
          }
          // console.log(res.data.data);
        });
    };

    onMounted(() => {
      getTableList();
      getCountData();
    });
    return {
      tableData,
      tableLabel,
      countData,
    };
  },
});
</script>
<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      height: 150px;
      width: 150px;
    }
  }

  .detail {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    .el-card {
      width: 300px;
      height: 100px;
      margin-bottom: 10px;
      .icons {
        width: 100px;
      }
      .val {
        font-size: 24px;
        padding: 10px;
      }
      .txt {
        font-size: 18px;
        padding: 10px;
      }
    }
  }
}
</style>
