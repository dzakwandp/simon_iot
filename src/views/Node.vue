<template>
  <div id="node">
      <v-card class="ma-4" flat>
        <v-tabs v-model="tab" color="green lighten-1">
          <v-tab v-for="item in head" :key="item">
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.text }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="mt-6">
          <v-tab-item v-for="item in head" :key="item">
            <template  v-if="item.kode=='rekap'">
              <rekap></rekap>
            </template>
            <template v-if="item.kode=='tambah'">
              <tambah></tambah>
            </template>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
  </div>
</template>

<script>
// import axios from "axios";
import Rekap from './Node/RekapNode.vue'
import Tambah from './Node/TambahNode.vue'

// import Fragment from 'vue-fragment'
// import Vue from 'vue'
// Vue.use(Fragment.Plugin)

export default {
  components: {
    'rekap': Rekap,
    'tambah': Tambah,
  },
  data() {
    return {
      tab: null,
      head: [
        { icon: 'mdi-graph', text: 'Daftar Tambak', kode: 'rekap' },
        { icon: 'mdi-plus', text: 'Tambah Tambak', kode: 'tambah' },
      ]
    }
  }
}
</script>