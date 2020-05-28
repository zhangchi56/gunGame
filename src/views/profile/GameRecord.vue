<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkToBack">
        <img style="width:0.5rem;heigth:0.5rem" src="~@/assets/img/profile/返回.png" alt />
      </div>
      <div slot="center">游戏记录</div>
    </nav-bar>
    <template>
      <el-table :data="gameRecordList" :stripe="true" style="width: 100%">
        <el-table-column prop="username" align="center" label="用户名" width="120"></el-table-column>
        <el-table-column prop="roomNo" align="center" label="房间号" width></el-table-column>
        <el-table-column prop="amount" align="center" label="消费金额" width>
          <template slot-scope="scope">
            <div style="color:red">{{scope.row.gameType==1?'-':'+'}}{{scope.row.amount}}积分</div>
          </template>
        </el-table-column>
        <el-table-column prop="gameRound" align="center" label="游戏轮数" width></el-table-column>
      </el-table>
    </template>
    <div style="text-align:center;margin-top:20px">
      <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="prev, pager, next"
      :total="400">
      </el-pagination>-->
    </div>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
export default {
  data() {
    return {
      gameRecordList: []
    };
  },
  components: {
    NavBar
  },
  created() {
    this.getGameRecordList();
  },
  methods: {
    //获取游戏记录数据列表
    getGameRecordList() {
      let params = {
        mtoken: JSON.parse(sessionStorage.getItem("token")),
        userid: JSON.parse(sessionStorage.getItem("userId")),
        page: 0
      };

      this.$http
        .get(`/gameHistory/getGameHistoryByUserid`, { params })
        .then(res => {
          console.log(res);
          console.log(res.data.data);
          this.gameRecordList = res.data.data;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //返回上一级
    linkToBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>