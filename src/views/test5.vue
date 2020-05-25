<template>
  <div>
    <div>
      <p class="fl">
        <input name="phone" type="number" placeholder="手机号" v-model="phone" />

        <button type="button" :disabled="disabled" @click="sendcode" class="btns">{{btntxt}}</button>
      </p>

      <p class="fl" style="margin-left: 20px;">
        <input type="text" placeholder="验证码" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      disabled: false,

      time: 0,

      btntxt: "获取验证码",

      formMess: {
        email: this.email,

        phone: this.phone
      }
    };
  },

  mounted: function() {},

  methods: {
    //验证手机号码部分

    sendcode() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;

      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;

      if (this.phone == "") {
        alert("请输入手机号码");
      } else if (!reg.test(this.phone)) {
        alert("手机格式不正确");
      } else {
        this.time = 60;

        this.disabled = true;

        this.timer();

      }
    },

    timer() {
      if (this.time > 0) {
        this.time--;

        this.btntxt = this.time + "s后重新获取";

        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;

        this.btntxt = "获取验证码";

        this.disabled = false;
      }
    },
  }
};
</script>

<style>
</style>