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
          <img v-if="!item.image_src" src="~@/assets/img/home/枪.png" alt />
          <img v-else :src="item.image_src" alt />
          <div class="des">{{index+1}}号房间5/6</div>
        </div>
      </div>
    </div>
    <div class="room">
      <div class="roomItem" v-for="(item, index) in room" :key="index">
        <!-- {{item.image_src}} -->
        <div @click="joinRoom(item)">
          <img v-if="!item.image_src" src="~@/assets/img/home/枪.png" alt />
          <img v-else :src="item.image_src" alt />
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
    <div class="loadMore" v-show="isLoadMoreing">
      <van-loading color="#1989fa" size="32px">加载中...</van-loading>
    </div>
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
    HomeSwiper,
    FeatureView,
    RecommendView
  },
  data() {
    return {
      banners: [],
      room: [],
      recommends: [],
      page: 0,
      init: 1,
      isLoadMoreing: false
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
    //下拉加载更多
    window.addEventListener("scroll", () => {
      this.showLoadMore();
    });
    //监听滚动事件
    // window.addEventListener("srocll", this.handleScroll);
  },
  updated() {
    // console.log(document.body.offsetHeight);
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
      this.isLoadMoreing = true;
      // this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   loadingType: "spinner"
      // });
      this.$http
        .get(
          `http://120.25.234.158:9001/websocket/getRoomList?page=${this.page}`
        )
        .then(res => {
          // console.log(res);
          // console.log(this.init);
          if (res.data.length <= 0) {
            this.$toast.fail("已经到底了");
          } else if (this.init > 1) {
            this.$toast.success("加载成功");
          }
          this.room = this.room.concat(res.data);
          this.init++;
          this.isLoadMoreing = false;
          // this.$toast.clear()
        });
    },
    //加入房间
    joinRoom(item) {
      console.log(window.sessionStorage.getItem("token"));
      console.log(item);
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
    //加载更多
    loadMore() {},
    //获得滚动条高度
    getScrollTop() {
      var scroll_top = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
      } else if (document.body) {
        scroll_top = document.body.scrollTop;
      }
      return scroll_top;
    },
    //显示加载更多
    showLoadMore() {
      if (
        window.innerHeight + this.getScrollTop() ==
        document.body.offsetHeight
      ) {
        this.page++;
        this.getRoom();
      }
    }
  }
};
</script>

<style scoped>
#home {
  /* height: 100vh; */
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
.loadMore {
  position: fixed;
  bottom: 0.1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.3rem;
  /* background-color: #fa800a; */
  padding: 0.15rem 0.4rem;
  color: #fff;
}
</style>
