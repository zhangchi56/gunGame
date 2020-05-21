<template>
  <div>
    <input type="text" placeholder="请输入你的内容" v-model="inputValue" />
    <button @click="send">发送请求</button>
    <div class="content" v-cloak>{{text}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue:'',
      text:''
    };
  },
  created() {
    //调用webscoket
    this.websocket();
  },
  methods: {
    // WebSocketSet(){
    //    if ('WebSocket' in window){
    //      this.ws = new WebSocket(`ws://echo.websocket.org`);
    //        this.ws.onmessage =  (res=>{
    //          let   received_msg= JSON.parse(res.data);
    //              console.log("数据已接收...",received_msg);
    //              this.newsList=received_msg;
    //        })
    //        this.ws.onopen=(res=>{
    //           console.log("socket连接成功")
    //            this.ws.send(this.currentId);
    //        })

    //      //......此处省略ws其他属性操作
    //       }else{
    //         alert('当前浏览器 Not support websocket')
    //       }
    // },

    //创建websocket
    websocket() {
      websocket.onopen = function() {
        // Web Socket 已连接上，使用 send() 方法发送数据
      };

      websocket.onmessage = (evt)=> {
        
        var received_msg = evt.data;
        console.log(evt);
        console.log("数据已接收...");
        this.text = evt.data
        console.log(this.text)
      };

      websocket.onclose = function() {
        // 关闭 websocket
        console.log("连接已关闭...");
      };

      // setTimeout(() => {
      //   websocket.close();
      // }, 3000);
    },
    send() {
      websocket.send(this.inputValue);
      console.log("数据发送中...");
    }
  }
};
</script>

<style>
  .content{
    width: 40px;
    height: 20px;
    background-color: pink;
  }
</style>