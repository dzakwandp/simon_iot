<template>
  <div>
    <v-card class="ma-4 pb-6 white--text" color="grey lighten-4">
      <router-link to="/" class="text-decoration-none">
        <v-btn plain class="ml-10 mt-6">
          <v-icon>mdi-chevron-left</v-icon>
          Kembali
        </v-btn>
      </router-link>
      <v-card-title>
        <h2 class="green--text mx-auto font-weight-light">
          Akun: {{ info.nama }}
        </h2>
      </v-card-title>
      <v-text-field
        class="mx-14 mt-6"
        color="green lighten-1"
        :value="info.id"
        label="id"
        readonly
      ></v-text-field>
      <v-text-field
        class="mx-14 mt-6"
        color="green lighten-1"
        :value="info.username"
        label="Username"
        readonly
      ></v-text-field>
      <v-text-field
        class="mx-14 mt-6"
        color="green lighten-1"
        :value="info.nama"
        label="Nama Pengguna"
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
              <span class="text-h5">Edit Info Pengguna</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field
                  color="green lighten-1"
                  label="Username"
                  v-model="username"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  color="green lighten-1"
                  label="Nama"
                  v-model="nama"
                  :rules="[rules.required]"
                ></v-text-field>
                <!-- <v-text-field
                  color="green lighten-1"
                  label="Password"
                  v-model="password"
                  :rules="[rules.required]"
                ></v-text-field> -->
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
        <v-dialog v-model="dialogres" persistent max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mx-4">
              Reset Password</v-btn
            >
          </template>
          <v-card class="green--text">
            <v-card-title>
              <span class="text-h5">Reset Password</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <body-1>Apakah anda yakin?</body-1>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green lighten-1" text @click="dialogres = false">
                Tidak
              </v-btn>
              <v-btn color="green lighten-1" text @click="resetPass()">
                Yakin
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
              <span class="text-h5">Hapus Pengguna</span>
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
    </v-card>
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
      pass: "pass",
      info: [],
      username: "",
      name: "",
      password: "",
      dialog: false,
      dialogdel: false,
      dialogres: false,
      rules: {
        required: (value) => !!value || "Form ini harus diisi",
      },
    };
  },
  methods: {
    onDelete() {
      axios
        .delete(
          "http://182.255.0.149/API_Tambak/public/api/destroyUser/" +
            this.$route.params.id,
          this.config
        )
        .then((res) => {
          console.log(res);
          this.dialogdel = false;
          alert("Pengguna berhasil dihapus");
          router.push("/");
        })
        .catch((error) => {
          alert("Pengguna gagal dihapus");
          console.log(error);
          this.errored = true;
        });
    },
    resetPass() {
      let formPass = new FormData();
      formPass.append("username", this.info.username);
      formPass.append("nama", this.info.nama);
      formPass.append("password", this.pass);
      formPass.append("_method", "POST");

      axios
        .post(
          "http://182.255.0.149/API_Tambak/public/api/user/" +
            this.$route.params.id,
          formPass,
          this.config
        )
        .then(() => {
          alert("Password berhasil di reset!");
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialogres = false;
    },
    submitForm() {
      let formData = new FormData();
      formData.append("username", this.username);
      formData.append("nama", this.nama);
      // formData.append("password", this.password);
      formData.append("_method", "POST");

      axios
        .post(
          "http://182.255.0.149/API_Tambak/public/api/user/" +
            this.$route.params.id,
          formData,
          this.config
        )
        .then((res) => {
          console.log(res.data.data);
          const update = res.data.data;
          this.info.username = update.username;
          this.info.nama = update.nama;
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
      .get(
        "http://182.255.0.149/API_Tambak/public/api/user/" +
          this.$route.params.id,
        config
      )
      .then((response) => {
        this.info = response.data.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>