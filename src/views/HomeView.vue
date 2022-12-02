<template>
  <div class="home">
    <v-chip v-if="chip" color="green" label large outlined close @click:close="chip=false" class="ma-4">
      <v-icon>mdi-checkbox-marked-circle</v-icon>
      Login berhasil, selamat menggunakan layanan monitoring!
    </v-chip>
    <v-card class="ma-4 white--text" color="green lighten-1">
      <v-card-title>
        Daftar Pengguna
        <v-spacer></v-spacer>
        <v-text-field dark v-model="search" append-icon="mdi-magnify" label="Cari" single-line hide-details>
        </v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="list" :search="search">
        <template v-slot:[`item.opsi`]="{ item }">
                    <router-link style="text-decoration: none" :to="'/users/'+item.id">
                    <v-btn   outlined small color="green lighten-1">
                       <v-icon>mdi-account</v-icon> Detail User</v-btn>
                    </router-link>
                </template></v-data-table>
    </v-card>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Home',
  data() {
    return {
      chip: true,
      search: '',
      headers: [
        { text: 'ID', align: 'start', sortable: false, value: 'id'},
        { text: 'Username', value: 'username' },
        { text: 'Nama', value: 'nama' },
        { text: 'Opsi', value: 'opsi'}
      ],
      list: [],
    }
  },
  mounted () {
    let config={
        headers:{
            token:sessionStorage.getItem('token')
        }
    }
    axios
      // .get('http://localhost:2727/public/api/all_users')
      .get('http://182.255.0.149/API_Tambak/public/api/all_users', config)
      .then(response => {
        this.list = response.data.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
}
</script>
