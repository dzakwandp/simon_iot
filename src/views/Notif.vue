<template>
  <div>
    <v-container class="mb-6">
      <h1 class="green--text font-weight-light">Notifikasi</h1>
      <v-list>
        <v-list-item v-for="(item, index) in reversedlogs" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.isi }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.waktu }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>
  
  
  <script>
import axios from "axios";
export default {
  data() {
    return {
      logs: [],
    };
  },
  computed:{
    reversedlogs(){
      return this.logs.slice().reverse()
    }
  },
  mounted() {
    let config = {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };
    axios
      .get("http://182.255.0.149/API_Tambak/public/api/logs", config)
      .then((res) => {
        // console.log(res.data.data)
        this.logs = res.data.data;
        console.log(this.logs);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>