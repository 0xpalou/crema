<template>
  <div id="app">
    <div id="page" class="bg-paper px-64 py-32">
      <header class="">
        <!-- Navigation -->
        <Navbar />
        <!-- Heading -->
        <h1 class="font-light">{{ post.title }}</h1>
        <!-- Current Time -->
        <time
          class="text-small text-charcoal-ghost inline-block my-8"
          :datetime="post.timestamp.toISOString()"
        >
          {{ _clock }}
        </time>
      </header>
      <img
        :src="post.cover"
        alt=""
        class="my-16 cover border-t-2 border-charcoal pt-8"
      />
      <article
        class="my-16"
        v-html="_content"
        :style="{ width: '100%' }"
      ></article>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import { marked } from 'marked'

export default Vue.extend({
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.snippet,
        },
        {
          name: 'og:title',
          content: this.post.title,
        },
        {
          name: 'og:url',
          content: `https://crema.pages.dev/☕/${this.post.key}`,
        },
        {
          name: 'og:description',
          content: this.post.snippet,
        },
        {
          name: 'og:image',
          content: this.post.cover,
        },
      ],
    }
  },
  asyncData: async ({ params }) => {
    return new Promise((resolve) => {
      fetch(`https://crema-api.palou.workers.dev/post/${params.slug}`, {
        method: 'GET',
      }).then((postRes) => {
        if (postRes.status == 200) {
          postRes.json().then((post) => {
            post.timestamp = new Date(post.timestamp)
            resolve({ post })
          })
        } else {
          resolve({
            post: {
              cover: '',
              title: 'error getting post',
              timestamp: new Date(),
              snippet: '',
              author: '',
              signature: '',
              content: '',
              key: '',
              mirror: '',
              'content-digest': '',
              transactionId: '',
            },
          })
        }
      })
    })
  },
  computed: {
    _content: function () {
      return marked(this.post.content)
    },
    _clock: function () {
      return `
      ${(this.post.timestamp.getMonth() + 1).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })}.${this.post.timestamp
        .getDate()
        .toLocaleString(undefined, { minimumIntegerDigits: 2 })}.${(
        this.post.timestamp.getFullYear() % 100
      ).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })}
      `
    },
  },
})
</script>

<style lang="css" scoped>
.cover {
  width: 100%;
  min-height: 30vh;
  max-height: 80vh;
  object-fit: contain;
  object-position: center;
}
</style>
