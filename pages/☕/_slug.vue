<template>
  <div id="app">
    <div id="page" class="bg-paper">
      <!-- Navigation -->
      <Navbar />
      <header>
        <!-- Heading -->
        <h1 class="font-light">{{ publication.metadata.name }}</h1>
        <!-- Current Time -->
        <time class="text-ash inline-block" :datetime="_timestamp">
          {{ _clock }}
        </time>
      </header>
      <article>
        <img :src="publication.metadata.image" alt="" class="cover" />
        <section v-html="_content"></section>
      </article>
      <Subscribe />
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import Subscribe from "@/components/Subscribe.vue"
import { marked } from 'marked'
import get from "@/scripts/get"

export default Vue.extend({
  components: {
    Subscribe
  },
  head() {
    return {
      title: this.publication.metadata.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.publication.metadata.description,
        },
        {
          name: 'og:title',
          content: this.publication.metadata.name,
        },
        {
          name: 'og:url',
          content: `https://crema.pages.dev/☕/${this.publication.id}`,
        },
        {
          name: 'og:description',
          content: this.publication.metadata.description,
        },
        {
          name: 'og:image',
          content: this.publication.metadata.image,
        },
      ],
    }
  },
  asyncData: async function({ params }) {
    const publication = (await get(params.slug)).data.publication;
    return { publication }
  },
  computed: {
    _content: function () {
      return marked(this.publication.metadata.content)
    },
    _timestamp: function () {
      return new Date(this.publication.createdAt)
    },
    _clock: function () {
      return `
      ${(this._timestamp.getMonth() + 1).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })}.${this._timestamp
        .getDate()
        .toLocaleString(undefined, { minimumIntegerDigits: 2 })}.${(
        this._timestamp.getFullYear() % 100
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
  max-height: 60ch;
}
</style>
