<template>
  <div class="websiteAdd" @click="addWebsite">
    <div class="link">
      <a>+</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WebsiteAdd",
    props: {
      catalogue: String
    },
    methods: {
      addWebsite: function() {
        var username = localStorage.getItem("username");
        var token = localStorage.getItem("token");
        var that = this;

        if (username && token) {
          var webname = prompt("请输入网站名");
          var address = prompt("请输入网址，如www.baidu.com");

          if (webname && address) {
            this.$axios.get("/users/api/addWebsite", {
              params: {
                username: username,
                token: token,
                catalogue: that.catalogue,
                webname: webname,
                address: address
              }
            }).then(function(response) {
              console.log(response);
                if (response.data.status ===1 ) {
                  that.$router.go(0);
                }
              }
            )
          }
        } else {
          console.log("请登陆");
        }
      }
    }
    // props: {
    //   webname: String,
    //   address: String,
    //   closeP: Boolean,
    //   addressP: Boolean
    // }
  }
</script>

<style scoped>
  .websiteAdd {
    position: relative;
    display: inline-block;
    margin: 1rem 1.5rem;
    text-align: center;
  }
  .link {
    width: 13rem;
    height: 7rem;
    overflow: hidden;
    vertical-align: middle;
    text-overflow: ellipsis;
    border-radius: 1rem;
    box-shadow: 0 0 .5rem gray;
    border: .1rem rgb(150, 150, 150) solid;
    transition: transform 1.8s, box-shadow 1.8s, border 1.5s, text-shadow 1.8s;
  }
  .link:hover {
    border: 1px rgba(200, 200, 200, 0.2) solid;
    transform: translate(-.2rem, -1rem);
    box-shadow: .3rem .5rem 2rem gray;
    text-shadow: .3rem .5rem .5rem gray;
    transition: transform .5s, box-shadow .5s, border .5s, text-shadow .5s;
    cursor: pointer;
  }
  a {
    display: inline-block;
    text-decoration: none;
    color: black;
    line-height: 7rem;
    width: 100%;
    font-size: 2rem;
  }

</style>
