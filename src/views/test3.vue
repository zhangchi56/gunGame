<template>
  <div class="test3">
    <div id="box" class="box"></div>
    <input type="text" id="txt" />
    <button @click="send">提交内容</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    setInterval(this.move, 10);
  },
  updated() {
    // setInterval(this.move, 10)
  },
  methods: {
    $(str) {
      return document.getElementById(str);
    },
    send() {
      console.log(123);
      var word = this.$("txt").value;
      var span = document.createElement("span");
      span.style.position = "absolute";
      span.style.left = "200px";
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
  }
};
</script>

<style>
/* .test3{
    width: 1rem;
    height: 1rem;
    background-color: red;
} */
.box {
  position: relative;
  width: 200px;
  height: 200px;
  background: pink;
  overflow: hidden;
}
</style>