<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkToProfile">我的</div>
      <div slot="center">左轮手枪游戏</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <div class="room">
      <div class="roomItem" v-for="(item, index) in room" :key="index">
        <!-- {{item.image_src}} -->
        <div @click="joinRoom">
          <img :src="item.image_src" alt />
          <div class="des">房间{{index+1}}</div>
        </div>
      </div>
    </div>
    <!-- </div>
    </scroll>-->
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt />
    </back-top>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
// import Scroll from 'common/scroll/Scroll'
// import TabControl from 'content/tabControl/TabControl'
import BackTop from "content/backTop/BackTop";
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
    BackTop,
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
      showBackTop: false
      
    };
  },

  created() {
    //获取房间数
    this.getRoom();
    //获取banner列表
    // this.getBanner()
    console.log("创建Home");
    // 1.请求多个数据
    this.getMultiData();
    
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
        .get("https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata")
        .then(res => {
          // console.log(res);
          this.room = res.data.message;
        });
    },
    //加入房间
    joinRoom(){
      this.$router.push({path:'/detail'})
    },
    linkToProfile() {
      this.$router.push({ path: "/profile" });
    },

    loadMore() {
      this.getHomeProducts(this.currentType);
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    /**
     * 网络请求相关方法
     */
    
    getMultiData() {
      getHomeMultidata().then(res => {
        this.banners = res.data.slideList;
        // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
        // this.$nextTick(() => {
        //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        // })
      });
    }
  }
};
</script>

<style scoped>
#home {
  /*position: relative;*/
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
  margin-bottom: 10px;
  border: 1px black solid;
}
.roomItem img {
  width: 100%;
}
.roomItem .des {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: pink;
}
</style>
