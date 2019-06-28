<template>
    <div class="book-list" @click="gotubook(CategoryBooklist.title,CategoryBooklist._id)">
        <div class="bookimg">
           <img class="auto-img" :src="booklogo+CategoryBooklist.cover" alt="">
        </div>
        <div class="list-right">
          <h4 class="book-name">
            {{CategoryBooklist.title}}
          </h4>
          <p class="book-popularity">
              <span>{{CategoryBooklist.author}}</span>
              <span class="fen">|</span>
              <span>{{CategoryBooklist.majorCate}}</span>
          </p>
          <p class="book-brief">{{CategoryBooklist.shortIntro}}</p>
          <p class="book-di">
              <span class="txt">{{latelyFollower}}</span>万人气
              <span class="fen">|</span>
              <span class="txt">{{CategoryBooklist.retentionRatio}}%</span>读者存留
          </p>
        </div>
    </div>
</template>
<script type="text/javascript">
  export default {
    name: "",
    props: {
      CategoryBooklist:null,
    },
    data() {
        return {
       booklogo: "http://statics.zhuishushenqi.com"
        }
    },
    created() {
     
    },
    computed:{
         latelyFollower () {
            return (this.CategoryBooklist.latelyFollower / 10000).toFixed(2)
        },
    //   text(){
    //     return ( this.CategoryBooklist.latelyFollower / 10000).toFixed(1)
    //   }
    },
    methods: {
      
      gotubook(name,id){
console.log(id);
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
            max-width: 92px;
            // height: 120px;
            height: 100%;
            margin-right: 15px;
            background: #a04cf7;
            box-shadow: 2px 4px 6px #bbb;
        }
        .list-right{
          width: 77.4%;
          max-width: calc(100% - 92px);
          position: relative;
          .book-name{
            height: 22px;
            font-size: 15px;
            line-height: 22px;
            color: #333
          }
          p{
            // width: 100%;
            font-size: 12px;
            color: #999;
            display: -webkit-box;
            display: -moz-box;
            // white-space: pre-wrap;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            }
            .book-popularity{
                height: 28px;
                line-height: 28px;
            }
            .book-brief{
            margin: 6px 0;
            }
             .book-di{
                position: absolute;
                bottom: 0;
                .fen{
                        margin: 0 8px;
                    }
                .txt{
                    color: #e4393c;
                }
             }
        }
        
    }
    // .ing{
    //   background: #e4393c;
      
    // }
    // .ed{
    //   background: #09dd68;
    
    // }
</style>