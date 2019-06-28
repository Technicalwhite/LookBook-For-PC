<template>
    <div class="search">
        <div class="left-list">
            <div class="title">
                共<span>{{duoshao}}</span>条<span>{{word}}</span>相关的搜索结果
            </div>
            <div class="">
                <div class="book-lists" v-for="(item, index) in keywordList" :key="index">
                    <CategoryBooklist :CategoryBooklist="item"></CategoryBooklist>
                </div>
            </div>
        </div>
        <div class="right-list">
            <div class="list">
                <Bigsou></Bigsou>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import CategoryBooklist from '../components/CategoryBooklist'
import Bigsou from '../components/Bigsou'
  export default {
    name: "",
    props: {
      
    },
    data() {
        return {
      word:'',
      keywordList:null,
      duoshao:0
        }
    },
    created() {
        this.word=this.$route.params.shu
        if (this.word!==null) {
        this. searchlist(this.word)
            
        }
        console.log(this.$route.params.shu,'this.$route.params<<<');
      
    },
    computed:{
      
    },
    updated() {
        console.log('???');
        
    },
    computed:{
      
    },
    watch: {
       "$route.path":function () {
             this.word=this.$route.params.shu
             if (this.word) {
                this.searchlist(this.word)
            }
           console.log(this.word,'????>>>>>>',this.$route.params);
           
       }
    },
    methods: {
        searchlist(word){
            const s=`/api/book/fuzzy-search?query=${word}`
            this.axios.get(s).then(response=>{
            this.keywordList=response.data.books
            this.duoshao=response.data.books.length
            console.log( this.keywordList,'<<<<suosuosuosuosou',this.word);
            },err => {alert(err)});
        }
    },
    components:{
      CategoryBooklist,Bigsou
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .search{
        width: 1200px;
        margin: 0 auto;
        padding: 36px 70px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .title{
            line-height: 45px;
            color: #999;
            font-size: 16px;
            border-bottom: 1px solid #aaa;
            span{
                color: red;
            }
            span:nth-child(2){
                font-size: 20px;
                padding: 5px;
            }
        }
        .left-list{
            width: 70%;
            .book-lists {
                padding: 15px 25px;
                width: 100%;
                height: 120px;
            }
        }
        .right-list{
            width: 20%;
            height: 555px;
        }
    }
</style>