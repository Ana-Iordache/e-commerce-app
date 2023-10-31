<template>
  <v-app>
    <v-main>
      <AppHeader />
      <RouterView />
    </v-main>
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
