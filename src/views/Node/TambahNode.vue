<template>
  <div>
    <v-card class="ma-4 white--text" color="grey lighten-4">
      <v-card-title class="mx-auto">
        <h2 class="green--text mx-12 mt-6 font-weight-light text-center">
          Form Tambah Tambak
        </h2>
      </v-card-title>
      <form>
        <v-card class="mx-16 my-6 px-12 py-6">
          <v-select
            v-model="select"
            :items="userData"
            item-text="nama"
            :error-messages="errors"
            label="Pilih Pemilik"
            return-object
          ></v-select>
          <v-text-field
            v-model="name"
            label="Nama Tambak"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="desc"
            label="Deskripsi"
            :rules="[rules.required]"
          ></v-text-field>
        </v-card>
        <v-btn
          class="ml-16 mr-4 mb-6"
          color="green lighten-1"
          dark
          @click="onSubmit()"
        >
          submit
        </v-btn>
        <v-btn class="mb-6" color="red lighten-1" dark @click="onClear()">
          clear
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/router';
// import router from '@/router';
export default {
  data() {
    return {
      config: "",
      select: null,
      userData: [],
      name: "",
      desc: "",
      pH: "1",
      Kekeruhan: "1",
      Ketinggian: "1",
      Oksigen: "1",
      TDS: "1",
      Suhu: "1",
      rules: {
        required: (value) => !!value || "Form ini harus diisi",
      },
    };
  },
  methods: {
    // fetchTambak(){
    //   axios.get('http://182.255.0.149/API_Tambak/public/api/tambak',this.config)
    //   .then(response => {
    //     this.nodes = response.data.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.errored = true
    //   })
    //   .finally(() => this.loading = false)
    // },
    onSubmit() {
      let newData = new FormData();
      newData.append("name", this.name);
      newData.append("desc", this.desc);
      newData.append("pH", this.pH);
      newData.append("Suhu", this.Suhu);
      newData.append("TDS", this.TDS);
      // newData.append("Ketinggian", this.Ketinggian);
      newData.append("Oksigen", this.Oksigen);
      newData.append("Kekeruhan", this.Kekeruhan);
      newData.append("id_user", this.select.id);
      newData.append("_method", "POST");
      axios
        .post(
          "http://182.255.0.149/API_Tambak/public/api/tambak",
          newData,
          this.config
        )
        .then((res) => {
          console.log(res);
          alert("Tambak berhasil dibuat!");
          router.go(0)
        })
        .catch((error) => {
          console.log(error);
          alert("Tambak gagal ditambahkan")
        });
    },
    onClear() {
      (this.select = null), (this.name = ""), (this.desc = "");
    },
  },
  mounted() {
    let config = {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };
    this.config = config;
    axios
      .get("http://182.255.0.149/API_Tambak/public/api/all_users", config)
      .then((resource) => {
        this.userData = resource.data.data;
        // this.userData=getUserData.map(item=>item.nama)
        // console.log(this.userData)
        // console.log(resource)
      });
  },
};
</script>