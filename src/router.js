import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Wiews from './views/Wiew.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect:'/wiews'
      // name: "wiews",
      // component: Wiews
    },
    {
      path: "/wiews",
      name: "wiews",
      //首页
      component: () =>
        import( "./views/Wiew.vue")
    },
    {
      path: "/chosen",//精选
      name: "Chosen",
      component: () =>
        import( "./views/Chosen.vue")
    },
    {
      path: "/category",//分类
      name: "category",
      component: () =>
        import( "./views/Category.vue")
    },
    {
      path: "/booksdan",//书单
      name: "Booksdan",
      component: () =>
        import( "./views/Booksdan.vue")
    },
    {
      path: "/ranking",//排行
      name: "Rank",
      component: () =>
        import( "./views/Rank.vue")
    },
    {
      path: "/download",//download
      name: "Download",
      component: () =>
        import( "./views/Download.vue")
    },
    {
      path: "/Bookdetails/:name/:id",//书籍详情
      name: "Bookdetails",
      component: () =>
        import( "./views/Bookdetails.vue")
    },
    {
      path: "/letmeseesee/:name",//书籍阅读
      name: "LookingBook",
      component: () =>
        import( "./views/LookingBook.vue"),
        keepAlive: true // 需要被缓存
    },
    {//搜索页
      path: "/search/:shu",//download
      name: "Search",
      component: () =>
        import( "./views/Search.vue")
    },
  ],
  linkActiveClass:'active'
});
