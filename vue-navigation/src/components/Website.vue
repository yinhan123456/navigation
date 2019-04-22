<template>
    <div class="website" v-if=del>
      <div class="link" @mouseout="hide" @mouseover="show">
        <a :href=addr target="blank" class="websitea">{{webname}}</a>
        <transition name="closev" v-if=closeP>
          <div class="close"
               name="closevue"
               @click="close"
               v-show=ifshow>X</div>
        </transition>
      </div>
      <transition name="addressv" v-if=addressP >
        <div class="address" v-if=ifshow>{{address}}</div>
      </transition>

    </div>
</template>

<script>
    export default {
      name: "Website",
      data() {
        return {
          ifshow: false,
          del: true
        }
      },
      props: {
        webname: String,
        address: String,
        closeP: Boolean,
        addressP: Boolean,
        c_id: String,
        w_id: String
      },
      computed: {
          addr: function() {
            return "http://" + this.address;
          }
      },
      methods: {
          close: function() {
            if (confirm("确定删除吗？")) {
              var username = localStorage.getItem("username");
              var token = localStorage.getItem("token");
              var that = this;
              if (username && token) {
                this.$axios.get("/users/api/delWebsite", {
                  params: {
                    username: username,
                    token: token,
                    c_id: that.c_id,
                    w_id: that.w_id
                  }
                }).then(function(response) {
                    if (response.data.status ===1 ) {
                      that.del = false;
                      // that.$router.go(0);
                    }
                  }
                )
              } else {
                console.log("请登陆");
              }
            }

          },
          show: function() {
            this.ifshow = true;
          },
          hide: function() {
            this.ifshow = false;
          }
      }
    }
</script>

<style scoped>
  .website {
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
  .close {
    position: absolute;
    left: 10.8rem;
    top: .4rem;
    background: rgba(200, 200, 200, .8);
    width: 1.8rem;
    height: 1.8rem;
    border-radius: .9rem;
    font-weight: bold;
    color: rgb(120,120,120);
    line-height: 1.8rem;
  }
  .close:hover {
    cursor: pointer;
  }
  .closev-enter, .closev-leave-to {
    opacity: 0;
  }
  .closev-enter-active, .closev-leave-active {
    transition: opacity .5s;
  }
  .address {
    background: black;
    color: white;
    position: absolute;
    /*left: -4rem;*/
    top: -6.5rem;
    padding: 1rem 1.5rem;
    border-radius: 1.8rem;
    box-shadow: .3rem .5rem 1.5rem black;
    opacity: .75;
  }
  .address::after {
    content: "";
    display: block;
    border: 1.3rem transparent solid;
    border-top-color: black;
    position: absolute;
    top: 3rem;
    left: .5rem;
  }
  .addressv-enter-active, .addressv-leave-active {
    transition: opacity .5s, box-shadow .5s;
  }
  .addressv-enter, .addressv-leave-to {
    opacity: 0;
    box-shadow: 0 0 0 black;
  }

</style>
