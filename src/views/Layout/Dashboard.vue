<template>
  <v-app class="grey lighten-4">
    <Navbar></Navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'Dashboard',
  components: { Navbar },
  data: () => ({
  }),
};
</script>
