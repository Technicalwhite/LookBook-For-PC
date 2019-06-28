<template>
    <div class="download">
        <div class="tu">
            <div class="swiper-container" id="xiazai">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <img class="auto-img" src="../assets/image/download180828_1.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img class="auto-img" src="../assets/image/download180828_2.png" alt="">
                    </div>
                    <div class="swiper-slide">
                        <img class="auto-img" src="../assets/image/download180828_3.png" alt="">
                    </div>
                <!-- <div class="swiper-slide" v-for="(item, index) in booklunswiper" :key="index">
                    <img class="auto-img" :src="item.img" :alt="item.title">
                </div> -->
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination left"></div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Swiper from "swiper";
  export default {
    name: "",
    props: {
      
    },
    data() {
        return {
      
        }
    },
    created() {
      
    },
    mounted() {
        this.pictures()
    },
    computed:{
      
    },
    methods: {
        pictures() {
            var swiper = new Swiper("#xiazai", {
                loop: true,
                autoplay:true,
                observer: true,
                pagination: {
                    el: '.swiper-pagination',
                },
            });
            
        },
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .download{
        width: 1200px;
        height: 590px;
        margin: 0 auto;
        padding: 15px 0;
        .tu{
            display: flex;
            width: 100%;
            height: 100%;
            .swiper-container {
                width: 100%;
                height: 100%;
                // background: #233;
                .swiper-slide {
                    text-align: center;
                    font-size: 18px;
                    background: #fff;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    -webkit-justify-content: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    -webkit-align-items: center;
                    align-items: center;
                }
            }
        }
    }
</style>