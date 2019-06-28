<template>
    <div>
        <div class="link">
            <div>
                <span class="author">首页</span>
                <span class="fen">></span>
                <span>{{book.cat}}</span>
                <span class="fen">></span>
                <span>{{title}}</span>
            </div>
        </div>
        <div class="bookclass">
            <div class="book-info">
                <div class="bookimg">
                    <img class="auto-img" :src="_unEscape(cover)" alt="">
                </div>
                <div class="info">
                    <h1>
                        {{title}}
                    </h1>
                    <div class="tags">
                        <div v-for="(item, index) in tags" :key="index">
                            {{item}}
                        </div>
                    </div>
                    <div class="up">
                        <span class="author">{{book.author}}</span>
                        <span class="fen">|</span>
                        <span>{{book.cat}}</span>
                        <span class="fen">|</span>
                        <span>{{latelyCount(book.wordCount)}}</span>
                    </div>
                    <div class="up">
                        <span>{{_time(updated)>2? `${_time(updated)}小时前更新`:'刚刚更新'}}</span>
                    </div>
                    <div class="action" @click="lookingbook(mulu.seemulu[0],muluid,title,bookid)">开始阅读</div>
                </div>
            </div>
            <div class="book-data">
                <div>
                    <p class="key">追书人数</p>
                    <p class="value">{{book.latelyFollower}}</p>
                </div>
                <div>
                    <p class="key">读者留存率</p>
                    <p class="value">{{book.retentionRatio}}</p>
                </div>
                <div>
                    <p class="key">日更新字数</p>
                    <p class="value">{{book.serializeWordCount}}</p>
                </div>
            </div>
            <div class="brief">
                <h3>《{{title}}》简介:</h3>
                <div class="brief-txt" v-html="bookChaptersBody(book.longIntro)"></div>
            </div>
            <div class="directory">
                <div class="title">
                    <h3>《{{title}}》最新章节:</h3>
                </div>
                <ul class="directorylist">
                    <li v-for="(item, index) in mulu.newmulu" :key="index" 
                    @click="gotureading(item,muluid,title,bookid)">
                        <div class="text">{{item.title}}</div>
                    </li>
                </ul>
            </div>
            <div class="directory">
                <div class="title">
                    <h3>《{{title}}》目录:</h3>
                    <div @click="zhankai">
                        <span>全部章节</span><span class="icon iconfont icon-iconfontjiantou"></span>
                    </div>
                </div>
                <ul class="directorylist" :class="height==true?'gao':'yincan'">
                    <li v-for="(item, index) in mulu.seemulu" :key="index" 
                    @click="gotureading(item,muluid,title,bookid)">
                        <div class="text">{{item.title}}</div>
                    </li>
                </ul>
            </div>
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
      muluid:null,
      book:{
        author:null,
        cat:null,
        wordCount:null,
      },
      people:"",
      cover:null,
      title:null,
      tags:null,
      updated:"",
      mulu:{
          seemulu:null,
          newmulu:null,
      },
      height:false,
        }
    },
    created() {
            this.bookid=this.$route.params.id
            if (this.bookid) {
                this.getbookdetaili(this.bookid)
                this. getmulilist()
            }
      
      console.log(this.bookid ,'this.bookid ');
    
    },
    mounted() {
    },
    updated() {
        console.log('???');
        
    },
    computed:{
      
    },
    watch: {
       "$route.path":function () {
            this.bookid=this.$route.params.id
             if (this.bookid) {
                this.getbookdetaili(this.bookid)
                this. getmulilist()
            }
        // console.log( this.bookid,'???');
       }
    },
    methods: {
        getbookdetaili(id){
            const src = `/api/book/${id}`;
            this.axios.get(src).then(
                response => {
                    this.book=response.data
                    this.cover=response.data.cover
                    this.title=response.data.title
                    this.tags=response.data.tags
                    this.updated=response.data.updated
            },err => {alert(err);});
        },
        getmulilist(){
            const url = `/api/atoc/?view=summary&book=${this.bookid}`;
            this.axios.get(url).then(
            response => {
            this.muluid=response.data[0]._id
            this.getmulu();

            },err => {alert(err);});
        },
        gotureading(book,id,name,bookoId){
            this.$router.push({
                path: `/letmeseesee/${book}`,
                query:{book:book,bookid:id,bookname:name,bookIdold:bookoId}
            })
                console.log(book,'bookmulu');

        },
        lookingbook(book,id,name,bookoId){
            this.$router.push({
                path: `/letmeseesee/${book}`,
                query:{book:book,bookid:id,bookname:name,bookIdold:bookoId}
            })
                console.log(book,'book');
       
        },
        zhankai(){
            this.height=!this.height
        },
      _unEscape(str){
        str = unescape(str).replace("/agent/", "")
        return str
      },
      latelyCount(count) {
      if (count > 10000) {
        return (count / 10000).toFixed() + "万字";
      } else {
        return count + "字";
      }
    },
    _time(time){
        let currentTime = Math.round(new Date() / 1000);
        this.upDate = time.replace("T", ' ').replace("Z", ' ');
        this.upDate = Date.parse(new Date(this.upDate)) / 1000;
        return Math.floor((currentTime - this.upDate) % 86400 / 3600)
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
    getmulu(){//获取目录
                const link = `/api/btoc/${this.muluid}?view=chapters&channel=mweb`
         if (this.muluid) {
            console.log(link,'response.data1111',this.muluid);
              // const link = `/mulus/atoc/5885ddbb0ae68a787498d4ee?view=chapters` //自己写的根据书源id找章节
                    this.axios.get(link).then(
                        response => {
                            this.mulu.seemulu= response.data.chapters
                            this.mulu.newmulu= response.data.chapters.slice(-6)
                            console.log(this.mulu.newmulu,'response.data');
                            
                },err => {alert(err);});
        }
    },
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .bookclass{
        width: 1200px;
        margin: 0 auto;
        padding: 36px 100px;
        box-sizing: border-box;
        .book-info{
            display: flex;
            height: 150px;
            .bookimg{
                width: 120px;
                height: 100%;
                box-shadow: 0 4px 5px #bbb;
                margin-right: 36px;
            }
            .info{
                h1{
                    line-height: 25px;
                    font-size: 20px;
                    color: #666;
                }
                div{
                    font-size: 12px;
                    color: #666;
                }
                .tags{
                    display: flex;
                    flex-wrap: wrap;
                    padding-top: 10px;
                    div{
                        line-height: 24px;
                        padding: 0 10px;
                        margin-right: 10px;
                        color: #fff;
                        background-color: #86d196;
                        font-size: 12px;
                        margin-bottom: 5px;
                    }
                }
                .up{
                    padding: 6px 0;
                    color: #999;
                    font-size: 12px;
                    .author{
                        color: #e4393c;
                    }
                }
                .action{
                    width: 120px;
                    line-height: 30px;
                    text-align: center;
                    color: #fff;
                    background-color: #d82626;
                    font-size: 14px;   
                    cursor:pointer;   
                }
            }
        } 
        .book-data{
            border-bottom: 1px solid #ddd;
            padding: 40px 0 30px;
            margin-bottom: 20px;
            text-align: center;
            display: flex;
            justify-content: space-around;
            div>p:nth-child(1){
                height: 20px;
                line-height: 20px;
                color: #999;
                font-size: 14px;
            }
            div>p:nth-child(2){
                line-height: 30px;
                font-size: 18px;
                font-weight: 700;
                color: #d82626;
            }
        }
        .brief{
            h3{
                position: relative;
                padding-left: 5px;
                border-left: 5px solid #cab389;
                font-size: 16px;
                color: #666;
            }
            .brief-txt{
                position: relative;
                font-size: 12px;
                color: #666;
                padding:40px;   
                line-height: 36px;
            }
        }
        .directory{
            margin-bottom: 40px;
            .title{
                display: flex;
                justify-content: space-between;
                div{
                    font-size: 14px;
                    color: #666;
                    width: 90px;
                    font-weight: 100;
                }
            }
            h3{
                position: relative;
                padding-left: 5px;
                border-left: 5px solid #cab389;
                font-size: 16px;
                color: #666;
            }
            .directorylist{
                margin: 20px;
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                color: #666;
                li{
                    width: 50%;
                    height: 40px;
                    line-height: 40px;
                    font-size: 12px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #eee;
                    display: -webkit-box;
                    display: -moz-box;
                    // white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                        padding-left: 40px;
                    cursor:pointer;
                }
                li:hover{
                    color: #e4393c;
                }
            }
        }
            
    }
    .link{
        width: 1200px;
        margin: 0 auto;
        line-height: 50px;
        font-size: 13px;
        div{
            margin-left: 100px;
            color: #666;
        }
    }
    .fen{
        margin: 0 8px;
    }
    .gao{
        height: none;
    }
    .yincan{
        height: 410px;
    }
</style>