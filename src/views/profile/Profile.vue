<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkToProfile">返回</div>
      <div slot="center">个人中心</div>
    </nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <!-- <UserInfo></UserInfo> -->
    <section class="userInfo">
        <div class="img"><img src="~@/assets/img/detail/1.png" alt=""></div>
        <div>用户名：{{user?user:'无'}}</div>
    </section>

    <section class="list">
      <div class="listItem">
        <div class="img"><img src="~@/assets/img/profile/金币.png" alt=""></div>
        <div>积分：200</div>
      </div>
      <div class="listItem">
        <div class="img"><img src="~@/assets/img/profile/金币.png" alt=""></div>
        <div>充值订单</div>
      </div>
      <div class="listItem">
        <div class="img"><img src="~@/assets/img/profile/金币.png" alt=""></div>
        <div>游戏记录</div>
      </div>
      <div class="listItem">
        <div class="img"><img src="~@/assets/img/profile/金币.png" alt=""></div>
        <div>退出</div>
      </div>
    </section>



    <!--3.封装成一个整体-->
    <!-- <list-view :list-data="orderList" class="order-list"></list-view> -->
    <!-- <list-view :list-data="serviceList" class="service-list"></list-view> -->
  </div>
</template>

<script>
// import UserInfo from "./childComps/UserInfo";
// import ListView from "./childComps/ListView";
import NavBar from "common/navbar/NavBar";

export default {
  name: "Profile",
  components: {
    // UserInfo,
    // ListView,
    NavBar
  },
  data: function() {
    return {
      user:''
      // orderList: [
      //   { icon: "#order", iconColor: "#ff8198", info: "金币：200个" },
      //   { icon: "#order", iconColor: "#ff8198", info: "充值订单" },
      //   { icon: "#point", iconColor: "#fc7b53", info: "游戏记录" },
      //   { icon: "#vip", iconColor: "#ffc636", info: "退出" }
      // ],
      // serviceList: [
      //   { icon: "#service", iconColor: "#ff8198", info: "我的购物车" },
      //   { icon: "#download", iconColor: "#ff8198", info: "下载购物APP" }
      // ]
    };
  },
  filters:{

  },
  computed:{

  },
  created(){
    console.log(window.sessionStorage.getItem('user'))
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
  },
  methods: {
    linkToProfile() {
      // this.$router.go("/home");
      this.$router.push('/index')
    }
  }
};
</script>

<style scoped>
  #profile {
    height: 100%;
    background-color: #FFF
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

  .order-list, .service-list {
    margin-top: 0.16rem;
  }

.list{
  font-size: 0.4rem;
  /* background-color: red; */
}
.list .listItem{
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: #fff;
  /* margin: 4px; */
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
}
.list .listItem .img{
  display: flex;
  align-items: center;
}
.list .listItem img{
  width: 0.7rem;
  height: 0.7rem;
  
}

/* 个人中心 */
.userInfo{
  background-color: #e72426;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
  flex-direction: column;
  font-size: 0.4rem;
  color: #fff;

}
.userInfo .img{
  width: 2rem;
  height: 2rem;
  /* background-color: pink; */
  border-radius: 50%;
}
.userInfo .img img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/* 个人中心 */

</style>
