<template>
    <div class="logreg">
      <form>
        <label>
          <input type="text" v-model="username" placeholder="username"/>
        </label>
        <label class="psw">
          <input type="password" v-model="password" placeholder="password"/>
        </label>
        <input type="button" value="登陆" @click="login"/>
        <input type="button" value="注册" @click="regis"/>
      </form>
    </div>
</template>

<script>

    export default {
      name: "LogReg",
      data() {
        return {
          password: "",
          username: ""
        }
      },
      methods: {
        regis: function() {
          if (!this.username) {
            alert("用户名为空");
          } else if (!this.password) {
            alert("请输入密码");
          } else {
            this.$axios.post("/users/api/register", {
              username: this.username,
              password: this.password
            }).then(function(response) {
              console.log(response);
              if (response.data.status === 1) {
                alert("注册成功，请重新登录");
              } else {
                alert(response.data.message);
              }
            })
          }
        },
        login: function() {
          var that = this;
          if (!that.username) {
            alert("用户名为空");
          } else if (!that.password) {
            alert("请输入密码");
          } else {
            that.$axios.get("/users/api/login",
              {
                params:{
                  username: that.username,
                  password: that.password
                }
              })
              .then(function (response) {
                console.log(response.data);
                if (response.data.status === 1) {
                  localStorage.setItem("username", response.data.username);
                  localStorage.setItem("token", response.data.token);
                  console.log(that);
                  //获取数据，跳转
                  // that.ifLogin = true;
                  that.$router.push("personal");
                  that.$router.go(0);
                } else {
                  alert(response.data.message);
                }
              })
          }
        },
      }
    }
</script>

<style scoped>
  .logreg {
    margin: 17% auto auto;
  }
  .logreg>form {
    margin: auto;
    border: 1px black solid;
    width: 21rem;
    background: white;
  }
  .logreg>form::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
  .logreg label input {
    line-height: 3.5rem;
    font-size: 2.1rem;
    border-width: 0;
    border-bottom: .2rem solid gray;
    width: 18rem;
    display: block;
    margin: 1.6rem;
  }
  .logreg label input:focus {
    outline: none;
    border-bottom-color: #00B7FF;
  }
  .logreg form>input {
    width: 7rem;
    height: 3.4rem;
    margin: 1rem 1.4rem;
    background: transparent;
    font-size: 1.5rem;
    color: gray;
  }
  .logreg form>input:hover {
    outline: none;
    color: #00B7FF;
  }
  .logreg form>input:focus {
    outline: none;
    color: black;
  }
  .logreg form>input:hover {
    cursor: pointer;
  }
  .logreg form>input:nth-of-type(1) {
    float: left;
  }
  .logreg form>input:nth-of-type(2) {
    float: right;
  }
</style>
