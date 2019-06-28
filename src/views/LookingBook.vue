<template>
    <div class="readings" @scroll="gundongtiao()" ref="scrolls"> 
       <div class="looking" ref="nh">
            <div class="left-btn btn" :style="{'top':btntop ? '41px':'0'}">
                <div @click="toindex" class="icon iconfont icon-shouye"></div>
                <div @click="todetails(title,bookIdold)" class="icon iconfont icon-icon"></div>
                <div @click="download" class="icon iconfont icon-Group-"></div>
            </div>
            <div class="down" v-show="isdownload">暂时无法下载</div>
            <div class="right-btn btn" :style="{'bottom':btnbottom ? '0':'40px'}">
                <div @click="shang" class="icon iconfont icon-jiantou-copy-copy-copy"></div>
                <div @click="kaimulu" class="icon iconfont icon-liebiao"></div>
                <div @click="xia" class="icon iconfont icon-iconfontjiantou"></div>
            </div>
            <div class="details" v-show="guan" ref="lie">
                <div class="chapter-list">
                    <h4 class="name">章节列表
                        <span @click="cha" class="icon iconfont icon-guanbi1 toright"></span>
                    </h4>
                    <div class="lists">
                        <ul>
                            <li @click="tosee(index)" :class="index==order?'act':''" v-for="(item, index) in bookmulu" :key="index">{{item}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- :class="top(btntop?0:41+'px')" -->
            <ul class="link">
                <li @click="toindex">首页</li>
                <li class="icon">></li>
                <li @click="todetails">{{title}}</li>
                <li class="icon">></li>
                <li>{{bookContent.title}}</li>
            </ul>
            <div class="book">
                <h4 class="title">
                    <span>{{title}}</span>
                    <span>{{bookContent.title}}</span>
                </h4>
                <div class="book-text" v-html="bookChaptersBody(bookContent.cpContent)"></div>
            </div>
        <!-- <div>next</div> -->
        </div>
    </div>
</template>
<script type="text/javascript">
  export default {
    name: "",
    props: {
      
    },
    data() {
        return {
      bookid:null,
      bookIdold:null,
      order:0,
      len:null,
      mululink:null,
      booklinks:[],
      bookmulu:[],
      bookContent:"",
      title:'',
      btntop:true,
      btnbottom:true,
      isdownload:false,
      guan:false,

        }
    },
    created() {
        this.huo()
    },
    computed:{
        
    },
    watch: {
        "$route.path":function () {
            this.bookid=this.$route.query.bookid;
            if (this.bookid) {
                 this.huo()
            }
        }
    },
    methods: {
        huo(){
this.bookid=this.$route.query.bookid;
        this.bookIdold=this.$route.query.bookIdold;
        this.order=this.$route.query.book.order-1;
        this.title=this.$route.query.bookname
        this.getmulu()
        },
        gundongtiao(){
            let scrollTop = this.$refs.scrolls.scrollTop; //滚动条高度
            let offsetHeight = this.$refs.scrolls.offsetHeight; //可视高度
            let nh = this.$refs.nh.clientHeight; //内容高度
            // if (scrollTop>40) {
            //     this.btntop=false
            // }else{
            //     this.btntop=true
            // }
            if (scrollTop+offsetHeight>nh-40) {
                this.btnbottom=false
            }else{
                this.btnbottom=true
            }
            
        },
        getmulu(){//获取目录
            if (this.bookid!==null) {
                const link = `/api/btoc/${this.bookid}?view=chapters&channel=mweb`; //根据书源id找章节
                        this.axios.get(link).then(
                            response => {
                                this.mululink= response.data.chapters
                                this.len = response.data.chapters.length;
            // console.log(response.data.chapters,'QAQ');
                                for (let i = 0; i < this.len; i++) {
                                    this.bookmulu.push(response.data.chapters[i].title);
                                    this.booklinks.push(encodeURIComponent(response.data.chapters[i].link));
                                }
                this.see()
                    },err => {alert(err);});

            }
        },
        see() {//请求章节方法
            const url = `/content/chapter/${this.booklinks[this.order]}`;
            this.axios.get(url).then(
                res => {
                this.bookContent = res.data.chapter;
                },err => {alert(err);});
        },
        bookChaptersBody(books){
            if (books) {
                let c = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;
                let _book = JSON.stringify(books).replace(/^"|"$/g, '').replace(/\\r/g, '');
                this.loading = false;
                if (c.test(_book)) {
                    _book = '<p>' + _book.replace(/\s*/g, '').replace(/\\n/g, '</p><p>') + '</p>';
                    return _book
                }
            }
        },  
        toindex(){
            this.$router.push({
                path:'/',
            })
        },
        todetails(name,id){
            this.$router.push({
                path:'/Bookdetails/'+name+'/'+id,
            })
        },
        download(){
            this.isdownload=!this.isdownload
            if ( this.isdownload==true) {
                setTimeout(() => {
                    this.isdownload=!this.isdownload
                }, 1000);
            }
            
        },
        tosee(index){
            this.order=index
            this.see()
            this.guan=false
        },
        shang(){
            this.order-=1
            this.$refs.scrolls.scrollTop=0
            if (this.len< this.order+1) {
                this.bookContent.cpContent='这是目前最后一章了'
                return
            }
            if(this.order<0){
                this.order=0
                return
            }
            this.see()
        },
        kaimulu(){
            this.guan=true
            
        },
        xia(){
            this.order+=1
            this.$refs.scrolls.scrollTop=0
            if (this.len< this.order+1) {
                this.bookContent.cpContent='这是目前最后一章了'
                return
            }
            if(this.order<0){
                this.order=0
                return
            }
            this.see()
        },
        cha(){
            this.guan=false
        }
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.readings{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #d1d6be;
    z-index: 999;
    .looking{
        width: 888px;
        height:auto;
        margin: 0 auto;
        position: relative;
    }
    .btn{
        color: #755927;
        text-align: center;
        z-index: 333px;
        div{
            width: 80px;
            background: #e9e6d0;
            font-size: 36px;
            line-height: 80px;
            margin-bottom: 6px;
            cursor:pointer;
        }
    }
    .down{
        position: fixed;
        top: 0;
        // left: calc(50% - 75px);
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 200px;
        padding: 5px 10px;
        height: 3rem;
        color: #fff;
        background: rgba(50,51,52,.6);
        font-size: 30px;
        text-align: center;
        line-height: 3rem;
        z-index: 333;
    }
    .details{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 366;
        background-color: rgba(0,0,0,.3);
        .chapter-list{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 600px;
            height: 70%;
            background: #fafafa;
            overflow: hidden;
            border-radius: 3px;
            .name{
                position: absolute;
                top: 0;
                width: 100%;
                height: 50px;
                line-height: 50px;
                font-size: 20px;
                text-align: center;
                color: #333;
                z-index: 1;
                .toright{
                    position: absolute;
                    right:0;
                    width:50px;
                    height: 50px;
                    color: #999;
                    cursor:pointer;
                }
            }
            .lists{
                position: absolute;
                bottom: 2px;
                width: 100%;
                height: 90%;
                overflow: auto;
                ul{
                    padding: 0 50px 60px;
                    color: #666;
                }
                li{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    border-bottom: 1px dashed #ccc;    
                    cursor:pointer;
                }
                li:nth-child(1){
                    border-top: 1px dashed #ccc;    
                }
            }
        }
    }
    .left-btn{
        position: fixed;
        left: 50%;
        margin-left: -540px;
    }
    .right-btn{
        position: fixed;
        right: 50%;
        margin-right: -540px;
    }
    .link{
        width: 888px;
        display: flex;
        margin: 0 auto;
        font-size: 12px;
        line-height: 36px;
        color: #755927;
        li{
            padding: 0 10px;
        }
        li:nth-child(1){
            cursor:pointer;
        }
        li:nth-child(3){
            cursor:pointer;
        }
        .icon{
            padding: 0;
            font-size: 17px;
            line-height: 36px;
        }
    }
    .book{
        width: 888px;
        margin: 5px auto 40px;
        color: #755927;
        .title{
            padding: 0 20px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            background: #e9e6d0;
            box-shadow: 0 2px 2px #bbb;
            display: flex;
            justify-content: space-between;
        }
        .book-text{
            position: relative;
            margin-top: 6px;
            min-height: 400px;
            padding: 40px;
            background: #e9e6d0;
            font-size: 16px;
            line-height: 36px;text-indent:2em;
        }
    }
}
    .act{
        color: #e4393c;
    }
</style>