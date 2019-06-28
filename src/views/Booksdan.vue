<template>
     <div class="booksdan">
        <div class="left-list">
            <div class="book-lists" v-for="(item, index) in write" :key="index">
                <CategoryBooklist :CategoryBooklist="item"></CategoryBooklist>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import CategoryBooklist from '../components/CategoryBooklist'
  export default {
    name: "",
    props: {
      
    },
    data() {
        return {
      write:null,
        }
    },
    created() {
      this.lists()
    },
    computed:{
      
    },
    methods: {
        lists(){
            const src=`/api/book/by-categories?gender=press&type=hot&major=%E5%A4%96%E6%96%87%E5%8E%9F%E7%89%88`
            this.axios.get(src).then(response=>{
                this.write=response.data.books
                console.log( response.data.books,'<<<<suosuosuosuosou',);
            },err => {alert(err)});
        }
      
    },
    components:{
      CategoryBooklist
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .booksdan{
        width: 1200px;
        margin: 0 auto;
        padding: 36px 120px;
        box-sizing: border-box;
      
        .left-list{
            width: 100%;
            .book-lists {
                padding: 15px 25px;
                width: 100%;
                height: 120px;
            }
        }
    }
</style>