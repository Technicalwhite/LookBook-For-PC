<template>
  <div class="book">
    <div class="container content">
      <div class="content-left">
        <div class="category">
           <!-- <div class="title">
        <i class="title-i icon iconfont icon-xingbie-nan"></i>
        <span>{{categoryList[0].title}}</span>
        <span class="duo">更多<span class="icon iconfont {{}}"></span></span>
        </div> -->
          <CategoryBlock :categoryList="item" v-for="(item, index) in categorybook" :key="index"></CategoryBlock>
        </div>
        <div class="ranking">
          <!-- ranking-block -->
          <div class="ranking-block">
            <div class="title">
              <i class="title-i icon iconfont icon-ziyuanldpi3"></i>
              <span>今日点击</span>
              <span class="duo">更多<span class="icon iconfont icon-jiantou"></span></span>
            </div>
            <div class="rank-nav">
              <div>
                <span @click="clicknan()" :style="{color:clickranknan?'red':''}">男生榜</span>
                <span class="fen">|</span>
                <span @click="clicknv()" :style="{color:clickranknv?'red':''}">女生榜</span>
              </div>
            </div>
            <div class="rank-list">
              <ul v-show="clickranknan">
                <li @click="todeta(item.title,item._id)" v-for="(item, index) in male" :key="index">
                  <div
                    class="num"
                    :style="{background:(index+1==1?'#e4393c':''||
                    index+1==2?'#a04cf7':''||index+1==3?'#FFBA60':''),color:(index<3?'#fff':'')}"
                  >{{index+1}}</div>
                  <div class="bookimg">
                    <img class="auto-img" :src="booklogo+item.cover" :alt="item.title">
                  </div>
                  <div class="text-block">
                    <div class="name">{{item.title}}</div>
                    <div class="latelyFollower">{{item.latelyFollower}}</div>
                  </div>
                </li>
              </ul>
              <ul v-show="clickranknv">
                <li @click="todeta(item.title,item._id)" v-for="(item, index) in female" :key="index">
                  <div
                    class="num"
                    :style="{background:(index+1==1?'#e4393c':''||
                    index+1==2?'#a04cf7':''||index+1==3?'#FFBA60':''),color:(index<3?'#fff':'')}"
                  >{{index+1}}</div>
                  <div class="bookimg">
                    <img class="auto-img" :src="booklogo+item.cover" :alt="item.title">
                  </div>
                  <div class="text-block">
                    <div class="name">{{item.title}}</div>
                    <div class="latelyFollower">{{item.latelyFollower}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="pictures-nav">
          <div class="swiper-container" id="wwwo">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in booklunswiper" :key="index">
                <img class="auto-img" :src="item.img" :alt="item.title">
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div class="bigsou">
          <Bigsou></Bigsou>
        </div>
        <div class="recommend">
          <div class="title title-recommend">男频热推</div>
          <div class="recommend-book">
            <div class="book-lists" v-for="(item, index) in featured.malelike" :key="index" @click="kan()">
              <Booklist :list="item"></Booklist>
            </div>
          </div>
        </div>
        <div class="pictures">
          <div class="title title-pictures">漫画精选</div>
          <div class="recommend-cartoon">
            <div class="cartoon-lists" v-for="(item, index) in featured.anime" :key="index" @click="kan()">
              <Pictuerbox :list="item"></Pictuerbox>
            </div>
          </div>
        </div>
        <div class="choiceness">
          <div class="boy">
            <div class="title title-choiceness">男生精选系类</div>
            <div class="book-lists" v-for="(item, index) in featured.boychoice" :key="index" @click="kan()">
              <Booklist :list="item"></Booklist>
            </div>
            <!-- ???? -->
          </div>
          <div class="girl">
            <div class="title title-choiceness">女生精选系类</div>
            <div class="book-lists" v-for="(item, index) in featured.girlchoice" :key="index" @click="kan()">
              <Booklist :list="item"></Booklist>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="picturenav">
        <div v-for="(item, index) in booklunswiper" :key="index">
          <img class="auto-img" :src="item.img" :alt="item.title">
        </div>
      </div>
    </div>
    <div class="container">
      <div class="books-boxs">
        <div class="books-box">
          <div class="title"><h4>男频新书</h4></div>
          <div class="box">
            <div class="box-lists" v-for="(item, index) in newbook.newboy" :key="index">
              <Pictuerbox :list="item"></Pictuerbox>
            </div>
          </div>
        </div>
         <div class="books-box">
          <div class="title"><h4>女频新书</h4></div>
          <div class="box">
            <div class="box-lists" v-for="(item, index) in newbook.newgirl" :key="index">
              <Pictuerbox :list="item"></Pictuerbox>
            </div>
          </div>
        </div>
         <div class="books-box">
          <div class="title"><h4>男频完书</h4></div>
          <div class="box">
            <div class="box-lists" v-for="(item, index) in overbook.overboy" :key="index">
              <Pictuerbox :list="item"></Pictuerbox>
            </div>
          </div>
        </div>
         <div class="books-box">
          <div class="title"><h4>女频完书</h4></div>
          <div class="box">
            <div class="box-lists" v-for="(item, index) in overbook.overgirl" :key="index">
              <Pictuerbox :list="item"></Pictuerbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Swiper from "swiper";
import CategoryBlock from "../components/CategoryBlock";
import Booklist from "../components/Booklist";
import Pictuerbox from "../components/Pictuerbox";
import Bigsou from '../components/Bigsou'
export default {
  name: "",
  props: {},
  data() {
    return {
      ooo: 4,
      rank: false,
      categorybook: {
        malelist: [{ title: "男",gender:'male',lei:'icon-xingbie-nan'}],
        femalelist: [{ title: "女",gender:'female',lei:'icon-xingbie-nv'}],
        presslist: [{ title: "出版",gender:'press',lei:'icon-shu'}]
      },
      booklunswiper: null,
      male: null,//最热榜男
      female: null,//最热榜女
      featured:{//精选
         malelike:null,
         anime:null,
         boychoice:null,
         girlchoice:null,
      },
      newbook:{
        newboy:null,//新书男
        newgirl:null,//新书女
      },
     overbook:{
       overboy:null,//完书男
       overgirl:null,//完书女
      },
      icon: "",
      booklogo: "http://statics.zhuishushenqi.com",
      clickranknan:true,
      clickranknv:false,
    };
  },
  created() {
    this.lunswiper();
    this.getCategory();
    this.gorank();
    this.jingxuan()
    this.newboys()
    this.newgirls()
    this.overboys()
    this.overgirls()
  },
  mounted() {
  },
  computed: {},
  methods: {
    
   
    clicknan(){
      this.clickranknan=true
      this.clickranknv=false
      console.log(this.clickranknan,'this.clickrank');
      
    },
    clicknv(){
      this.clickranknan=false
      this.clickranknv=true
      console.log(this.clickranknv,'this.clickrank');
    },
    todeta(name,id){
console.log(name,id,'view-e');
      this.$router.push({
        path: '/Bookdetails/'+name+'/'+id,
      })
    },
    kan(){
    },
    pictures() {
      var swiper = new Swiper("#wwwo", {
        loop: true,
        autoplay:true,
        observer: true,
        pagination: {
            el: '.swiper-pagination',
        },
      });
     
    },
    //轮播图
    lunswiper() {
      this.axios.get("/picture/spread").then(
        response => {
          this.booklunswiper = response.data.data;
          this.$nextTick(()=>{
            this.pictures();
          })
        },err => {alert(err);});
    },
    //分类类型
    getCategory() {
      const url = "/api/cats/lv2/statistics";
      this.axios.get(url).then(
        response => {
          this.categorybook.malelist.push(...response.data.male.slice(0, 9));
          this.categorybook.femalelist.push(
            ...response.data.female.slice(0, 9)
          );
          this.categorybook.presslist.push(...response.data.press.slice(0, 9));
        },err => {alert(err);});
    },
    //分类类型end
    //左侧小排行
    gorank() {
      let boy = "";
      let girl = "";
      const linkk = "/api/ranking/gender";
      this.axios.get(linkk).then(
        response => {
          if (response.data.male !== "" || response.data.male !== undefined) {
            boy = response.data.male[0]._id;
            this.nanrank(boy);
          }
          if (
            response.data.female !== "" ||
            response.data.female !== undefined
          ) {
            girl = response.data.female[0]._id;
            this.nvrank(girl);
          }
        },
        err => {
          alert(err);
        }
      );
    },
    // 左侧最热榜
    nanrank(boy) {
      const src = `/api/ranking/${boy}`;
      this.axios.get(src).then(
        response => {
          this.male = response.data.ranking.books.slice(0, 10);
          console.log(this.male,'this.male');
          
        },
        err => {
          alert(err);
        }
      );
    },
    nvrank(girl) {
      const src = `/api/ranking/${girl}`;
      this.axios.get(src).then(
        response => {
          this.female = response.data.ranking.books.slice(0, 10);
        },
        err => {
          alert(err);
        }
      );
    },
    // 左侧最热榜end
    // 漫画精选
    // 漫画精选end
    // 男女热推精选
    jingxuan(){
      const url=`/api/book/by-categories?gender=male&type=hot&major=仙侠`
      const see=`/api/book/by-categories?gender=picture&type=hot&major=热血`
      const src=`/api/book/by-categories?gender=male&type=hot&major=都市`
      const link=`/api/book/by-categories?gender=female&type=hot&major=现代言情`
      this.axios.get(url).then(
        response => {//男频热推
          this.featured.malelike=response.data.books.slice(1, 5)
      },err=>{alert(err);})
        this.axios.get(see).then(
        response => {//漫画精选
          this.featured.anime=response.data.books.slice(0, 6)
      },err=>{alert(err);})
       this.axios.get(src).then(
        response => {//男频精选
          this.featured.boychoice=response.data.books.slice(1, 3)
      },err=>{alert(err);})
       this.axios.get(link).then(
        response => {//女频精选
          this.featured.girlchoice=response.data.books.slice(1, 3)
      },err=>{alert(err);})
    },
    // 男女热推精选end
    // 男女新书完本
    newboys(){
      const url=`/api/book/by-categories?gender=male&type=new&major=%E7%8E%84%E5%B9%BB`
        this.axios.get(url).then(
        response => {
          this.newbook.newboy=response.data.books.slice(1, 5)
        },err=>{alert(err);})
    },
    newgirls(){
      const url=`/api/book/by-categories?gender=female&type=new&major=%E5%8F%A4%E4%BB%A3%E8%A8%80%E6%83%85`
      this.axios.get(url).then(
        response => {
          this.newbook.newgirl=response.data.books.slice(1, 5)
      },err=>{alert(err);})
    },
    overboys(){
      const url=`/api/book/by-categories?gender=male&type=over&major=%E7%8E%84%E5%B9%BB`
      this.axios.get(url).then(
        response => {
          this.overbook.overboy=response.data.books.slice(1, 5)
      },err=>{alert(err);})
    },
    overgirls(){
      const url=`/api/book/by-categories?gender=female&type=over&major=%E7%8E%84%E5%B9%BB%E5%A5%87%E5%B9%BB`
      this.axios.get(url).then(
        response => {
          this.overbook.overgirl=response.data.books.slice(1, 5)
      },err=>{alert(err);})
    },
    // 男女新书完本end
    // navnum(index) {book/by-categories?gender=male&type=over&major=玄幻
    //   this.icon = index;
    // }
  },
  components: {
    CategoryBlock,
    Booklist,
    Pictuerbox,
    Bigsou
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.book {
  width: 1200px;
  margin: 0 auto;
  padding: 15px 0;
  .content {
    display: flex;
    margin-bottom: 15px;
    .content-left {
      width: 250px;
      .ranking-block {
        padding: 0 15px;
            background: #fff;
        .title{
            height: 50px;
            font-size: 18px;  
            line-height: 50px;
            font-weight: 700;
            border-bottom: 1px solid #eee;
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
        .rank-nav{
          div{
            width: 55%;
            margin: 2px auto;
            line-height: 30px;
            font-size: 16px;
                cursor:pointer;
          }
        }
        .rank-list {
          width: 100%;
          padding: 15px 0;
          li {
            line-height: 20px;
            margin-bottom: 13px;
            display: flex;
                cursor:pointer;
            position: relative;
            .num {
              width: 16px;
              height: 16px;
              line-height: 16px;
              font-size: 12px;
              margin-right: 12px;
              text-align: center;
              // background: #e4393c;
            }
            .bookimg {
              display: none;
            }
            .text-block {
              flex: 1;
              // background: #e4393c;
              .name {
                font-size: 14px;
                color: #666;
                display: -webkit-box;
                display: -moz-box;
                // white-space: pre-wrap;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }
              .latelyFollower {
                font-size: 12px;
                color: #999;
              }
            }
          }
          //
          li:nth-child(1) {
            .num {
              position: absolute;
              top: 0;
              left: 0;
            }
            .bookimg {
              width: 70px;
              height: 85px;
              margin-right: 10px;
              display: block;
            }
          }
        }
      }
    }
    .content-right {
      width: 940px;
      margin-left: 10px;
      position: relative;
      .pictures-nav {
        width: 720px;
        height: 240px;
        box-sizing: border-box;
        .swiper-container {
          width: 100%;
          height: 100%;
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
            cursor:pointer;
          }
        }
      }
      .bigsou{
        position: absolute;
        top: 0;
        right: 0;
        width: 180px;
        height: 240px;
        font-size: 16px;
        background: #fff;
      }
      .recommend {
        margin-top: 20px;
        background: #fff;
        border-top: 5px solid #cab389;
        .title-recommend {
          width: 130px;
          font-size: 18px;
          font-weight: 700;
          line-height: 55px;
          text-align: center;
          border-bottom: 5px solid #cab389;
        }
        .recommend-book {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .book-lists {
            padding: 15px 25px;
            width: 50%;
            height: 150px;
            box-sizing: border-box;
                cursor:pointer;
          }
        }
      }
      .pictures{
        margin-top: 20px;
        background: #fff;
        border-top: 5px solid #cab389;
        .title-pictures{
           width: 130px;
           font-size: 18px;
          font-weight: 700;
          line-height: 55px;
          text-align: center;
          border-bottom: 5px solid #cab389;
        }
        .recommend-cartoon {
          display: flex;
          .cartoon-lists {
            margin: 0 10px;
            padding: 20px 15px;
            width: 90px;
                cursor:pointer;
          }
        }
      }
      .choiceness {
        position: absolute;
        width: 100%;
        bottom: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .title-choiceness {
          font-size: 18px;
          font-weight: 700;
          line-height: 55px;
        }
        .boy {
          width: 49%;
            background: #fff;
        }
        .girl {
          width: 49%;
            background: #fff;
        }
        .book-lists {
          padding: 15px 25px;
          // width: calc(100% - (25px * 2));
          width: 100%;
          box-sizing: border-box;
          height: 150px;
                cursor:pointer;
        }
      }
    }
  }
  .picturenav {
    // width: 100%;
    height: 130px;
    margin: 10px 0;
    display: flex;
    div {
      height: 100%;
    }
  }
  .books-boxs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .books-box {
      width: 49.5%;
      margin-top: 10px;
      .box {
        display: flex;
        .box-lists {
          margin: 0 10px;
          padding: 20px 15px;
          width: 90px;
                cursor:pointer;
        }
      }
    }
  }
  .fen{
        margin: 0 8px;
    }
}
</style>