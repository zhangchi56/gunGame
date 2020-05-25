<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">左轮手枪游戏</div>
      <div slot="right" @click="linkToProfile">
        <img style="width:0.5rem;heigth:0.5rem" src="~@/assets/img/profile/我的.png" alt />
      </div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <div class="room">
      <div class="roomItem" v-for="(item, index) in room" :key="index">
        <!-- {{item.image_src}} -->
        <div @click="joinRoom(item)">
          <img :src="item.image_src" alt />
          <div class="des">{{index+1}}号房间5/6</div>
        </div>
      </div>
    </div>
    <!-- </div>
    </scroll>-->
    <!-- <back-top @backTop="backTop" class="back-top" v-show="showBackTop"> -->
      <!-- <img src="~assets/img/common/top.png" alt /> -->
    <!-- </back-top> -->
    <!-- 点击加载更多 -->
    <div class="loadMore">加载更多</div>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
// import Scroll from 'common/scroll/Scroll'
// import TabControl from 'content/tabControl/TabControl'
// import BackTop from "content/backTop/BackTop";
import HomeSwiper from "views/home/childComps/HomeSwiper";
import FeatureView from "./childComps/FeatureView";
import RecommendView from "./childComps/RecommendView";
// import GoodsList from "./childComps/GoodsList";
import { getHomeMultidata, getHomeData, RECOMMEND, BANNER } from "network/home";
import { NEW, POP, SELL, BACKTOP_DISTANCE } from "@/common/const";

export default {
  name: "Home",
  components: {
    NavBar,
    // Scroll,
    // TabControl,
    // BackTop,
    HomeSwiper,
    FeatureView,
    RecommendView
    // GoodsList
  },
  data() {
    return {
      banners: [],
      room: [],
      recommends: [],
      page:0
      // showBackTop: false
    };
  },
  created() {
    // // 1.请求多个数据
    this.getMultiData();
    //获取房间数
    this.getRoom();
    // 获取banner列表
    // this.getBanner()
    console.log("创建Home");
  },
  mounted() {
    //监听滚动事件

    // window.addEventListener("srocll", this.handleScroll);
  },
  methods: {
    //获取首页banner图
    // getBanner(){
    //   this.$http.get('http://m.wentuguoji.cn/API/mall/mall_index').then(res => {
    //     // console.log(res)
    //   })
    // },
    //获取房间
    getRoom() {
      this.$http
        .get(`http://120.25.234.158:9001/websocket/getRoomList?page=${this.page}`)
        .then(res => {
          console.log(res);
          this.room = res.data;
        });
    },
    //加入房间
    joinRoom(item) {
      console.log(window.sessionStorage.getItem("token"));
      console.log(item)
      if (!window.sessionStorage.getItem("token")) {
        this.$toast.fail("请先登陆");
        this.$router.push({ path: "/login" });
        return;
      }
      this.$router.push({
        path: "/detail",
        query: {
          room: item,
          name: window.sessionStorage.getItem("user")
        }
      });
    },
    linkToProfile() {
      this.$router.push({ path: "/profile" });
    },
    //获取banner
    getMultiData() {
      getHomeMultidata().then(res => {
        this.banners = res.data.slideList;
        // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
        // this.$nextTick(() => {
        //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        // })
      });
    },

    //监听是否滑动到页面底部
    // handleScroll() {
    //   if (document.documentElement.scrollTop == document.body.offsetHeight) {
    //     console.log(123);
    //   }
    // },
    //监听是否滑动到页面底部
    // handleScroll() {
    //   var scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   var windowHeitht =
    //     document.documentElement.clientHeight || document.body.clientHeight;
    //   var scrollHeight =
    //     document.documentElement.scrollHeight || document.body.scrollHeight;
    //   //是否滚动到底部的判断
    //   if (scrollTop + windowHeitht >= scrollHeight - 50) {
    //     // this.getSpecialData();
    //     console.log('滑到底部')
    //   }
    // }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}

.room {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.roomItem {
  position: relative;
  width: 48%;
  /* height: 2rem; */
  margin-bottom: 0.3rem;
  border: 1px black solid;
  /* height: 82px; */
}
.roomItem img {
  width: 100%;
  /* height: 100%; */
  height: 2.14rem;
}
.roomItem .des {
  text-align: center;
  width: 100%;
  font-size: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
.loadMore{
  position: absolute;
  bottom: 0.1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.3rem;
  background-color: #FA800a;
  padding: 0.15rem 0.4rem;
  color: #fff;
}
</style>
