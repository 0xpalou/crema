<template>
  <nav class="flex justify-center mb-32 font-underground text-h3">
    <nuxt-link to="/" class="nav-item"> Index </nuxt-link>
    <nuxt-link to="/cafe" class="nav-item"> Cafe </nuxt-link>
    <a href="https://labs.tryvelocity.xyz" class="nav-item">Lab</a>
    <nuxt-link to="/newsletter" class="nav-item"> Newsletter </nuxt-link>
    <a href="https://vienna.earth/plate/palou/library" class="nav-item"
      >library</a
    >
    <a href="https://lenster.xyz/u/palou.lens" class="nav-item">lens</a>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navbar',
})
</script>

<style lang="css" scoped></style>
