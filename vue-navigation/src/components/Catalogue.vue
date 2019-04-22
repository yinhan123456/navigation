<template>
    <aside class="catalogue">
      <div class="cata-top">Navigation</div>
      <div class="scrollBox">
        <ul>
          <li v-for="item in cata">
            <a :href=ankor(item.catalogue)>{{item.catalogue}}</a>
            <div class="closeLi" @click="delCatalogue" v-if=recomm>X
              <p class="c_id">--{{item._id}}--</p>
            </div>
          </li>
          <li v-if=addCata>
            <a href="" @click.prevent="addCatalogue">+</a>
          </li>
        </ul>
      </div>
      <div class="scroll" v-show="scrollShow"></div>
    </aside>
</template>

<script>
    export default {
        name: "Catalogue",
      data: function() {
          return {
            c_id: String,
            scrollShow: false
          }
      },
      props: {
          cata: Array,
        addCata: Boolean,
        recomm: Boolean
      },
      methods: {
          ankor: function (webname) {
            return "#" + webname;
          },
          addCatalogue: function() {
            var username = localStorage.getItem("username");
            var token = localStorage.getItem("token");
            var that = this;

            if (username && token) {
              var cataName = prompt("请输入目录名");
              if (cataName) {
                this.$axios.get("/users/api/addCatalog", {
                  params: {
                    username: username,
                    token: token,
                    catalogue: cataName
                  }
                }).then(function(response) {
                  if (response.data.status ===1 ) {
                    that.$router.go(0);
                  }
                  }
                )
              }
            } else {
              console.log("请登陆");
            }
          },
          delCatalogue: function(event) {
            if (confirm("确定删除吗？")) {
              var text = event.target.innerText;
              var c_id = text.match(/--(\S*)--/)[1];

              var username = localStorage.getItem("username");
              var token = localStorage.getItem("token");
              var that = this;

              if (username && token) {
                this.$axios.get("/users/api/delCatalog", {
                  params: {
                    username: username,
                    token: token,
                    c_id: c_id
                  }
                }).then(function(response) {
                    console.log(response);
                    if (response.data.status ===1 ) {
                      that.$router.go(0);
                    }
                  }
                )
              } else {
                console.log("请登陆");
              }
            }
          }
      },
      mounted: function() {
          var catalogue = document.getElementsByClassName("catalogue")[0];
          var cataTop = document.getElementsByClassName("cata-top")[0];
          var scrollBox = document.getElementsByClassName("scrollBox")[0];
          var that = this;

          function wheel (event) {
            event.stopPropagation();
            event.preventDefault();
            // that.scrollShow = true;
            //内容的移动
            var cataTopH = cataTop.scrollHeight;
            var scrollH = scrollBox.offsetHeight;
            var clientH = catalogue.clientHeight - cataTopH;
            var delta = event.wheelDelta || - event.detail;
            var y = Math.max(-1, Math.min(1, -delta))*10;
            var top = parseInt(scrollBox.style.top) || 0;
            top = top -y;
            if (top >= 0) top = 0;
            else if (top <= clientH - scrollH) top = clientH - scrollH;
            scrollBox.style.top = top + "px";
            //滚动条的移动
            var scr = document.getElementsByClassName("scroll")[0];
            var scrH = (clientH / scrollH) * clientH;
            var scrTop = (clientH / scrollH) * (-top) + cataTopH;
            scr.style.top = scrTop + "px";
            scr.style.height = scrH + "px";
          }
          function show (event) {
            var scr = document.getElementsByClassName("scroll")[0];
            var cataTopH = cataTop.scrollHeight;
            var scrollH = scrollBox.offsetHeight;
            var clientH = catalogue.clientHeight - cataTopH;

            var scrH = (clientH / scrollH) * clientH;
            // var scrTop = (clientH / scrollH) * (-top) + cataTopH;
            // scr.style.top = scrTop + "px";
            scr.style.height = scrH + "px";
            if (scrollH > catalogue.clientHeight) that.scrollShow = true;
          }
          function hide (event) {
            that.scrollShow = false;
          }
          catalogue.addEventListener("mousewheel", wheel);
          catalogue.addEventListener("DOMMouseScroll", wheel);
          catalogue.addEventListener("mouseover", show);
          catalogue.addEventListener("mouseout", hide);
      }
    }
</script>

<style scoped>
  .catalogue {
    overflow: hidden;
    height: 100%;
  }
  .scrollBox {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    padding-right: 1rem;
    padding-bottom: 1rem;
    top: 0;
  }
  .scroll {
    background: black;
    width: .5rem;
    height: 200px;
    position: absolute;
    z-index: 10;
    right: .2rem;
    top: 4.7rem;
    opacity: .5;
  }
  .cata-top {
    display: inline-block;
    text-indent: -5.5rem;
    line-height: 5rem;
    font-size: 2.5rem;
    width: 100%;
    box-sizing: border-box;
    height: 4.7rem;
    color: rgb(150, 150, 150);
    font-family: "Times New Roman", Georgia, Serif,serif;
    font-style: italic;
    position: absolute;
    left: 0;
    border-bottom: .1rem black solid;
    opacity: 1;
    background: white;
    z-index: 10;
  }
  ul {
    list-style: none outside;
    text-align: left;
    padding-left: 0;
    margin-top: 4.5rem;
    z-index: 9;
  }
  li {
    border-bottom: .1rem solid black;
    padding: 3rem  3rem .5rem 3rem;
    font-size: 1.6rem;
    margin: 0 3.5rem 0 2rem;
    transition: font-size .6s;
    display: block;
    width: 48%;
    height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }
  li a {
    text-decoration: none;
    color: rgb(150,150,150);
    font-size: inherit;
  }
  li:hover {
    color: #2c3e50;
    font-size: 1.7rem;
    transition: font-size .3s;
    cursor: pointer;
  }
  li a:hover {
    color: #2c3e50;
    transition: color .1s;
  }
  .closeLi {
    position: absolute;
    left: 0;
    top: 3.1rem;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: .9rem;
    color: rgb(120,120,120);
    line-height: 1.8rem;
  }
  .closeLi:hover {
    cursor: pointer;
    color: black;
  }
  .c_id {
    height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
