<template>
  <div class></div>
</template>

<script type="text/javascript">
const LENGTH = 3;

export default {
  created() {
    this.checkStatus(this.activeId);
  },
  data() {
    return {
      arr1: [
        {
          id: 1,
          status: false
        },
        {
          id: 2,
          status: false
        },
        {
          id: 3,
          status: false
        }
      ],
      arr2: [
        {
          id: 1,
          status: false
        },
        {
          id: 2,
          status: false
        },
        {
          id: 3,
          status: false
        }
      ],
      activeId: 2,
      activeIndex: 1,
      initIndex: 2
    };
  },
  methods: {
    checkActiev() {
      //判断是否所有成员已对自己开枪
      let status1 = false;
      let status2 = false;
      this.arr1.forEach(item => {
        if (item.status) {
          status1 = true;
        }
      });
      this.arr2.forEach(item => {
        if (item.status) {
          status2 = true;
        }
      });

      reture(status1 && status2) ? true : false;
    },
    checkStatus(id) {
      //对对应用户开枪
      let type = 0; //发送请求，默认是0没有中枪
      let isOnInitIndex = false;
      if (type === 0) {
        //没有中枪
        if (this.checkActiev()) {
          console.log("全部开完抢了，下一轮");
          return;
        }
        let nextIndex = this.activeIndex + 1;
        if(initIndex <=2 && isOnInitIndex == true){
          this.activeId = this.arr1[initIndex].id
          this.arr1[initIndex].status = true;
          this.initIndex++
        }
        if (nextIndex <= 2 && isOnInitIndex == false) {
          this.activeId = this.arr1[nextIndex].id;
          this.arr1[nextIndex].status = true;
          this.checkStatus(this.activeId);
        } else {
          // this.nextIndex -= 3;
          // this.nextIndex -= 3;
          if(this.nextIndex = 6 && !this.checkActiev()){
            this.nextIndex = 0
            this.isOnInitIndex = true
              checkStatus(id)
              return
          }
          this.activeId = this.arr2[nextIndex].id;
          this.arr2[nextIndex].status = true;
          this.checkStatus(this.activeId);
        }
      } else {
        //中枪了，计算积分结果，结束游戏
        console.log("游戏结束，计算结果");
      }
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
