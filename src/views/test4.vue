<template>
  <div>123test</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      
      //   const options = {
      //     method: "POST",
      //     headers: { "content-type": "application/x-www-form-urlencoded" },
      //     data: qs.stringify(data),
      //     url:'http://120.25.234.158:9001/mobile/login'
      //   };
      //   this.$http(options).then(res => {
      //       console.log(res)
      //   })

      // const params = new URLSearchParams();
      // params.append("phone", "15573940178");
      // params.append("password", "666666");

      // this.$http.post('http://120.25.234.158:9001/mobile/login',params).then(res => {
      //     console.log(res)
      // })

      const params = new URLSearchParams();
      params.append("email", "admin@ligeit.com");
      params.append("password", "123456");
      

      this.$http.post('/admin/userMutation/adminLogin',params).then(res => {
          console.log(res)
      })


    }
  }
};

</script>

<style>
</style>