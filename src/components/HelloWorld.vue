<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-icon icon="mdi-home" />
    <v-btn>Vuetify button</v-btn>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped></style>
