import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "@/pages/Recommend"
import Personal from "@/pages/Personal"
import LogReg from "@/pages/LogReg"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      components: {default:Recommend, logreg: LogReg}
    },
    {
      path: "/personal",
      components: {default:Personal, logreg: LogReg}
    }
  ]
})
