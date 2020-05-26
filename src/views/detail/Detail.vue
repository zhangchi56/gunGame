<template>
  <div id="detail">
    <nav-bar class="nav-bar">
      <div slot="left" @click="linkBack">
        <img style="width:0.5rem;heigth:0.5rem" src="~@/assets/img/profile/返回.png" alt />
      </div>
      <div slot="center">房间一（人数{{wsMessage.online}}/6）</div>
      <div slot="right" @click="linkToProfile">
        <img style="width:0.5rem;heigth:0.5rem" src="~@/assets/img/profile/我的.png" alt />
      </div>
    </nav-bar>

    <section class="message-container">
      <!-- <marquee behavior="slide" loop="2" direction="right" scrollamount="10">滚动内容</marquee> -->
      <div id="box" class="box"></div>
      <!-- <input type="text" id="txt" /> -->
      <!-- <button @click="send">提交内容</button> -->
    </section>

    <section id="detail-container">
      <div class="top">
        <div v-for="(item, index) in seat_top" :key="index">
          <div class="roomImg">
            <img v-if="item.name" src="~assets/img/detail/1.png" alt />
            <!-- <img src="~assets/img/detail/1.png" alt /> -->
          </div>
          <div class="userInfo">{{item.name}}</div>
          <div class="userInfo">{{item.name?'等待准备':''}}</div>
        </div>
      </div>
      <div class="center">
        <img v-show="!isShowGif" src="@/assets/img/detail/gun.png" alt />
        <img
          v-show="isShowGif"
          src="@/assets/img/detail/9.gif"
          alt
        />
      </div>
      <div class="status">
        <button @click="ready" class="ready" :disabled="isReady">{{isReady?"已准备":"准备"}}</button>
        <button @click="start" class="start" v-show="isReady">开始</button>
      </div>
      <div class="bottom">
        <div v-for="(item, index) in seat_bottom" :key="index">
          <div class="roomImg">
            <img v-if="item.name" src="~assets/img/detail/1.png" alt />
            <!-- <img src="~assets/img/detail/1.png" alt /> -->
          </div>
          <div class="userInfo">{{item.name}}</div>
          <div class="userInfo">{{item.name?'已准备':''}}</div>
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
      iid: "",
      score: 10,
      timer: null,
      seat_top: [],
      seat_bottom: [],
      isShowGif: false,
      userQuery: this.$route.query,
      wsMessage: {}
    };
  },
  created() {
    // 消息通知弹幕
    // console.log(this.userQuery);
    this.timer = setInterval(this.move, 10);
  },
  mounted() {
    // 创建ws连接
    this.initWebSocket();
  },
  updated() {},
  destroyed() {
    clearInterval(this.timer);
    // 关闭连接
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
      let params = {
        // cmd: "LOGIN",
        // // userId: JSON.parse(sessionStorage.getItem('userId')),
        // nickName: JSON.parse(sessionStorage.getItem("userId")),
        // content: JSON.parse(this.userQuery.name) + "加入游戏",
        // time: 1590113988545,
        // room: this.userQuery.room
      };
      // console.log(params);
      // alert('111')
      this.ws.send(`${sessionStorage.getItem('userId')}加入游戏`); //调用WebSocket send()发送信息的方法
    },
    // 进入页面创建websocket连接
    initWebSocket() {
      let _this = this;
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // let url = "ws://echo.websocket.org";
        // let url = "ws://192.168.11.105:3000//im";
        // let url = "ws://120.25.234.158:3000//im";
        // let url = "ws://192.168.11.105:3000/webSocket?125&1001";
        // let url = `ws://192.168.11.105:3000/webSocket?${JSON.parse(sessionStorage.getItem('userId'))}&${this.userQuery.room}`;
        let url = `ws://120.25.234.158:3000/webSocket?${JSON.parse(sessionStorage.getItem('userId'))}&${this.userQuery.room}`;
        let ws = new WebSocket(url);
        _this.ws = ws;
        ws.onopen = function(e) {
          console.log("服务器连接成功: " + url);
          // 向服务器发送某某人加入的消息
          _this.sendText();
        };
        ws.onclose = function(e) {
          console.log("服务器连接关闭: " + url);
          //更新房间人数
        };
        ws.onerror = function() {
          console.log("服务器连接出错: " + url);
        };
        ws.onmessage = function(e) {
          //接收服务器返回的数据
          console.log(e);
          _this.wsMessage = JSON.parse(e.data);
          // console.log(_this.wsMessage);

          let roomPeopleNumList = _this.wsMessage.roomInfo.slice(0,_this.wsMessage.roomInfo.length-1).split(":")
          _this.splitArr(roomPeopleNumList);
          // console.log(_this.seat_top);
          // console.log(_this.seat_bottom);

          // _this.seat_top = [
          //   {name:'a'},
          //   {name:'b'},
          //   {name:'c'},
          // ]
          // _this.seat_bottom = [
          //   {name:'d'},
          //   {name:'e'},
          //   {name:'f'},
          // ]
          _this.send();
        };
      }
    },
    // //准备按钮
    // ready() {
    //   let params = {
    //     // cmd: "CHAT",
    //     // nickName: this.userQuery.name,
    //     content: this.userQuery.name + "已经准备",
    //     // time: 1590113988545,
    //     // room: this.userQuery.room
    //   };
    //   this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
    //   this.isReady = true;
    //   // this.send();
    // },
    //准备按钮
    ready() {
      this.ws.send(`${sessionStorage.getItem("userId")}已经准备`); //调用WebSocket send()发送信息的方法
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
        //开始抽奖
      //   let params = {
      //   cmd: "CHAT",
      //   nickName: this.userQuery.name,
      //   content: this.userQuery.name + "开始了游戏",
      //   time: 1590113988545,
      //   room: this.userQuery.room
      // };
      this.ws.send(`${sessionStorage.getItem("userId")}开始了游戏`); //调用WebSocket send()发送信息的方法
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
    //发送弹幕
    send() {
      if (this.$("box").hasChildNodes()) {
        // console.log(this.$("box").hasChildNodes());
        var f = document.getElementById("box");
        var childs = f.childNodes;
        for (var i = 0; i < childs.length; i++) {
          // alert(childs[i].nodeName);
          f.removeChild(childs[i]);
        }
      }
      console.log(this.wsMessage)
      var word = this.wsMessage.content;
      var span = document.createElement("span");
      span.style.position = "absolute";
      // let htmlFontSize = document.getElementsByTagName('html')[0].style.fontSize
      // let htmlFontSizeNum = htmlFontSize.substring(0,htmlFontSize.length-2)
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
    splitArr(arr) {
      console.log(arr);
      let top = [];
      let bottom = [];

      for (let i = 0; i < 3; i++) {
        let obj = {
          name: arr[i]
        };
        top.push(obj);
      }
      this.seat_top = top;

      for (let i = 3; i < 6; i++) {
        let obj = {
          name: arr[i]
        };
        bottom.push(obj);
      }
      this.seat_bottom = bottom;
    }
  }
};
</script>

<style scoped>
/* 消息通知开始 */
.box {
  position: relative;
  width: 100%;
  height: 1rem;
  overflow: hidden;
  background: #e72426;
  color: #fff;
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
  /* background-color: pink; */
}
#detail-container .top,
#detail-container .bottom {
  display: flex;
  justify-content: space-between;
}
#detail-container .top .roomImg,
#detail-container .bottom .roomImg {
  width: 2.134rem;
  height: 2.134rem;
  background: url("~assets/img/detail/房间.png") no-repeat;
  background-size: 100% 100%;
}
#detail-container .top .userInfo,
#detail-container .bottom .userInfo {
  text-align: center;
  font-size: 0.3rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #fff;
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
}
#detail-container .top div,
#detail-container .bottom div {
  width: 2.134rem;
  height: 2.134rem;
}
#detail-container .top div img,
#detail-container .bottom div img {
  height: 100%;
  width: 100%;
}
#detail-container .center {
  margin-top: 1.067rem;
  display: flex;
  width: 100%;
  height: 5.334rem;
}
#detail-container .center img {
  height: 100%;
  width: 100%;
}
#detail-container .status {
  margin: 0.267rem 0;
}
#detail-container .status button {
  font-size: 0.42rem;
  padding: 0.053rem 0.267rem;
  background-color: #fa800a;
  border: none;
  color: #fff;
}
#detail-container .status .ready {
  margin-right: 0.5rem;
}
</style>
