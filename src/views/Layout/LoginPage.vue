<template>
  <div>
    <v-app>
      <v-main class="d-flex justifiy-center align-center">
        <v-col cols="6" ls="4" class="mx-auto">
          <v-card
            class="
              pt-4
              pb-4
              pl-16
              pr-16
              align-center
              text-center
              grey
              lighten-5
            "
          >
            <v-img
              src="@/assets/logo.png"
              height="120"
              width="120"
              class="mx-auto"
            ></v-img>
            <h2 class="font-weight-light green--text">
              Selamat datang di Simon Web!
            </h2>
            <small class="font-weight-light green--text"
              >Silahkan masukkan username dan password anda</small
            >
            <v-text-field
              label="Username"
              color="green lighten-1"
              v-model="username"
              :rules="[rules.requiredUser]"
            ></v-text-field>
            <v-text-field
              label="Password"
              color="green lighten-1"
              v-model="password"
              :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showpass ? 'text' : 'password'"
              @click:append="showpass = !showpass"
              :rules="[rules.requiredPass]"
            ></v-text-field>
            <small v-text="errormessage" class="red--text"></small>
            <v-spacer></v-spacer>
            <v-btn class="green lighten-1" dark @click="loginSubmit()"
              >Login</v-btn>
          </v-card>
        </v-col>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import router from "@/router"
import axios from "axios";
// import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      showpass: false,
      errormessage:"",
      rules: {
        requiredUser: value => !!value || 'Username ini harus diisi',
        requiredPass: value => !!value || 'Password ini harus diisi',
      }
    };
  },
  methods: {
    loginSubmit() {
      const auth = { username: this.username, password: this.password };
      // axios.post("http://localhost:2727/public/api/user/login", auth)
      axios.post("http://182.255.0.149/API_Tambak/public/api/user/login_admin", auth)
      .then((res)=> {
        console.log(res.data.user)
        sessionStorage.setItem("authenticated",true);
        sessionStorage.setItem("token",res.data.user.token);
        router.push({name:"home"})
      })
      .catch((error)=>{
        console.log(error.response.data.messageHandler)
        this.errormessage=error.response.data.messageHandler
        this.errored=true
      })
    },
  },
};
// login() {
//     axios.post('http://182.255.0.149/API_Tambak/public/api/user/login', this.form)
//         .then(response => {
//             let responseData = response.data.data
//             // this.$localStorage.set('access_token', responseData.token)
//             this.$bus.$emit('logged', 'User logged')
//             this.$router.push('/')
//         })
//         .catch(error => {
//             if (error.response) {
//                 console.log(error.response.data)
//                 console.log(error.response.status)
//                 console.log(error.response.headers)
//             }
//         })
// }
</script>