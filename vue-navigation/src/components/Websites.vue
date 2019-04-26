<template>
    <div class="websites" v-if="webdata.length">
      <div v-for="item1 in webdata">
        <h3 :id=item1.catalogue>{{item1.catalogue}}</h3>
        <website v-for="item2 in item1.websites"
                 :webname=item2.webname
                 :address=item2.address
                  :closeP=closeP2
                 :addressP=true :c_id=item1._id :w_id=item2._id>
        </website>
        <website-add v-if=addP2 :catalogue=item1.catalogue></website-add>
      </div>
    </div>
</template>

<script>
  import Website from "@/components/Website"
  import WebsiteAdd from "@/components/WebsiteAdd"

    export default {
        name: "Websites",
      components: {
          Website, WebsiteAdd
      },
      data: function() {
          return {
          }
      },
      props: {
        webdata: Array,
        addP2: Boolean,
        closeP2: Boolean
      },
      methods: {
      }
    }
</script>

<style scoped>
  .websites {
    text-align: left;
  }
  .websites h3 {
    font-size: 1.7rem;
    text-align: left;
    text-indent: 2rem;
  }
</style>
