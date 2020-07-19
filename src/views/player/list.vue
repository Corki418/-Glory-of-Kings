<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录账户">
        <template v-slot="{row}">
          <span>{{ row.accountname }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    ></pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getPlayers } from "@/api/players";
import { Player } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";

@Component({
  name: "PlayerList",
  components: {
    Pagination
  }
})
export default class extends Vue {
  // 玩家数据
  private list: Player[] = [];
  // 加载状态
  private listLoading = true;
  private total = 0; // 总条数

  // 查询参数
  private listQuery = {
    page: 1,
    limit: 10,
    accountname: undefined
  };
  created() {
    this.getList();
  }
  // 获取列表
  private async getList() {
    this.listLoading = true;
    const { data } = await getPlayers(this.listQuery);
    this.list = data.players;
    this.total = data.total;
    this.listLoading = false;
  }
}
</script>
