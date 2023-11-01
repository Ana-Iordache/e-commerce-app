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

<style>
.page_container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  margin: 2rem;
}

.form_title {
  text-align: center;
  margin-bottom: 2rem;
}
</style>
