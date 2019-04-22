<template>
  <div class="Personal">
    <catalogue class="re-cata"
               :cata=webdata
               :addCata=true
               :recomm=true
               ref="cat"></catalogue>
    <websites class="re-webs"
              :webdata=webdata
              :closeP2=true
              :addP2=true></websites>
  </div>
</template>

<script>
  import Catalogue from "@/components/Catalogue";
  import Websites from "@/components/Websites";

  export default {
    name: "Personal",
    components: {Catalogue, Websites},
    data() {
      return {
        webdata: []
      }
    },
    created: function() {
      var username = localStorage.getItem("username");
      var token = localStorage.getItem("token");

      if (username && token) {
        var that = this;
        this.$axios.get("/users/api/getWebsite", {
          params: {
            username: username,
            token: token
          }
        }).then(function(response) {
            that.webdata = response.data.data;
          });
      }
    },
    methods: {
      }
  }
</script>

<style scoped>
  .re-cata {
    box-sizing: border-box;
    width: 22%;
    float: left;
    border-right: 1px solid black;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
  }

  .re-webs {
    width: 78%;
    float: right;
    box-sizing: border-box;
    padding-left: 2rem;
  }
</style>
