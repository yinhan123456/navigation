<template>
  <div id="app" @click=noLoginR >
    <ul class="topbar" id="top" >
      <li><router-link to="/recommend" class="recommend-li">推荐</router-link></li>
      <li><router-link to="/personal" class="personal-li">个人</router-link></li>
      <li v-if=!ifLogin><a class="reg-log-li" @click.prevent.stop=loginR>注册/登陆</a></li>
      <li v-if=ifLogin class="user"><a href="" class="user-li" @click.prevent="quit">您好，{{username}}</a></li>
    </ul>
    <router-view class="view" />
    <div name="logreg"
         class="loginview"
         v-if=showLogReg @click.prevent.stop=loginR>
      <log-reg></log-reg>
    </div>
    <a href="#top"><img src="./assets/timg.jpg" v-if="false"/></a>
  </div>
</template>

<script>
  import LogReg from "@/pages/LogReg";
export default {
  name: 'App',
  components: {LogReg},
  component: LogReg,
  data: function() {
    return {
      ifLogin: false,
      username: "",
      showLogReg: false
    }
  },
  mounted: function() {
    var token = localStorage.getItem("token");
    var username = localStorage.getItem("username");
    if (token && username) {
      this.ifLogin = true;
      this.username = username;
    }
    window.addEventListener("scroll", function(e) {
      //滚动条y轴上的距离
      var a = document.documentElement.scrollTop || document.body.scrollTop;
      //可视区域的高度
      var b = document.documentElement.clientHeight || document.body.clientHeight;
      //可视化的高度与溢出的距离（总高度）
      var c = document.documentElement.scrollHeight || document.body.scrollHeight;
      //可视窗高度
      var d = window.innerHeight;
    });
  },
  methods: {
    quit: function() {
      var ifQuit = confirm("是否退出登陆");
      if (ifQuit) {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.$router.go(0);
      }
    },
    loginR: function() {
      this.showLogReg = true;
    },
    noLoginR: function() {
      this.showLogReg = false;
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 14px;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .topbar {
    list-style-type: none;
    margin: 0;
    box-sizing: border-box;
    padding: 0 0 0 0;
    width: 78%;
    height: 4.7rem;
    border-bottom: .1rem solid black;
    float: right;
  }
  .topbar li {
    display: inline-block;
    height: 4.5rem;
    box-sizing: border-box;
    margin: 0 10%;
    padding-left: .6rem;
    padding-right: .6rem;
    font-size: 1.5rem;
    border-top: .2rem transparent solid;
    color: rgb(150, 150, 150);
  }
  .topbar li:hover {
    border-top-color: #00B7FF;
    color: #2c3e50;
    cursor: pointer;
  }
  .topbar li.user:hover {
    border-top-color: transparent;
    color: #2c3e50;
  }
  .recommend-li, .personal-li, .reg-log-li ,.user-li{
    text-decoration: none;
    color: inherit;
    display: inline-block;
    /*height: 4.5rem;*/
    line-height: 4.3rem;
  }
  .view {
    width: 100%;
    height: 100%;
  }
  #app::after {
    content: "";
    height: 0;
    clear: both;
  }
  .loginview {
    position: fixed;
    left: 50%;
    top: 20%;
    z-index: 10;
  }
  #app>a>img{
    width: 5rem;
    height: 5rem;
    border: 2px solid rgba(100, 100, 100, .5);
    box-shadow: 0 0 2rem black;
    border-radius: 1rem;
  }
  #app>a {
    position: fixed;
    right: 4%;
    bottom: 4%;

  }
</style>
