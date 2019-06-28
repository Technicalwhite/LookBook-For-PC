<template>
    <div class="bigsou">
        <div class="title">大家都在找</div>
        <ul>
            <li v-for="(item, index) in hotci" :key="index" @click="tusearch">
                {{item.word}}
            </li>
        </ul>
        
    </div>
</template>
<script type="text/javascript">
  export default {
    name: "",
    props: {
      
    },
    data() {
        return {
      hotci:null,
      
        }
    },
    created() {
        this.bigsous()
    },
    computed:{
      
    },
    methods: {
        bigsous(){
            const url='/api/book/search-hotwords';
            this.axios.get(url).then(response=>{
                this.hotci=response.data.searchHotWords.slice(10,20)        
            },err => {alert(err)});
        },
        tusearch(e){
            let txt=e.target.innerText
            this.$router.push({
                path: '/search/'+txt,
            })
        },
    },
    components:{
      
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .ovo{font-size: 30px;}
    .bigsou{
        width: 100%;
        height: 100%;
        .title{
          line-height: 40px;
          font-weight: 700;
        }
        li{
        line-height: 20px;
        color: #666;
        cursor:pointer;
        }
    }
        
</style>