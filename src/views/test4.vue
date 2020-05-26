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

      this.$http
        .get("/member/fetchMobileMember")
        .then(res => {
          console.log(res);
        });

      // this.$http.post('http://120.25.234.158:9001/mobile/login',{
      //     "phone":"15573940178",
      //     "password":"666666"
      // },{headers:{ 'content-type': 'multipart/form-data' }}).then(res => {
      //     console.log(res)
      // })
    }
  }
};

</script>

<style>
</style>