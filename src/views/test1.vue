<template>
  <div>1</div>
</template>

<script>
export default {
  data() {
    return {
        url:'ws://echo.websocket.org'
    };
  },
  created() {
    this.appServe();
    this.joinRoom();
  },
  methods: {
    appServe() {
      console.log(123);
      //   var url = "ws://" + window.location.host + "/page_room/";
    //   var url = "ws://echo.websocket.org";
    //   var ws = null;
    },
    //加入聊天室
    joinRoom() {
    //   if (this.ws) {
    //     alert("你已经在聊天室，不能再加入");
    //     return;
    //   }
      // var username = document.getElementById("user").value;
      // ws = new WebSocket(url + username);
      let ws = new WebSocket('ws://echo.websocket.org');

      //与服务端建立连接触发
      ws.onopen = function() {
        console.log("与服务器成功建立连接");
      };
      //服务端推送消息触发
      ws.onmessage = function(ev) {
        talking(ev.data);
      };

      //发生错误触发
      ws.onerror = function() {
        console.log("连接错误");
      };
      //正常关闭触发
      ws.onclose = function() {
        console.log("连接关闭");
      };
    },

    //退出聊天室
    exitRoom() {
      closeWebSocket();
    },

    sendMsg() {
      if (!ws) {
        alert("你已掉线，请重新加入");
        return;
      }
      //消息发送
      ws.send(document.getElementById("sendMsg").value);
      document.getElementById("sendMsg").value = "";
    },

    closeWebSocket() {
      if (ws) {
        ws.close();
        ws = null;
      }
    },

    talking(content) {
      document.getElementById("content").append(content + "\r\n");
    }
  }
};
</script>