<template>
  <v-app>
   <AppHeader/>
   <RouterView/>
  </v-app>
</template>

<script>

import AppHeader from "@/components/AppHeader.vue"
export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
    }
  },
}
</script>

<style></style>
