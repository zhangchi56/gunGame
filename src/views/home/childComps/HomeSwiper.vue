


<template>
  <!-- <div>123</div> -->
  <div id="mySwiper">
    <swiper class="mySwiper" ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="(item, index) in banners" :key="index">
      <a :href="item.cover_img">
        <img :src="baseUrl+item.cover_img" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
// import {Swiper, SwiperItem} from 'common/swiper'
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      baseUrl:'http://m.wentuguoji.cn',
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
        // Some Swiper option/callback...
      }
    };
  },
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  created() {
    // console.log(this.banners);
  },
  mounted() {
    // console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },

  
};
</script>

<style scoped>
#mySwiper>>>.mySwiper{
  height: 195px;
  width: 100%;
}
#mySwiper>>>.mySwiper img{
  width: 100%;
  height: 100%;
}
</style>