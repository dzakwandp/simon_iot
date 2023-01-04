<template>
  <div>
    <v-text-field
      color="green lighten-1"
      :value="info.id"
      label="id"
      readonly
    ></v-text-field>
    <v-text-field
      color="green lighten-1"
      :value="info.name"
      label="Nama"
      readonly
    ></v-text-field>
    <v-text-field
      color="green lighten-1"
      :value="info.desc"
      label="Deskripsi"
      readonly
    ></v-text-field>
    <v-text-field
      color="green lighten-1"
      :value="namafix"
      label="Nama Pemilik"
      readonly
    ></v-text-field>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="warning" dark v-bind="attrs" v-on="on" class="mr-4">
            Edit
          </v-btn>
        </template>
        <v-card class="green--text">
          <v-card-title>
            <span class="text-h5">Edit Info Tambak</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                color="green lighten-1"
                label="Nama"
                v-model="name"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                color="green lighten-1"
                label="Deskripsi"
                v-model="desc"
                :rules="[rules.required]"
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green lighten-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="green lighten-1" text @click="submitForm()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogdel" persistent max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="error" dark v-bind="attrs" v-on="on" class="ml-4">
            Hapus</v-btn
          >
        </template>
        <v-card class="green--text">
          <v-card-title>
            <span class="text-h5">Hapus Tambak</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <body-1>Apakah anda yakin?</body-1>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green lighten-1" text @click="dialogdel = false">
              Tidak
            </v-btn>
            <v-btn color="green lighten-1" text @click="onDelete()">
              Yakin
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import router from "@/router";
import axios from "axios";
export default {
  name: "Info",
  data() {
    return {
      config: "",
      namafix: [],
      info: [],
      users: [],
      name: "",
      desc: "",
      dialog: false,
      dialogdel: false,
      rules: {
        required: (value) => !!value || "Form ini harus diisi",
      },
    };
  },
  methods: {
    onDelete() {
      axios
        .delete(
          "http://182.255.0.149/API_Tambak/public/api/tambak/" +
            this.$route.params.id,
          this.config
        )
        .then((res) => {
          console.log(res);
          this.dialogdel = false;
          alert("Tambak berhasil dihapus");
          router.push("/node");
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    submitForm() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("desc", this.desc);
      formData.append("pH", this.info.pH);
      formData.append("Kekeruhan", this.info.Kekeruhan);
      // formData.append("Ketinggian", this.info.Ketinggian);
      formData.append("Oksigen", this.info.Oksigen);
      formData.append("TDS", this.info.TDS);
      formData.append("Suhu", this.info.Suhu);
      formData.append("_method", "PUT");

      axios
        .post(
          "http://182.255.0.149/API_Tambak/public/api/tambak/" +
            this.$route.params.id,
          formData,
          this.config
        )
        .then((res) => {
          console.log(res.data.data);
          const update = res.data.data;
          this.info.name = update.name;
          this.info.desc = update.desc;
          this.name = "";
          this.desc = "";
        })
        .catch((error) => {
          alert("Data gagal ditambahkan");
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));

      this.dialog = false;
    },
    getNama() {},
  },
  created() {
    let config = {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    };
    this.config = config;
    axios
      // .get("http://localhost:2727/public/api/tambak/" + this.$route.params.id)
      .get("http://182.255.0.149/API_Tambak/public/api/all_users", config)
      .then((response) => {
        this.users = response.data.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      // .get("http://localhost:2727/public/api/tambak/" + this.$route.params.id)
      .get(
        "http://182.255.0.149/API_Tambak/public/api/tambak/" +
          this.$route.params.id,
        config
      )
      .then((response) => {
        this.info = response.data.data;
        console.log(this.info);
        var nama = this.users
          .filter((e) => e.id === this.info.id_user)
          .map((e) => {
            return  nama=e.nama ;
          });
        this.namafix=nama
        console.log(this.namafix);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>