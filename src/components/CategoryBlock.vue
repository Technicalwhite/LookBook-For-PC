<template>
    <div class="category-block">
        <div class="title">
        <i class="title-i icon iconfont" :class="categoryList[0].lei"></i>
        <span>{{categoryList[0].title}}</span>
        <span class="duo">更多<span class="icon iconfont icon-jiantou"></span></span>
        </div>
        <ul class="categoryList">
        <li @click="gotuCategory(categoryList[0].gender,item.name)" v-show="index!=0" v-for="(item, index) in categoryList" :key="index">
            <div>{{item.name}}</div>
            <div>{{item.bookCount}}</div>
        </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
  export default {
    name: "CategoryBlock",
    props: {
      categoryList:null,
    },
    data() {
        return {
      
        }
    },
    created() {
      
      
    },
    computed:{
      
    },
    methods: {
      gotuCategory(gender,name){
        console.log(gender,'<<<<<gender',name);
         this.$router.push({
           path: '/category'
          //  query:{gender:gender}
         })
      }
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .category-block{
          margin-bottom: 16px;
          padding: 0 15px;
          background: #fff;
          .title{
            height: 50px;
            font-size: 18px;  
            line-height: 50px;
            font-weight: 700;
            border-bottom: 1px solid #eee;
            cursor:pointer;
            .title-i{
              font-size: 20px;
              margin-right: 10px;
              color: #e4393c;
            }
            span:nth-child(1){
              font-size: 18px;
              font-weight: 200;
              color: #999;
            }
            .duo{
              float: right;
              font-size: 12px;
              font-weight: 200;
              color: #999;
              
            }
          }
          .categoryList{
            width: 100%;
            padding: 12px 0;
            display: flex;
            justify-content: space-around;
            flex-wrap :wrap ;
            li{
              width: 33%;
              line-height: 20px;
              text-align: center;
              padding: 2px 0;
                color: #999;
                cursor:pointer;
              div:nth-child(1){
                font-size: 13px;
              }
              div:nth-child(2){
                font-size: 12px;
              }
              // p:hover{
              //   color: #D82626;
              // }
            }
            li:hover{
              color: #D82626;
            }
          }
          
          .categoryList:after{
            content:' ';
            flex:auto;
          }

    }
</style>