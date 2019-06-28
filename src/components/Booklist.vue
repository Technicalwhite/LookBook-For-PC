<template>
    <div class="book-list" @click="gotubook(list.title,list._id)">
        <div class="bookimg">
           <img class="auto-img" :src="booklogo+list.cover" alt="">
        </div>
        <div class="list-right">
          <p class="book-name">
            <span class="name">{{list.title}}</span>
            <span class="status" :class="list.allowMonthly?'ing':'ed'">
            {{list.allowMonthly?'连载':'完结'}}</span>
          </p>
          <p class="book-brief">{{list.shortIntro}}</p>
          <p class="book-popularity">{{list.author}}</p>
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
        this.$router.push({
           path: '/Bookdetails/'+name+'/'+id,
         })
        
      }
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .book-list{
        width: 100%;
        height: 100%;
        display: flex;
        .bookimg{
            width: 22.6%;
            // height: 120px;
            height: 100%;
            margin-right: 15px;
            background: #a04cf7;
            box-shadow: 2px 4px 6px #bbb;
        }
        .list-right{
          width: 77.4%;
          .name{
            font-size: 16px;
            margin-right: 10px;
          }
          .status{
            font-size: 12px;
            padding: 0 5px;
            line-height: 12px;
            text-align: center;
            width: 30px;
          }
          p{
          // width: 100%;
          font-size: 12px;
          line-height: 20px;
          display: -webkit-box;
          display: -moz-box;
          // white-space: pre-wrap;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .book-brief{
          margin: 6px 0;
        }
        .book-popularity{
          margin-top: 20px;
        }
        }
        
    }
    .ing{
      background: #e4393c;
      
    }
    .ed{
      background: #09dd68;
    
    }
</style>