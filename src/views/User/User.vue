<template>
  <!-- 用户页面头部新增按钮和搜索 -->
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入：">
        <el-input v-model="formInline.keyword" placeholder="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 用户信息渲染展示区 -->
  <div class="table">
    <el-table :data="list" style="width: 100%" height="550px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="130">
        <template #default="scope">
          <el-button size="small" @click="userEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="userDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      class="pager mt-4"
      @current-change="changePage"
    />
  </div>
  <!-- 新增用户对话框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form
      :inline="true"
      :model="formContent"
      class="demo-form-inline"
      ref="userForm"
    >
      <el-form-item
        label="姓名"
        prop="name"
        :rules="[
          {
            required: true, //是否必填
            message: '请输入姓名',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="formContent.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          {
            required: true,
            message: '请输入年龄',
            trigger: 'blur',
          },
          { type: 'number', message: '年龄必须是数字' },
        ]"
      >
        <el-input v-model.number="formContent.age" placeholder="请输入年龄" />
      </el-form-item>
      <el-form-item
        label="性别"
        prop="sex"
        :rules="[
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur',
          },
        ]"
      >
        <el-select v-model="formContent.sex" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="日期"
        prop="birth"
        :rules="[
          {
            required: 'true',
            message: '出生日期是必选项',
            trigger: 'blur',
          },
        ]"
      >
        <el-date-picker
          v-model="formContent.birth"
          type="date"
          label="出生日期"
          placeholder="请输入"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="addr"
        :rules="[
          {
            required: true,
            message: '请输入地址',
          },
        ]"
      >
        <el-input v-model="formContent.addr" placeholder="请输入地址" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    const config = reactive({
      total: 0,
      page: 1,
      name: "",
    });
    const getUserData = async (config) => {
      // await axios.get("/user/getUser").then((res) => {
      //   // console.log(res.data.count);
      //   config.total = res.data.count;
      //   list.value = res.data.list.map((item) => {
      //     item.sexLabel = item.sex === 0 ? "女" : "男";
      //     return item;
      //   });
      //   // console.log(list);
      // });

      let res = await proxy.$api.getUserData(config);
      config.total = res.data.count;
      list.value = res.data.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "女" : "男";
        return item;
      });
    };
    const changePage = (page) => {
      config.page = page;
      // console.log(config.page);
      getUserData(config);
    };
    const formInline = reactive({
      keyword: "",
    });
    const userSearch = () => {
      config.name = formInline.keyword;
      getUserData(config);
    };
    //控制对话框显示or隐藏
    const dialogVisible = ref(false);
    onMounted(() => {
      getUserData(config);
    });
    //新增用户对话框中点击 × 时
    const handleClose = (done) => {
      ElMessageBox.confirm("确定关闭吗?")
        .then(() => {
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    //点击新增用户按钮
    const handleAdd = () => {
      dialogVisible.value = true;
      action.value = "add";
    };
    const formContent = reactive({
      name: "",
      age: "",
      addr: "",
      birth: "",
      sex: "",
    });
    //对日期格式进行处理
    const dateFormat = (time) => {
      var time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var day = time.getDate();
      function add(m) {
        return m < 10 ? "0" + m : m;
      }
      return year + "-" + add(month) + "-" + add(day);
    };
    //添加用户
    const onSubmit = () => {
      //添加前做表单校验
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          //区分添加还是编辑
          if (action.value == "add") {
            formContent.birth = dateFormat(formContent.birth);
            let res = await proxy.$api.addUser(formContent);
            // console.log(res);
            getUserData(config);
            dialogVisible.value = false;
            //添加用户后重置表单
            proxy.$refs.userForm.resetFields();
          } else {
            formContent.sex == "男"
              ? (formContent.sex = 1)
              : (formContent.sex = 0);
            let res = await proxy.$api.editUser(formContent);
            dialogVisible.value = false;
            proxy.$refs.userForm.resetFields();
            getUserData(config);
          }
        }
      });
    };
    // 当在新增用户对话框点击取消时
    const onCancel = () => {
      proxy.$refs.userForm.resetFields();
      dialogVisible.value = false;
    };
    //区分编辑和新增
    const action = ref("add");
    //用户信息编辑
    const userEdit = (row) => {
      action.value = "edit";
      dialogVisible.value = true;
      row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
      proxy.$nextTick(() => {
        Object.assign(formContent, row);
      });
    };

    //用户信息删除
    const userDelete = (row) => {
      ElMessageBox.confirm("你确定删除吗?")
        .then(async () => {
          await proxy.$api.deleteUser({
            id: row.id,
          });

          ElMessage({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          getUserData(config);
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      userSearch,
      dialogVisible,
      handleClose,
      formContent,
      onSubmit,
      onCancel,
      userEdit,
      userDelete,
      action,
      handleAdd,
    };
  },
});
</script>
<style lang="less" scoped>
.table {
  position: relative;
  height: 600px;
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>
