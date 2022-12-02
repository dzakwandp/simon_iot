<template>
    <div>
        <v-card class="ma-4 mb-10 white--text" color="green lighten-1">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field dark v-model="search" append-icon="mdi-magnify" label="Cari" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="node" :search="search">
                <template v-slot:[`item.opsi`]="{ item }">
                    <router-link style="text-decoration: none" :to="'/detailnode/'+item.id">
                    <v-btn   outlined small color="green lighten-1">
                       <v-icon>mdi-file-tree</v-icon> Detail Tambak</v-btn>
                    </router-link>
                </template>
            </v-data-table>
        </v-card>
        <v-spacer></v-spacer>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Rekap',
    data() {
        return {
            search: '',
            headers: [
                { text: 'Nama', value: 'name' },
                { text: 'Opsi', value: 'opsi' },
            ],
            node: [],
        }
    },
  mounted () {
    let config={
        headers:{
            token:sessionStorage.getItem('token')
        }
    }
    axios
      // .get('http://localhost:2727/public/api/tambak')
      .get('http://182.255.0.149/API_Tambak/public/api/tambak',config)
      .then(response => {
        this.node = response.data.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },
}
</script>