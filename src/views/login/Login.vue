<template>
  <div id="login">
    <img style="width:100%" src="@/assets/img/login.png" alt />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card mt-2">
            <div class="card-header bg-white">
              <h3 class="login-header text-center mb-0 text-secondary">
                <div @click="clickLogin" class="text" :class="[isLogin?'selection':'unchecked']">登陆</div>
                <div
                  @click="clickRegister"
                  class="text"
                  :class="[!isLogin?'selection':'unchecked']"
                >注册</div>
              </h3>
            </div>
            <div class="card-body" v-if="isLogin">
              <el-form ref="ruleForm" :rules="rules" :model="form">
                <el-form-item prop="username" v-show="false">
                  <el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="username" v-show="false">
                  <el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="username">
                  <el-input v-model="form.username" size="medium" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="form.password"
                    size="medium"
                    type="password"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="medium"
                    class="w-100 loginBtn"
                    @click="submit"
                    :loading="loading"
                  >{{loading? '登录中...' : '立即登录'}}</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="card-body" v-else>
              <el-form ref="ruleForm2" :rules="rules" :model="formMess">
                <el-form-item prop="phone">
                  <el-input v-model="formMess.phone" size="medium" type="text" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                  <el-input
                    v-model="formMess.pass"
                    size="medium"
                    type="password"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <el-input
                    v-model="formMess.checkPass"
                    size="medium"
                    type="password"
                    placeholder="请再次输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="code" class="positionBtns">
                  <el-input v-model="formMess.code" size="medium" type="text" placeholder="请填写验证码"></el-input>
                  <button
                    type="button"
                    :disabled="disabled"
                    @click="sendcode"
                    class="btns"
                  >{{btntxt}}</button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="medium"
                    class="w-100 loginBtn"
                    @click="submitRegister"
                    :loading="loading"
                  >{{loading? '注册中...' : '立即注册'}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { mapGetters } from "vuex";
import { getHomeMultidata, getHomeData, RECOMMEND, BANNER } from "network/home";
export default {
  data() {
    return {
      isLogin: true,
      loading: false,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      },
      disabled: false,
      time: 0,
      btntxt: "获取验证码",
      formMess: {
        phone: "",
        pass: "",
        checkPass: "",
        code: ""
      }
    };
  },
  methods: {
    //登陆
    submit() {
      this.$refs.ruleForm.validate(async e => {
        if (!e) return;
        // 提交表单
        this.loading = true;
        //将json格式转换
        // const loginParams = new URLSearchParams();
        // loginParams.append("phone", this.form.username);
        // loginParams.append("password", this.form.password);
        let loginParams = {
          phone: this.form.username,
          password: this.form.password
        };
        console.log(loginParams)
        const res = await this.$http.post(
          "http://120.25.234.158:9001/mobile/login",
          qs.stringify(loginParams)
        );

        // console.log(Integral.data.data.amount)
        console.log(res);
        if (res.status == 200) {
          this.$toast.success("登陆成功");
          this.$router.push({ path: "/index" });
          this.loading = false;
          //储存user和token
          this.$store.commit("login", {
            userName: this.form.username,
            token: res.data.data.mtoken,
            userId: res.data.data.userid
          });
        } else if (res.data.code == -1) {
          this.$toast.fail(res.data.message);
        }
        const Integral = await this.$http.get(
          `/wallet/memberWallet?mtoken=${this.$store.state.user.token}`
        );
        let IntegralNul = Integral.data.data.amount;
        this.$store.commit("saveIntegral", IntegralNul);
      });
    },
    //登陆注册页面切换
    clickLogin() {
      this.isLogin = true;
      this.$refs["ruleForm2"].resetFields();
    },
    clickRegister() {
      this.isLogin = false;
      this.$refs["ruleForm"].resetFields();
    },

    // 注册
    submitRegister() {
      this.$refs.ruleForm2.validate(e => {
        if (!e) return;
        if (this.formMess.pass != this.formMess.checkPass) {
          this.$toast.fail("两次密码不一致");
          return;
        }
        //将json格式转换
        const loginParams = new URLSearchParams();
        loginParams.append("phone", this.formMess.phone);
        loginParams.append("code", this.formMess.pass);
        loginParams.append("password", this.formMess.checkPass);
        loginParams.append("confirmPassword", this.formMess.code);
        this.$http.post("/mobile/register", loginParams).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast.success(res.data.message);
          } else if (res.data.code == -1) {
            this.$toast.fail(res.data.message);
          }
        });
      });
    },
    //获取手机验证码
    sendcode() {
      console.log("发送验证码");
      // var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.formMess.phone == "") {
        this.$toast.fail("请输入手机号");
      } else if (!reg.test(this.formMess.phone)) {
        this.$toast.fail("手机号格式不正确");
      } else {
        this.time = 3;
        this.disabled = true;
        this.$http
          .get(`/mobile/verify_code?phone=${this.formMess.phone}`)
          .then(res => {
            this.disabled = false;
            console.log(res);
            if (res.status == 200) {
              if (res.data.code == 0) {
                console.log("真香");
                this.timer();
                this.$toast.success(res.data.message);
              } else if (res.data.code == -1) {
                this.$toast.fail(res.data.message);
              }
            }
          });
      }
    },
    timer() {
      console.log(this.time);
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    }
  }
};
</script>

<style scoped>
#login {
  height: 100%;
  /* background: linear-gradient(to right, #E72426, #f97576); */
}
.login-header {
  display: flex;
  justify-content: center;
}
.login-header .text {
  font-size: 16px;
  width: 130px;
  height: 30px;
  line-height: 30px;
  border-radius: 25px;
  /* background-color: pink; */
}
/* .login {
  background: linear-gradient(to right, #e72426, #f97576);
} */
.selection {
  background: linear-gradient(to right, #e72426, #f97576);
  color: #ffffff;
}
.unchecked {
  color: #999999;
}
.loginBtn {
  background: linear-gradient(to right, #e72426, #f97576);
  color: #fff;
}
/* 样式穿透部分 */
#login >>> .card-header {
  border: none;
}
#login >>> .card {
  border: none;
}
#login >>> .positionBtns {
  position: relative;
}
#login >>> .btns {
  position: absolute;
  top: 0;
  right: 10px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  /* opacity:0; */
}
#login >>> .card {
  border: none;
}
#login >>> .card-body {
  padding: 0.5rem;
}
/* 样式穿透部分 */
</style>