<template>
  <div id="app">
    <div id="page" class="bg-paper" :style="{ height: 'calc(100vh - 16px)' }">
      <Navbar />
      <header>
        <h1 class="font-light mb-0">Cafe</h1>
        <time
          class="text-small text-charcoal-ghost inline-block mb-8"
          :datetime="now.toISOString()"
        >
          {{ clock }}
        </time>
      </header>
      <article class="my-16 cover border-t-2 border-charcoal pt-8">
        gallery
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '@/components/Navbar.vue'

const formatClock = function (now: Date) {
  return `
  ${(now.getMonth() + 1).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  })}.${now
    .getDate()
    .toLocaleString(undefined, { minimumIntegerDigits: 2 })}.${(
    now.getFullYear() % 100
  ).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  })}
  ${now.getHours().toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  })}:${now.getMinutes().toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  })}:${now.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 })}
  `
}

export default Vue.extend({
  name: 'cafe',
  components: {
    Navbar,
  },
  head() {
    return {
      title: 'The Cloud Cafe',
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
      now: new Date(),
      interval: null as any,
      clock: formatClock(new Date()),
    }
  },
  mounted: function () {
    this.interval = setInterval(() => {
      this.now = new Date()
    }, 500)
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
  },
  watch: {
    now: function (newTime) {
      this.clock = formatClock(newTime)
    },
  },
})
</script>

<style lang="css" scoped></style>
