<template>
  <nav>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="green"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="green--text">
        <span class="font-weight-light">Simon</span>
        <span>Web</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y :rounded="lg" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            dot
            :content="messages"
            :value="messages"
            color="red"
            overlap
            class="mr-6"
          >
            <v-icon medium v-bind="attrs" v-on="on"> mdi-alert-circle </v-icon>
          </v-badge>
        </template>
        <v-list color="red lighten-5">
        <v-list-item
          v-for="(item, index) in reversedlogrusaks.slice(0,5)"
          :key="index"
        >
        <v-list-item-content>
          <v-list-item-title>{{ item.isi }}</v-list-item-title>
          <v-list-item-subtitle>{{item.waktu}}</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn block dark color="green lighten-1" @click="toAlert()">Lihat Semua Error</v-btn>
      </v-menu>
      <v-menu offset-y :rounded="lg" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            dot
            :content="messages"
            :value="messages"
            color="green"
            overlap
            class="mr-6"
          >
            <v-icon medium v-bind="attrs" v-on="on"> mdi-bell </v-icon>
          </v-badge>
        </template>
        <v-list color="orange lighten-5">
        <v-list-item
          v-for="(item, index) in reversedlogs.slice(0,5)"
          :key="index"
        >
        <v-list-item-content>
          <v-list-item-title>{{ item.isi }}</v-list-item-title>
          <v-list-item-subtitle>{{item.waktu}}</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn block dark color="green lighten-1" @click="toNotif()">Lihat Semua Notifikasi</v-btn>
      </v-menu>
      <v-btn outlined color="red lighten-1" @click="logOut()">
        <span>Keluar</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="green lighten-1">
      <v-list nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-img
                src="@/assets/logo.png"
                max-height="100"
                max-width="100"
                class="mx-auto"
              ></v-img>
              <p class="text-center white--text">
                <b>Si</b>stem <b>Mon</b>itoring<br />Tambak
              </p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-group color="white">
          <v-list-item
            v-for="item in links"
            :key="item.text"
            :to="item.route"
            link
          >
            <v-list-item-action>
              <v-icon class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                item.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-footer absolute padless class="green--text">
      <v-col class="text-center" cols="12">
        Copyright © 2022 |
        <b
          ><a
            style="text-decoration: none; color: inherit"
            href="https://tekkom.ft.undip.ac.id"
            >Teknik Komputer Undip</a
          ></b
        >
      </v-col>
    </v-footer>
  </nav>
</template>


<script>
import router from "@/router";
import axios from "axios";
export default {
  data() {
    return {
      logs:[],
      logrusaks:[],
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Pengguna", route: "/" },
        { icon: "mdi-graph", text: "Tambak", route: "/node" },
        // {icon: 'mdi-account-multiple', text: 'Pengguna', route: '/users'},
        // {icon: 'mdi-apps', text: 'Komoditas', route: '/komoditas'},
      ],
    };
  },
  computed:{
    reversedlogs(){
      return this.logs.slice().reverse()
    },
    reversedlogrusaks(){
      return this.logrusaks.slice().reverse()
    }
  },
  methods: {
    logOut() {
      sessionStorage.setItem("authenticated", false);
      sessionStorage.clear("token");
      router.push("/login");
    },
    toNotif(){
      router.push('/notif')
    },
    toAlert(){
      router.push('/alert')
    }
  },
  mounted(){
    let config = {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };
    axios
    .get("http://182.255.0.149/API_Tambak/public/api/logs",config)
    .then((res)=>{
      // console.log(res.data.data)
      this.logs=res.data.data
      console.log(this.logs)
    })
    .catch((error)=>{
      console.log(error)
    })
    axios
    .get("http://182.255.0.149/API_Tambak/public/api/logrusaks",config)
    .then((res)=>{
      // console.log(res.data.data)
      this.logrusaks=res.data.data
      console.log(this.logs)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
};
</script>