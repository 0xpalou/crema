<template>
  <div id="app">
    <div id="page" class="bg-paper" :style="{ height: 'calc(100vh - 16px)' }">
      <header class="">
        <!-- Navigation -->
        <Navbar />
        <!-- Heading -->
        <h1 class="font-light mb-0">{{ publication.metadata.name }}</h1>
        <!-- Current Time -->
        <time
          class="text-charcoal-ghost inline-block mb-8"
          :datetime="_timestamp"
        >
          {{ _clock }}
        </time>
      </header>
      <img
        :src="publication.metadata.image"
        alt=""
        class="my-16 cover border-t-2 border-charcoal pt-16"
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
import get from "@/scripts/get"

export default Vue.extend({
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
  width: 100%;
  min-height: 30vh;
  max-height: 80vh;
  object-fit: contain;
  object-position: center;
}
</style>
