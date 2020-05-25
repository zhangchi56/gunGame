<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkToProfile"><img style="width:0.5rem;heigth:0.5rem" src="~@/assets/img/profile/返回.png" alt /></div>
      <div slot="center">个人中心</div>
    </nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <!-- <UserInfo></UserInfo> -->
    <section class="userInfo">
      <div class="img">
        <img src="~@/assets/img/detail/1.png" alt />
      </div>
      <div style="margin-top:0.267rem">用户名：{{user?user:'无'}}</div>
    </section>
    <section class="list">
      <div class="listItem">
        <div class="img">
          <img src="~@/assets/img/profile/积分.png" alt />
        </div>
        <div>积分：200</div>
      </div>
      <div class="listItem">
        <div class="img">
          <img src="~@/assets/img/profile/订单.png" alt />
        </div>
        <div>充值订单</div>
      </div>
      <div class="listItem">
        <div class="img">
          <img src="~@/assets/img/profile/记录.png" alt />
        </div>
        <div>游戏记录</div>
      </div>
      <div class="listItem">
        <div class="img">
          <img src="~@/assets/img/profile/退出.png" alt />
        </div>
        <div @click="loginOut">退出</div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";

export default {
  name: "Profile",
  components: {
    NavBar
  },
  data: function() {
    return {
      user: ""
    };
  },
  filters: {},
  computed: {},
  created() {
    // console.log(window.sessionStorage.getItem("user"));
    this.user = JSON.parse(window.sessionStorage.getItem("user"));
  },
  methods: {
    linkToProfile() {
      // this.$router.go("/home");
      this.$router.push("/index");
    },
    loginOut(){
      window.sessionStorage.removeItem('token')
      this.$router.push("/login")
      this.$toast.success("已退出登陆！")
    },
  }
};
</script>

<style scoped>
#profile {
  height: 100%;
  background-color: #fff;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 0.187rem;
  padding: 0.24rem;
}

.account-item .balance {
  font-size: 0.32rem;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 0.08rem;
}

.order-list,
.service-list {
  margin-top: 0.16rem;
}

.list {
  font-size: 0.4rem;
  /* background-color: red; */
}
.list .listItem {
  padding: 0.4rem;
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: #fff;
  /* margin: 4px; */
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.list .listItem .img {
  margin-right: 0.2rem;
  display: flex;
  align-items: center;
  /* margin-bottom: 0.267rem */
}
.list .listItem img {
  width: 0.5rem;
  height: 0.5rem;
  
}

/* 个人中心 */
.userInfo {
  background-color: #e72426;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
  flex-direction: column;
  font-size: 0.4rem;
  color: #fff;
}
.userInfo .img {
  width: 2rem;
  height: 2rem;
  /* background-color: pink; */
  border-radius: 50%;
}
.userInfo .img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/* 个人中心 */
</style>
