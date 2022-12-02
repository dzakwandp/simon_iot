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
      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-data-table :headers="headers" :items="list" :search="search">
        <template v-slot:[`item.opsi`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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
      dialog: false,
      dialogDelete: false,
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
  methods:{
    editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
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
