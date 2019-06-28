<template>
    <div class="leftbox">
        <div class="left-text" v-for="(item, index) in leftlist" :key="index"
         @click="navclick(item,index)" :class="index==indx?'actbg':''">
      <!-- -->
        <div class="txt" :class="index==indx?'act':''">{{item.title}}</div>
        </div>
    </div>
</template>
<script type="text/javascript">
  export default {
    name: "",
    props: {
      leftlist:null,
    },
    data() {
        return {
      indx: 0,
      rightnav:{
        righttitle: "男生", 
        weekid:'',//周榜
        monthid:'',//月榜
        totalid:'',//总榜
      },

        }
    },
    created() {
      console.log(this.leftlist,'c');
      
    },
    computed:{
      
    },
    methods: {
      navclick(item,index) {
        //左侧导航
        this.rightnav.righttitle = item.title;
        this.rightnav.weekid = item._id;
        this.rightnav.monthid = item.monthRank
        this.rightnav.totalid = item.totalRank
        this.indx = index;
        console.log( this.rightnav,'左侧导航item');
        const url = "/api/cats/lv2";
          this.$emit("qiehuan", this.rightnav);
        },
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.leftbox{
    width: 100%;
}
    .left-text {
      color: #999;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      cursor: pointer;
      .txt {
        width: 72%;
        min-width: 50%;
        height: 60px;
        text-align: center;
        line-height: 60px;
        box-sizing: border-box;
      }
    }
    .act {
  border-bottom: 5px solid #cab389;
}
.actbg {
  background: #f4f1ec;
}
</style>