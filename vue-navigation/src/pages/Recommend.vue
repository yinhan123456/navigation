<template>
    <div class="recommend">
      <catalogue class="re-cata"
                 :cata=webdata
                 :addCata=false :recomm=false></catalogue>
      <websites class="re-webs"
                :webdata=webdata
                ad="true"
                :addP2=false
                :closeP=false></websites>
    </div>
</template>

<script>
  import Catalogue from "@/components/Catalogue";
  import Websites from "@/components/Websites";

    export default {
        name: "Recommend",
      components: {Catalogue, Websites},
      data() {
          return {
            cataData: [],
            webdata: []
          }
      },
      created: function() {
          var that = this;
          this.$axios.get("/users/api/recommend")
            .then(function(response) {
              that.webdata = response.data;
            });
      },
      computed: {
      }
    }
</script>

<style scoped>
  .recommend {
    width: 100%;
  }
  .re-cata {
    box-sizing: border-box;
    /*float: left;*/
    border-right: .1rem solid black;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 22%;
  }

  .re-webs {
    width: 78%;
    float: right;
    box-sizing: border-box;
    padding-left: 2rem;
  }
</style>
