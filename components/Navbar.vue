<template>
  <nav class="flex justify-center gap-12 my-8">
    <nuxt-link to="/" class="nav-item"> Index </nuxt-link>

    <a href="https://labs.tryvelocity.xyz" class="nav-item">Lab</a>
    <nuxt-link to="/newsletter" class="nav-item"> Newsletter </nuxt-link>
    <a href="https://vienna.earth/plate/palou/library" class="nav-item"
      >library</a
    >
    <nuxt-link to="/cafe" class="nav-item"> Cafe </nuxt-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navbar',
})
</script>

<style lang="css" scoped></style>
