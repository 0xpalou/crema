<script setup lang="ts">
import { links, getPost } from '@/components/posts'
const { data: posts, pending } = await useAsyncData('posts', () => {})
</script>

<template>
  <div id="app">
    <div id="page" class="bg-paper" :style="{ height: 'calc(100vh - 16px)' }">
      <header>
        <!-- Navigation -->
        <Navbar />
        <!-- Heading -->
        <h1 class="font-light mb-0">Cloud & Crema</h1>
        <!-- Current Time -->
        <time
          class="text-charcoal-ghost inline-block mb-8"
          :datetime="now.toISOString()"
        >
          {{ clock }}
        </time>
      </header>
      <!-- Blog Posts -->
      <Snippet :post="post" :key="i" v-for="(post, i) in posts" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '@/components/Navbar.vue'
import Snippet from '@/components/Snippet.vue'

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
  name: 'index',
  components: {
    Navbar,
    Snippet,
  },
  head: () => {
    return {
      title: 'Cloud & Crema',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A newsletter about the new and exciting goingons in the development of the internet;;; meant to be digested pleasantly over a cup of coffee',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },
  asyncData: async () => {
    return new Promise<any>((resolve) => {
      fetch('https://crema-api.palou.workers.dev/list', {
        method: 'GET',
      }).then(async (keysRes) => {
        if (keysRes.status == 200) {
          keysRes.json().then((keys) => {
            const posts: Array<any> = []
            Promise.all(
              keys.map((key: string) => {
                return new Promise<void>((finish) => {
                  fetch(`https://crema-api.palou.workers.dev/post/${key}`, {
                    method: 'GET',
                  }).then((postRes) => {
                    if (postRes.status == 200) {
                      postRes.json().then((post) => {
                        post.timestamp = new Date(post.timestamp)
                        posts.push(post)
                        finish()
                      })
                    } else
                      [
                        postRes.text().then((postError) => {
                          console.error(postError)
                          resolve(postError)
                        }),
                      ]
                  })
                })
              })
            ).then(() => {
              posts.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
              resolve({ posts })
            })
          })
        } else {
          keysRes.text().then((keysError) => {
            console.error(keysError)
            resolve(keysError)
          })
        }
      })
    })
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

<!--
<template>
  <Tutorial />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'index',
})
</script>
-->
