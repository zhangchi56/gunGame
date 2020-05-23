<template>
  <div id="deposit">
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkToProfile">返回</div>
      <div slot="center">充值页面</div>
    </nav-bar>
    <div class="deposit-container">
      <div>充值</div>
      <div class="inputValue">
        <span>￥</span>
        <input type="text" v-model="inputValue" />
      </div>
      <van-button type="danger" @click="confirmDeposit">确定</van-button>
    </div>
    <!-- 确认模态框 -->
    <!-- <van-dialog v-model="show" title="标题" show-cancel-button>
  <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog>-->
  </div>
</template>

<script type="text/javascript">
import NavBar from "common/navbar/NavBar";
export default {
  data() {
    return {
      inputValue: ""
      // show: true,
    };
  },
  components: {
    NavBar
  },
  created() {},
  methods: {
    //返回上一级
    linkToProfile() {
      this.$router.go(-1);
    },
    //确定充值
    confirmDeposit() {
      console.log(this.inputValue);
      // this.$dialog.alert({
      //   message: "弹窗内容"
      // });
      this.$dialog.confirm({
        title: "确认充值"+this.inputValue+"元？",
        message: ""
      })
        .then(() => {
          // on confirm
          this.$toast.success('成功充值'+this.inputValue+'元！');
          this.inputValue = ''
        })
        .catch(() => {
          // on cancel
          this.$toast.fail('取消充值！');
        });
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
.deposit-container {
  padding: 10px;
}
.deposit-container .inputValue {
  margin: 10px 0;
}
.deposit-container .inputValue span {
  margin-right: 10px;
}
.deposit-container .inputValue input {
  width: 100px;
}
.deposit-container button {
  padding: 10px 0;
  /* width: 50px; */
  width: 100%;
}
</style>
