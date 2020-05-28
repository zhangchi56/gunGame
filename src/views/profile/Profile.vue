<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkToProfile">
        <img style="width:0.5rem;heigth:0.5rem" src="~@/assets/img/profile/返回.png" alt />
      </div>
      <div slot="center">个人中心</div>
    </nav-bar>
    <!--1.单独封装一个组件: 利用slot知识点-->
    <!-- <UserInfo></UserInfo> -->
    <section class="userInfo">
      <div class="userInfoCard">
        <div class="userInfoContainer">
          <div class="img">
            <img src="~@/assets/img/detail/1.png" alt />
          </div>
          <div class="userInfoDesc">
            <div class="userName">{{userInfo.userName?userInfo.userName:locationUserInfo.userName}}</div>
            <div class="userType">普通用户</div>
          </div>
        </div>
        <div class="userPackage">
          <!-- <div class="userPackageItem">
            <div class="desc">45</div>
            <div class="num">收藏</div>
          </div> -->
          <!-- <div class="userPackageItem">
            <div class="desc">55</div>
            <div class="num">优惠价</div>
          </div> -->
          <div class="userPackageItem">
            <div class="desc">{{userInfo.integral?userInfo.integral:locationUserInfo.integral}}</div>
            <div class="num">积分</div>
          </div>
        </div>
      </div>
    </section>

    <section class="list">
      <!-- <div class="listItem">
        <div class="img">
          <img src="~@/assets/img/profile/积分.png" alt />
        </div>
        <div>{{userInfo.integral?userInfo.integral:locationUserInfo.integral}}积分</div>
      </div> -->
      <div class="listItem">
        <div class="img">
          <img src="~@/assets/img/profile/订单.png" alt />
        </div>
        <div>
          <router-link to="/payRecord">充值订单</router-link>
        </div>
          <div class="el-icon-arrow-right" style="margin-left:auto"></div>
      </div>
      <div class="listItem">
        <div class="img">
          <img src="~@/assets/img/profile/记录.png" alt />
        </div>
        <div>
          <router-link to="/GameRecord">游戏记录</router-link>
        </div>
          <div class="el-icon-arrow-right" style="margin-left:auto"></div>

      </div>
      <div class="listItem">
        <div class="img">
          <img src="~@/assets/img/profile/退出.png" alt />
        </div>
        <div @click="loginOut">退出</div>
        <div class="el-icon-arrow-right" style="margin-left:auto"></div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import { mapState } from "vuex";

export default {
  name: "Profile",
  components: {
    NavBar
  },
  data: function() {
    return {
      user: "",
      locationUserInfo: {}
    };
  },
  filters: {},
  computed: {
    ...mapState({
      userInfo: state => state.user.user
    })
  },
  created() {
    this.locationUserInfo = {
      userName: JSON.parse(sessionStorage.getItem("userName")),
      userId: "",
      integral: sessionStorage.getItem("integral")
    };
  },
  methods: {
    linkToProfile() {
      // this.$router.go("/home");
      this.$router.push("/index");
    },
    loginOut() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
      this.$toast.success("已退出登陆！");
    }
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
  margin-top: 0px;
  /* background-color: red; */
}
.list .listItem {
  color:#BABABA;
  padding: 0.4rem;
  height: 1.5rem;
  line-height: 1.5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  font-size: 14px;
}
.list .listItem a{
  color: #BABABA;
  font-size: 14px;
}
.list .listItem .img {
  margin-right: 0.4rem;
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
  padding: 0.2rem 0.4rem;
  /* background-color: #e72426; */
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
  flex-direction: column;
  font-size: 0.4rem;
  color: #fff;
}
.userInfoCard {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FF8EB9;
  /* height: 4.5rem; */
  height:100%;
  width: 100%;
  border-radius: 10px;
}
.userInfoContainer {
  display: flex;
  align-items: center;
  /* margin: 12px; */
}
.userInfoContainer .img {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}
.userInfoContainer .img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.userInfoContainer .userInfoDesc {
  margin-left: 0.4rem;
}

.userInfoContainer .userType {
  font-size: 12px;
  margin-top: 4px;
}

.userInfoCard .userPackage{
  /* display: flex; */
  /* justify-content: space-between; */
  /* margin: 30px 40px 0; */
}
.userInfoCard .userPackage .userPackageItem{
  margin-right: 20px;
  text-align: center;
}
.userInfoCard .userPackage .userPackageItem .num {
  margin-top: 4px;
}
/* .userInfo .img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

/* 个人中心 */
</style>
