<template>
    <div class="chosen">
        <div>
            <p class="xingbie">精选所含书类</p>
            <div class="chosen-left">
                <LeftNav :leftlist="pictures" @qiehuan="rightclick"></LeftNav>
            </div>
        </div>
        <div class="chosen-right">
        <div class="title">主编精选</div>
      
        <div class="list-box">
          <div class="book-lists" v-for="(item, index) in looklist" :key="index">
            <CategoryBooklist :CategoryBooklist="item"></CategoryBooklist>
          </div>
        </div>
        <div>
          <!-- <button @click="next">下一个</button>
          <button></button> -->
        </div>
      </div>
    </div>
    <!-- <div>
        <div class="ovo">QAQ</div>
        <div class="one">
            <img class="auto-img" src="../assets/image/3983.gif" alt="">
        </div>
        <div class="one">
            <img class="auto-img" src="../assets/image/9159.gif" alt="">
        </div>
         <div class="one">
            <img class="auto-img" src="../assets/image/6465.gif" alt="">
        </div>
        <div class="one">
            <img class="auto-img" src="../assets/image/qwe.gif" alt="">
        </div>
    </div> -->
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
      pictures:null,
      righttitle:null,
      banid:null,
      looklist:null,
    //     {title:"热销榜"},
    //     {title: "畅销榜"},
    //     {title: "新书榜"},
    //     {title: "完结榜"},
    //     {title: "免费榜"},
    //   ]
        }
    },
    created() {
      this.leftNavs()
    },
    computed:{
      
    },
    methods: {
        rightclick(q){
            this.righttitle = q.righttitle;
        this.banid=q._id,//周榜
        // this.seniority.monthid=q.monthRank,//月榜
        // this.seniority.totalid=q.totalRank,//总榜
        console.log( q,'q,w');
        },
        leftNavs(){
        const url = `/api/ranking/gender`;
          // this.rightnav.righttitle = q.righttitle;
          // this.rightnav.like = q.like;
        this.axios.get(url).then((res) => {
          if (res.data.ok) {
            
            this.pictures = res.data.picture;
            // this.leftNav.maleRank = res.data.male.slice(0, 7)
            //  = =res.data.male[0].title
            this.banid=res.data.picture[0]._id,//周榜
            // this.seniority.monthid=res.data.male[0].monthRank,//月榜
            // this.seniority.totalid=res.data.male[0].totalRank,//总榜
            console.log(res.data.picture,'chosen2333');
            this.rankists()
          }
        },err => {alert(err);});
      },
      rankists(){
        const src=`/api/ranking/${this.banid}`
        this.axios.get(src).then(Response=>{
          if (Response.data.ok) {
                this.looklist = Response.data.ranking.books;
                // this.looklists = Response.data.ranking.books.slice(this.fenye-20, this.fenye);
                //
                console.log(this.looklist,'<==2333');
          }
        })
      },
    },
    components:{
      LeftNav,CategoryBooklist
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .chosen{
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
        .chosen-left {
            width: 240px;
            border-top: 5px solid #cab389;
        }
        .chosen-right {
            width: 880px;
            padding: 0 15px;
            .title {
                height: 60px;
                line-height: 60px;
                color: #cab389;
                font-size: 22px;
                font-weight: 700;
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
</style>