<template lang="html">
  <div id="app">
    <div id="page" class="bg-paper" :style="{ height: 'calc(100vh - 16px)' }">
      <Navbar />
      <header>
        <h1 class="font-light mb-0">Newsletter</h1>
        <address
          class="text-small text-charcoal-ghost inline-block mb-8 cursor-pointer underline hover:text-charcoal"
        >
          {{ address.length > 0 ? address : 'connect' }}
        </address>
      </header>
      <article class="my-16 cover border-t-2 border-charcoal pt-8">
        <div class="flex justify-between items-start">
          <address class="text-small">
            <li>palou.eth</li>
            <li>Cloud & Crema</li>
            <li>San Francisco, CA</li>
          </address>
          <img
            src="@/assets/stamp.png"
            alt=""
            :style="{
              width: '75px',
              height: '75px',
              'object-fit': 'contain',
              margin: '0',
            }"
          />
        </div>
        <h2 class="text-center my-32">coming soon 🚠</h2>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '@/components/Navbar.vue'

export default Vue.extend({
  name: 'cafe',
  components: {
    Navbar,
  },
  head() {
    return {
      title: 'Newsletter',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A newsletter about the new and exciting goingons in the development of the internet;;; meant to be digested pleasantly over a cup of coffee',
        },
      ],
    }
  },
  data: () => {
    return {
      address: '',
    }
  },
})
</script>

<style lang="css" scoped>
address li {
  @apply border-b;
  list-style: none;
}
</style>
