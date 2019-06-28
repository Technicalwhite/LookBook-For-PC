<template>
    <div class="cartoon-list" @click="gotubook(list.title,list._id)">
        <div class="cartoonimg">
            <img class="auto-img" :src="booklogo+list.cover" alt="">
        </div>
        <div class="cartoonbottom">
            <p class>{{list.title}}</p>
            <p class>{{list.author}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
  export default {
    name: "",
    props: {
      list:null,
    },
    data() {
        return {
      booklogo: "http://statics.zhuishushenqi.com"
        }
    },
    created() {
      
    },
    computed:{
      
    },
    methods: {
        gotubook(name,id){
            console.log(name,id,'name,id');
            
        this.$router.push({
           path: '/Bookdetails/'+name+'/'+id,
         })
        
      },
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .cartoon-list {
        // width: 100%;
        // height: 333px;
        // background: #000;
            p {
              line-height: 40px;
            }
            .cartoonimg {
                width: 100%;
              height: 120px;
              background: #a04cf7;
            }
            .cartoonbottom {
              overflow: hidden;
              p:nth-child(1) {
                color: #333;
                font-size: 14px;
                display: -webkit-box;
                display: -moz-box;
                // white-space: pre-wrap;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }
              p:nth-child(2) {
                color: #999;
                font-size: 13px;
                display: -webkit-box;
                display: -moz-box;
                // white-space: pre-wrap;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }
            }
          }
</style>