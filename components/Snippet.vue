<template>
  <article class="relative">
    <div
      class="flex border-t-2 border-t-charcoal border-b border-b-charcoal-ghost items-center jusitfy-between py-8 my-16"
    >
      <NuxtLink
        :to="`/%E2%98%95/${post.id}`"
        class="flex-grow snippet-title font-underground"
        :style="{ margin: '0' }"
      >
        {{ post.metadata.name }}
      </NuxtLink>
      <time
        class="text-charcoal-ghost text-small"
        :datetime="_timestamp.toISOString()"
      >
        {{ _clock }}
      </time>
    </div>

    <img :src="post.metadata.image" alt="" class="my-16 cover" />
    <section class="content">
      {{ post.metadata.description }}
    </section>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Snippet',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    _timestamp: function () {
      return new Date(this.post.createdAt)
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
  max-height: 50vh;
  object-fit: cover;
  object-position: center;
}
</style>
