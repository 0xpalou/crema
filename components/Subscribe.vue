<template>
  <article class="relative">
    <h2>Subscribe</h2>
    <div class="flex py-8 gap-12">
      <input
        type="text"
        v-model="subscriptionEmail"
        class="input-landing flex-grow"
        placeholder="email address"
        :readonly="subscribed"
      />
      <div class="btn-landing" @click="subscribe">subscribe</div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Subscribe',
  data() {
    return {
      subscriptionEmail: '',
      subscribed: false,
    }
  },
  methods: {
    subscribe: async function () {
      const email = this.subscriptionEmail
      this.subscriptionEmail = 'Subscribing'
      setTimeout(() => {
        if (this.subscriptionEmail == 'Subscribing')
          this.subscriptionEmail = 'Subscribing.'
        setTimeout(() => {
          if (this.subscriptionEmail == 'Subscribing.')
            this.subscriptionEmail = 'Subscribing..'
          setTimeout(() => {
            if (this.subscriptionEmail == 'Subscribing..')
              this.subscriptionEmail = 'Subscribing...'
          }, 600)
        }, 600)
      }, 600)
      const response = await fetch('https://api.cloudandcrema.com/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
        }),
      })
      this.subscriptionEmail = await response.text()
      if (response.status == 200 || response.status == 201) {
        this.subscribed = true
      } else if (response.status > 201) {
        setTimeout(() => {
          this.subscriptionEmail = ''
        }, 1200)
      }
    },
  },
})
</script>

<style lang="css" scoped></style>
