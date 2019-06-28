<template>
    <div class="ranking">
        <div>
          <p class="xingbie">男生</p>
          <div class="ranking-left">
            <LeftNav :leftlist="leftNav.maleRank" @qiehuan="rightlists"></LeftNav>
          </div>
          <p class="xingbie">女生</p>
          <div class="ranking-left">
            <LeftNav :leftlist="leftNav.femaleRank" @qiehuan="rightlists"></LeftNav>
          </div>
        </div>
     
      <div class="ranking-right">
        <div class="title">{{rightnav.righttitle}}</div>
        <div class="classification">
          <div class="sort-title">更多筛选</div>
          <div class="sort-cells">
            <div class="cells-lis" @click="setLargeType(item.type,index)"
             :class="indexs==index?'rightlis':''"
              v-for="(item, index) in largeTypes" :key="index" >
              {{item.name}}</div>
          </div>
        </div>
        <div class="list-box">
          <div class="book-lists" v-for="(item, index) in looklists" :key="index">
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
import LeftNav from '../components/LeftNav'
import CategoryBooklist from "../components/CategoryBooklist";
  export default {
    name: "",
    props: {
      
    },
    data() {
        return {
      leftNav: {
        femaleRank:null,
        maleRank:null
      },
      rightnav:{
        righttitle: "",
        // weekid:'',
        // monthid:'',
        // totalid:'',
      },
      largeTypes: [
        {
            name: '周榜',
            type: 'week'
        },
        {
            name: '月榜',
            type: 'month'
        },
        {
            name: '总榜',
            type: 'total'
        },
      ],
      looklist:null,
      looklists:null,
      indexs:0,
      fenye:20,
      seniority:[
        {weekid:'',},
        {monthid:'',},
        {totalid:'',},
      ],
      linkid:null,
      notice:''
        }
    },
    created() {
      this.leftNavs()
    },
    computed:{
      
    },
    methods: {
      setLargeType(type, index){
        //点击后重置滚动距离
            // this.looklist = [];
            // this.$refs.hua.scrollTop = 0;
            // this.jiazai=this.looklist.length
           this.indexs = index;
           if (type=='week') {
               this.linkid=this.seniority.weekid
               console.log(this.linkid,'1');
           }
           if (type=='month') {
               this.linkid=this.seniority.monthid
               console.log(this.linkid,'2');
           }
           if (type=='total') {
               this.linkid=this.seniority.totalid
               console.log(this.linkid,'3');
           }
          //  this.switch()
      },
      rightlists(q){
        this.rightnav.righttitle = q.righttitle;
        // this.seniority.weekid=q._id,//周榜
        // this.seniority.monthid=q.monthRank,//月榜
        // this.seniority.totalid=q.totalRank,//总榜
        // console.log( q,'q,w');
      },
      leftNavs(){
        const url = `/api/ranking/gender`;
          // this.rightnav.righttitle = q.righttitle;
          // this.rightnav.like = q.like;
        this.axios.get(url).then((res) => {
          if (res.data.ok) {
            
            this.leftNav.femaleRank = res.data.female.slice(0, 7);
            this.leftNav.maleRank = res.data.male.slice(0, 7)
            this.rightnav.righttitle =res.data.male[0].title
            this.seniority.weekid=res.data.male[0]._id,//周榜
            this.seniority.monthid=res.data.male[0].monthRank,//月榜
            this.seniority.totalid=res.data.male[0].totalRank,//总榜
            this.rankists()
          }
        },err => {alert(err);});
      },
      rankists(){
        const src=`/api/ranking/${this.seniority.weekid}`
        this.axios.get(src).then(Response=>{
          if (Response.data.ok) {
                this.looklist = Response.data.ranking.books;
                this.looklists = Response.data.ranking.books.slice(this.fenye-20, this.fenye);
          }
        })
      },
      next(){
        this.fenye+=20
        if (this.fenye > 120) {
        this.fenye = 100;
        return;
      }
        this.looklists =   this.looklist.slice(this.fenye-20, this.fenye);
      }
    },
    components:{
      LeftNav,CategoryBooklist
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .ranking{
    width: 1200px;
    margin: 0 auto;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    .xingbie{
      width: 100%;
      line-height: 60px;
      color: #666;
      font-size: 18px;
      font-weight: 700;
    }
    .ranking-left {
      width: 240px;
      border-top: 5px solid #cab389;
    }
    .ranking-right {
      width: 880px;
      padding: 0 15px;
      .title {
        height: 60px;
        line-height: 60px;
        color: #cab389;
        font-size: 22px;
        font-weight: 700;
      }
      .sort-title{
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
</style>