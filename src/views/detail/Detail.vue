<template>
  <div id="detail">
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkToProfile">我的</div>
      <div slot="center">房间一</div>
    </nav-bar>

    <section class="message-container">
      <marquee behavior="slide" loop="2" direction="right" scrollamount="10">滚动内容</marquee>
      <div id="box" class="box"></div>
      <!-- <input type="text" id="txt" /> -->
      <!-- <button @click="send">提交内容</button> -->
    </section>

    <section id="detail-container">
      <div class="top">
        <div v-for="(item, index) in 3" :key="index">
          <img src="@/assets/img/detail/1.png" alt />
        </div>
      </div>
      <div class="center">
        <img src="@/assets/img/detail/gun.png" alt />
      </div>
      <div class="start">
        <button @click="ready" style="margin-right:10px">准备</button>
        <button @click="start">开始</button>
      </div>
      <div class="bottom">
        <div v-for="(item, index) in 3" :key="index">
          <img src="@/assets/img/detail/1.png" alt />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";

export default {
  name: "Detail",
  components: {
    NavBar
  },
  data() {
    return {
      iid: "",
      score: 10
    };
  },
  created() {
    // 消息通知弹幕
    setInterval(this.move, 10);
  },
  updated() {},
  methods: {
    //开始按钮
    ready() {
      console.log("准备");
    },
    start() {
      if (this.score < 10) {
        this.$toast("积分不够，请立即充值！");
        this.$router.push({ path: "/deposit" });
      } else {
        //开始抽奖
        this.score = this.score - 10;
        this.$toast("抽奖成功，扣除10积分");
      }
    },
    linkToProfile() {
      this.$router.push({ path: "/profile" });
    },

    // 消息通知开始
    $(str) {
      return document.getElementById(str);
    },
    send() {
      console.log(123);
      var word = this.$("txt").value;
      var span = document.createElement("span");
      span.style.position = "absolute";
      span.style.left = "400px";
      // span.style["font-size"] = '12rem'
      span.speed = 1;
      span.innerHTML = word;
      this.$("box").appendChild(span);
      this.$("txt").value = "";
    },
    move() {
      var spanArray = this.$("box").children;
      for (var i = 0; i < spanArray.length; i++) {
        spanArray[i].style.left =
          parseInt(spanArray[i].style.left) - spanArray[i].speed + "px";
      }
    }
    // 消息通知结束
  }
};
</script>

<style scoped>
/* 消息通知开始 */
.box {
  position: relative;
  width: 100%;
  height: 1rem;
  background: pink;
  overflow: hidden;
}
.box span {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.2rem;
}
/* 消息通知结束 */
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

#detail-container {
  display: flex;
  margin: 0.267rem;
  flex-direction: column;
  background-color: pink;
}
#detail-container .top {
  display: flex;
  justify-content: space-between;
  background-color: plum;
}
#detail-container .top div {
  width: 80px;
  height: 80px;
  background: gray;
}
#detail-container .top div img {
  height: 80px;
  width: 100%;
}
#detail-container .center {
  margin-top: 20px;
  display: flex;
  width: 100%;
  height: 200px;
  background-color: red;
}
#detail-container .center img {
  height: 100%;
  width: 100%;
}
#detail-container .bottom {
  display: flex;
  justify-content: space-between;
  background-color: plum;
}
#detail-container .bottom div {
  width: 80px;
  height: 80px;
  background: gray;
}
#detail-container .bottom div img {
  height: 80px;
  width: 100%;
}
#detail-container .start {
  margin: 10px 0;
}
#detail-container .start button {
  padding: 2px 10px;
  background-color: red;
  border: none;
}

/* .content {
  position: absolute;
  top: 44px;
  bottom: 60px;
} */

/* .back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
} */
</style>
