<template>
  <div id="detail">
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkBack">返回</div>
      <div slot="center">房间一（人数{{wsMessage.online}}/6）</div>
      <div slot="right" @click="linkToProfile">我的</div>
    </nav-bar>

    <section class="message-container">
      <!-- <marquee behavior="slide" loop="2" direction="right" scrollamount="10">滚动内容</marquee> -->
      <div id="box" class="box"></div>
      <!-- <input type="text" id="txt" /> -->
      <!-- <button @click="send">提交内容</button> -->
    </section>

    <section id="detail-container">
      <div class="top">
        <div>
          <div style="width:80px;height:80px;background:#808080"><img :src="seat_top[0]?seat_top[0].img:defaultImg" alt /></div>
          <div class="userInfo">{{seat_top[0].name}}</div>
          <div class="userInfo"><span v-show="seat_top[0].status">已准备</span></div>
        </div>
        <div>
          <div style="width:80px;height:80px;background:#808080"><img :src="seat_top[1]?seat_top[1].img:defaultImg" alt /></div>
          <div class="userInfo">{{seat_top[1].name}}</div>
          <div v-show="seat_top[1].status" class="userInfo">已准备</div>
        </div>
        <div>
          <div style="width:80px;height:80px;background:#808080"><img :src="seat_top[2]?seat_top[2].img:defaultImg" alt /></div>
          <div class="userInfo">{{seat_top[2]?seat_top.name:''}}</div>
          <div v-show="seat_top[2]?seat_top.status:''" class="userInfo">已准备</div>
        </div>
      </div>
      <div class="center">
        <img v-show="!isShowGif" src="@/assets/img/detail/gun.png" alt />
        <img
          v-show="isShowGif"
          src="http://a.hiphotos.baidu.com/exp/w=500/sign=f5dea38f0af41bd5da53e8f461db81a0/0b55b319ebc4b745cb69f3b2cbfc1e178b821590.jpg"
          alt
        />
      </div>
      <div class="status">
        <button @click="ready" class="ready" :disabled="isReady">{{isReady?"已准备":"准备"}}</button>
        <button @click="start" class="start" v-show="isReady">开始</button>
      </div>
      <div class="bottom">
        <div>
          <img :src="seat_bottom[0]?seat_bottom[0].img:defaultImg" alt />
        </div>
        <div>
          <img :src="seat_bottom[1]?seat_bottom[1].img:defaultImg" alt />
        </div>
        <div>
          <img :src="seat_bottom[2]?seat_bottom[2].img:defaultImg" alt />
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
      isReady: false,
      // wss: "",
      iid: "",
      score: 10,
      timer: null,
      seat_top: [
        { name:'aaa',img: "/img/1.97e94f49.png",status:true},
        { name:'bbb',img: "/img/1.97e94f49.png",status:false},
        // { name:'ccc',img: "/img/1.97e94f49.png",status:false},
        // { img: "/img/1.97e94f49.png" }
      ],
      seat_bottom: [
        // { img: "/img/1.97e94f49.png" }
        ],
      defaultImg: "/img/房间.768b2835.png",
      isShowGif: false,
      userQuery: this.$route.query,
      wsMessage: {
        // online: 2
      }
    };
  },
  created() {
    
    // 消息通知弹幕
    console.log(this.userQuery);
    this.timer = setInterval(this.move, 10);
    // console.log(document.body.clientWidth);
  },
  mounted() {
    // 创建ws连接
    this.initWebSocket();
    // console.log(this.wsMessage);
    // setTimeout(() => {
      // this.send();
    // }, 1000);
  },
  updated() {},
  destroyed() {
    clearInterval(this.timer);
    this.ws.close();
    this.ws.onclose = function() {
      // 关闭 websocket
      console.log("连接已关闭...");
    };
  },
  watch: {
    // wsMessage(val) {}
  },
  methods: {
    // 给服务端发送消息
    sendText() {
      let _this = this;
      let params = {
        cmd: "LOGIN",
        nickName: JSON.parse(this.userQuery.name),
        content: JSON.parse(this.userQuery.name) + "加入游戏",
        time: 1590113988545,
        room: this.userQuery.room
      };
      _this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
    },

    // 进入页面创建websocket连接
    initWebSocket() {
      let _this = this;
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        let url = "ws://120.25.234.158:3000//im";
        let ws = new WebSocket(url);

        _this.ws = ws;
        this.wss = ws;
        ws.onopen = function(e) {
          console.log("服务器连接成功: " + url);
          // 向服务器发送某某人加入的消息
          _this.sendText();
        };
        ws.onclose = function(e) {
          console.log("服务器连接关闭: " + url);
        };
        ws.onerror = function() {
          console.log("服务器连接出错: " + url);
        };
        ws.onmessage = function(e) {
          //接收服务器返回的数据
          console.log(e);
          _this.wsMessage = JSON.parse(e.data);
          console.log(_this.wsMessage)
          _this.send()
        };
      }
    },
    //准备按钮
    ready() {
      let params = {
        cmd: "LOGIN",
        nickName: this.userQuery.name,
        content: this.userQuery.name + "已经准备",
        time: 1590113988545,
        room: this.userQuery.room
      };
      this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
      this.isReady = true;
      // this.send();
    },
    //开始按钮
    start() {
      if (this.score < 10) {
        this.$toast("积分不够，请立即充值！");
        this.$router.push({ path: "/deposit" });
      } else {
        //开始抽奖
        this.score = this.score - 10;
        this.$toast("抽奖成功，扣除10积分");
        this.isShowGif = true;
        setTimeout(() => {
          this.isShowGif = false;
          console.log(this);
        }, 3000);
      }
    },
    // 跳转到个人中心
    linkToProfile() {
      this.$router.push({ path: "/profile" });
    },
    // 返回上一级
    linkBack() {
      this.$router.go(-1);
    },
    // 消息通知开始
    $(str) {
      return document.getElementById(str);
    },
    send() {
      if (this.$("box").hasChildNodes()) {
        console.log(this.$("box").hasChildNodes());
        var f = document.getElementById("box");
        var childs = f.childNodes;
        for (var i = 0; i < childs.length; i++) {
          // alert(childs[i].nodeName);
          f.removeChild(childs[i]);
        }
      }

      // console.log(this.wsMessage.content);
      var word = this.wsMessage.content;
      var span = document.createElement("span");
      span.style.position = "absolute";
      span.style.left = document.body.clientWidth + "px";
      // span.style["font-size"] = '12rem'
      span.speed = 1;
      span.innerHTML = word;
      this.$("box").appendChild(span);
      // this.$("txt").value = "111";
    },
    move() {
      if (!this.$("box")) return;
      if (!this.$("box").children) return;

      var spanArray = this.$("box").children;
      for (var i = 0; i < spanArray.length; i++) {
        spanArray[i].style.left =
          parseInt(spanArray[i].style.left) - spanArray[i].speed + "px";
      }
    },
    // 分割数组
    // fun2(arr) {
    //   let arr = {

    //   }
    //         var seat_top = [];
    //         var seat_bottom = [];
    //         for (var i = 0; i < arr.length / 2; i++) {
    //             seat_top[i] = arr[i];
    //             seat_bottom[i] = arr[i + arr.length / 2];
    //         }
    //         console.log(seat_top); //[1,2,3]
    //         console.log(seat_bottom); //[4,5,6]
    //     }
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
  /* background-color: plum; */
}
#detail-container .top .userInfo{
  text-align: center;
  font-size: 0.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #fff;
}
#detail-container .top div {
  width: 80px;
  /* height: 80px; */
  /* background: gray; */
}
#detail-container .top div img {
  height: 80px;
  width: 100%;
}
#detail-container .center {
  margin-top: 40px;
  display: flex;
  width: 100%;
  height: 200px;
  /* background-color: red; */
}
#detail-container .center img {
  height: 100%;
  width: 100%;
}
#detail-container .bottom {
  display: flex;
  justify-content: space-between;
  /* background-color: plum; */
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
#detail-container .status {
  margin: 10px 0;
}

#detail-container .status button {
  font-size: 0.42rem;
  padding: 2px 10px;
  background-color: #fa800a;
  border: none;
  color: #fff;
}
#detail-container .status .ready {
  margin-right: 0.5rem;
}
</style>
