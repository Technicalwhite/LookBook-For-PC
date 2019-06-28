<template>
  <div id="app">
    <header class="header">
      <div class="brand">
        <div class="viewTop">
          <div class="topNav">
            <!-- <div>???</div>
            <ul class="user">
              <li class="">
                  <div class="touxiang">
	    					  <img class="noface auto-img" src="./assets/image/noface.gif">
                  </div>
              </li>
              <li class="">嘤</li>
              <li class="">嘤</li>
              <li class="">嘤</li>
              <li class="">嘤</li>
              <li class="">嘤</li>
              <div class="list">捐他一个亿吧~</div>
            </ul> -->
          </div>
        </div>
        <div class="brand-view">
          <div class="logo">
            书海！
          </div>
          <div class="search">
            <input type="text" @input="inputsou" v-model="keyword" placeholder="输入书名....">
            <div @click="suo" class="icon iconfont icon-sousuo"></div>
            <ul class="zhanshi" v-show="lisnone">
            <li v-for="(item, index) in keywordList" :key="index" @click="tosearch(item)">
              {{item}}
            </li>
          </ul>
          </div>
        </div>
      </div>
      <div class="nav">
        <div class="container">
          <ul>
            <router-link
              v-for="(item, index) in navList"
              :key="index"
              :to="item.to"
              tag="li"
              exact
              @click.native="navnum(index)"
            >
              {{item.name}}
              <!-- <span :class="icon==index?'icon-sanjiaotop':'?'':'''" class="icon iconfont"></span> -->
              <!-- <span v-show="icon==index" class="icon iconfont icon-sanjiaotop"></span> -->
            </router-link>
            <li></li>
          </ul>
        </div>
      </div>
    </header>
    <div class="reading">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    
    </div>
    <footer class="container">
      <div class=" footer">
      <p><h3>本网站立志打造全国最大的盗版书籍网站</h3></p>
        <p><h3>专为青少年服务，让你不花一分钱就能遨游书籍的海洋，感受中华文化</h3></p>
        <p><h3>全靠友商的衬托，不服就告我呀</h3></p>
      </div>
    </footer>
  </div>
</template>
<script type="text/javascript">
import Swiper from "swiper";
import CategoryBlock from "./components/CategoryBlock";
import Booklist from "./components/Booklist";
import Pictuerbox from "./components/Pictuerbox";
export default {
  name: "",
  props: {},
  data() {
    return {
      navList: [
        { name: "首页", to: "/wiews" },
        { name: "精选", to: "/chosen" },
        { name: "分类", to: "/category" },
        { name: "书单", to: "/booksdan" },
        { name: "排行", to: "/ranking" },
        { name: "客户端", to: "/download" }
      ],
      categorybook: {
        malelist: [{ title: "男" }],
        femalelist: [{ title: "女" }],
        presslist: [{ title: "出版" }]
      },
      icon:0,
      keyword:'',
      keywordList:null,
      lisnone:false,
    };
  },
  created() {
  },
  mounted() {
  },
  computed: {},
  methods: {
    inputsou(){
      if (this.keyword==''||this.keyword==undefined) {
          this.lisnone=false
            return
      }else{
         this.lisnone=true
      }
      const shou=`/api/book/auto-complete?query=${this.keyword}`
      this.axios.get(shou).then(response=>{
        this.keywordList=response.data.keywords
      },err => {alert(err)});
    },
    tosearch(item){
      this.$router.push({
          path: '/search/'+item,
      })
      this.keyword=''
      this.lisnone=false
    },
    suo(){
      this.$router.push({
          path: '/search/'+this.keyword,
      })
      this.keyword=''
      this.lisnone=false
    },
    navnum(index) {
      this.icon = index;
    }
  },
  components: {
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

.header {
  width: 100%;
  .brand {
    height: 170px;
    background: #eee;
    background: url('./assets/image/3329c9f0abfb925ae30441f24d924ad3c19775df.png') no-repeat center -10px;
    .viewTop{
      height:42px; 
      // background-color: rgba(255,255,255,0.5);
      // box-shadow: 0 0 20px 2px rgba(255, 255, 255, .15) inset;
      .topNav{
        width: 1100px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        z-index: 30;
        justify-content: space-between;
        .user{
          height:100%;
          display: flex;
          line-height: 42px;
          position: relative;
          .touxiang{
	          margin-top: 3px;
            width: 36px;
            height: 36px;
            img{
            border-radius: 36px;
            }
          }
          .touxiang:hover{
            margin: 30px 8px 0 0;
            transform: scale(2.5,2.5);
            transition: .66s;
          }
          li:nth-child(1):hover{
            background: none;
          }
          li:hover{
            cursor:pointer;
            color: #d82626;
            background: #000;
          }
          li{
            padding: 0 10px;
          }
          .list{
            position: absolute;
            bottom: -120px;
            left: 0;
            width: 200px;
            height: 120px;
            background: #FFF;
            display: none;
          }
          .touxiang:hover .list{
            display: block;
          }
        }
      }
      
    }
    .brand-view{
      position: relative;
      width: 1050px;
      height: 128px;
      margin: 0 auto;
      .logo{
        position: absolute;
        width: 220px;
        height: 100px;
        left: 24px;
        bottom: 0px;
        line-height: 105px;
        font-size: 55px;
        font-weight: 900;
        text-align: center;
        background: linear-gradient(rgb(160,76,247), rgb(0,0,0), rgb(18,199,173));
        -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
        -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
      }
      .search{
        position: absolute;
        bottom: 20px;
        right: 0;
        width: 270px;
        padding: 0px 45px 0px 0px;
        background-color: rgba(0,0,0,.12);
        border-radius: 6px;
        font-size: 12px;
        z-index: 1;
        input{
          width: 100%;
          padding: 0 5px;
          line-height: 32px;
          font-size: 15px;
        background-color: rgba(255,255,255,.8);
          border: 0;
        }
        div{
          position: absolute;
        bottom: 0px;
        right: 0;
        width: 32px;
        line-height: 32px;
        text-align: center;
        background-color: rgba(255,255,255,.8);
        }
      }
      .zhanshi{
        position: absolute;
        bottom: -303px;
        right: 35px;
        width: 280px;
        height: 300px;
        padding: 3px 6px;
        box-sizing: border-box;
        overflow: hidden;
        background: #fff;
        li{
          font-size: 16px;
          line-height: 30px;
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
  }
  .nav {
    height: 60px;
      background: #d82626;
    .container {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      ul {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        color: #f0bdbd;
        li {
          flex: 1;
          height: 100%;
          line-height: 60px;
          font-size: 16px;
          text-align: center;
          position: relative;
          span {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -26px;
            margin: auto;
          }
        }
      }
    }
  }
}

.footer{
  height: 222px;
  text-align: center;
  line-height: 60px;
}
.active {
  color: #fff;
}
.title{
 
          color: #333;
          font-size: 18px;
          font-weight: 700;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>