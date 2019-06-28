<template>
  <div class="category">
    <div class="category-left">
      <div
        class="left-text"
        @click="lei(item.xinbie,item.like,index)"
        v-for="(item, index) in leftNav"
        :key="index"
        :class="index==indx?'actbg':''"
      >
        <div class="txt" :class="index==indx?'act':''">{{item.xinbie}}</div>
      </div>
    </div>
    <div class="category-right">
      <div class="title">{{rightnav.righttitle}}</div>
      <div class="classification">
        <div class="sort-title">作品类型</div>
        <div class="sort-cells">
          <div class="cells-lis" :class="rilis.s==index?'rightlis':''"
            v-for="(item, index) in leixing"
            :key="index"
            @click="sorts(item.major,rightnav.like,item.mins,index)"
          >{{item.major}}</div>
        </div>
        <div class="sort-cells" v-show="sortitem!=null&&sortitem!=''">
          <span class="cells-lis">具体类型:</span>
          <div
            class="cells-lis" :class="rilis.x==index?'rightlis':''"
            v-for="(item, index) in sortitem"
            :key="index"
            v-if="index!==0"
            @click="litter(rightnav.like,sortitem[0],item,index)"
          >{{item}}</div>
        </div>
      </div>
      <div class="list-box">
        <div class="book-lists" v-for="(item, index) in booklists" :key="index">
          <CategoryBooklist :CategoryBooklist="item"></CategoryBooklist>
        </div>
      </div>
      <div>
        <button @click="next">换一批</button>
        <button></button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import CategoryBooklist from "../components/CategoryBooklist";
export default {
  name: "",
  props: {},
  data() {
    return {
      // activeDate:1,
      shuju: null,
      tuijian: [
        { title: "发现音乐", icon: "icon-yinyue" },
        { title: "私人FM", icon: "icon-tubiaozhizuomobanyihuifu-" },
        { title: "视频", icon: "icon-zhibofuwu" },
        { title: "朋友", icon: "icon-wode" },
        { title: "本地音乐", icon: "icon-yinyue" },
        { title: "下载管理", icon: "icon-xiazai" },
        { title: "我的音乐云盘", icon: "icon-tubiaozhizuomobanyihuifu-1" },
        { title: "我的电台", icon: "icon-yinle" },
        { title: "我的收藏", icon: "icon-wodeguanzhu" }
      ],  
      leftNav: [
        { xinbie: "男生", like: "male" },
        { xinbie: "女生", like: "female" },
        { xinbie: "出版物", like: "press" }
      ],
      rightnav:{
        righttitle: "男生",like: "male"
      },
      indx: 0,
      rilis:{
        s:0,
        x:1
      },
      book: null,
      leixing: null, //类型
      sortitem: ["全部"], //类型
      booklists: null,
      oldnum: 0,
      newnum: 20
    };
  },
  created() {
    this.getkaishi();
    this.getbook();
  },
  watch: {
    $route(to, from) {
      // console.log(to, "233333");
    }
  },
  computed: {},
  methods: {
    dian(index, title) {
      this.activeDate = new Date().getTime();
      console.log(this.$refs.chartView, "组件index?", title);
      this.shuju = title;
      this.$router.push({
        path: `/music/${title}`
        //  query: {id: title}
      });
    },
    next() {
      this.oldnum += 20;
      this.newnum += 20;
      if (this.newnum > 80) {
        this.newnum = 70;
        return;
      }
      this.booklists = this.book.slice(this.oldnum, this.newnum);
    },
    lei(xin, item, index) {
      //左侧导航
      this.rightnav.righttitle = xin;
      this.rightnav.like = item;
      this.indx = index;
      // console.log( this.rightnav.like,'左侧导航item');
      const url = "/api/cats/lv2";
      this.axios.get(url).then(
        response => {
          if (item == "male") {
            this.leixing = response.data.male;
            let q=['全部']
            q.push(...response.data.male[0].mins)           
            this.sortitem=q;
            this.sortitem.unshift(this.leixing[0].major);
            const src = `/api/book/by-categories?gender=${item}&type=hot&major=${this.leixing[0].major}&minor=`;
            this.axios.get(src).then(
            response => {
              this.book = response.data.books;
              this.booklists = this.book.slice(this.oldnum, this.newnum);
            },err => {alert(err);});
          } else if (item == "female") {
            this.leixing = response.data.female;
            let q=['全部']
            q.push(...response.data.female[0].mins)
            this.sortitem=q;
            this.sortitem.unshift(response.data.female[0].major);
             const src = `/api/book/by-categories?gender=${item}&type=hot&major=${this.leixing[0].major}&minor=`;
            this.axios.get(src).then(
            response => {
              this.book = response.data.books;
              this.booklists = this.book.slice(this.oldnum, this.newnum);
            },err => {alert(err);});
          } else if (item == "press") {
            this.leixing = response.data.press;
            this.sortitem = null;
             const src = `/api/book/by-categories?gender=${item}&type=hot&major=${this.leixing[0].major}&minor=`;
            this.axios.get(src).then(
            response => {
              this.book = response.data.books;
              this.booklists = this.book.slice(this.oldnum, this.newnum);
            },err => {alert(err);});
          } else {
            this.leixing = this.sortitem = null;
          }
        },
        err => {
          alert(err);
        }
      );
    },
    sorts(name,like,item,index) {
      // this.sortitem = item;
      let q=['全部']
      q.push(...item)
      this.sortitem=q;
      this.sortitem.unshift(name);
      this.rilis.s=index
      this.rilis.x=1
      const src = `/api/book/by-categories?gender=${like}&type=hot&major=${name}&minor=`;
      this.axios.get(src).then(
        response => {
          this.book = response.data.books;
          this.booklists = this.book.slice(this.oldnum, this.newnum);
        },err => {alert(err);});
    },
    litter(itemone,major,item,index) {
       this.rilis.x=index
        const src = `/api/book/by-categories?gender=${itemone}&type=hot&major=${major}&minor=${item}`;
        this.axios.get(src).then(
        response => {
          this.book = response.data.books;
          this.booklists = this.book.slice(this.oldnum, this.newnum);
        },err => {alert(err);});
    },
    getkaishi() {
      const url = "/api/cats/lv2";
      let q=['全部']
      this.axios.get(url).then(
        response => {
          this.leixing = response.data.male;
          q.push(...response.data.male[0].mins);
          this.sortitem=q
          this.sortitem.unshift(response.data.male[0].major);
        },
        err => {
          alert(err);
        }
      );
    },
    getbook() {
      const src = `/api/book/by-categories?gender=male&type=hot&major=玄幻&minor=`;
      this.axios.get(src).then(
        response => {
          this.book = response.data.books;
          this.booklists = this.book.slice(this.oldnum, this.newnum);
        },err => {alert(err);});
    }
  },
  components: {CategoryBooklist }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.category {
  width: 1200px;
  margin: 0 auto;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  .category-left {
    width: 240px;
    border-top: 5px solid #cab389;
    .left-text {
      color: #999;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      .txt {
        width: 50%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        box-sizing: border-box;
      }
    }
  }
  .category-right {
    width: 880px;
    padding: 0 15px;
    .title {
      height: 60px;
      line-height: 60px;
      color: #cab389;
      font-size: 22px;
      font-weight: 700;
    }
    .classification {
      //分类
      width: 100%;
      overflow: hidden;
      .sort-title {
        width: 100%;
        height: 20px;
        line-height: 20px;
        padding: 0 15px;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 700;
        border-left: 5px solid #cab389;
      }
      .sort-cells {
        display: flex;
        .cells-lis {
          line-height: 30px;
          padding: 0 10px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .sort-juti {
      }
    }
    .list-box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .book-lists {
        padding: 15px 25px;
        width: 50%;
        height: 150px;
        box-sizing: border-box;
      }
    }
  }
}
.rightlis{
  color: #fff;
  border-radius: 2px;
  background: #d82626
}
.act {
  border-bottom: 5px solid #cab389;
}
.actbg {
  background: #f4f1ec;
}
</style>