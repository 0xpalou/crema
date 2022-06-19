<template lang="html">
  <div id="app">
    <div id="page" class="bg-paper" :style="{ height: 'calc(100vh - 16px)' }">
      <Navbar />
      <header>
        <h1 class="font-light mb-0">Newsletter</h1>
        <address
          class="text-small text-charcoal-ghost inline-block mb-8 cursor-pointer underline hover:text-charcoal"
          @click="connect"
        >
          {{ address.length > 0 ? address : 'connect' }}
        </address>
      </header>
      <!-- For the Owner -->
      <div class="flex w-full gap-16 items-end" v-if="owner">
        <input
          type="text"
          v-model="mirror"
          class="border-b border-charcoal flex-grow bg-none outline-none font-machine"
          placeholder="mirror"
        />
        <a
          v-if="!preview"
          class="text-small text-charcoal-ghost hover:text-charcoal cursor-pointer font-machine"
          @click="getPost"
        >
          submit
        </a>
        <a
          :href="'data:' + data"
          v-if="preview"
          :download="preview.metadata_id + '.json'"
          class="text-small text-charcoal-ghost hover:text-charcoal cursor-pointer font-machine"
        >
          download
        </a>
      </div>
      <!-- Publish -->
      <div class="flex w-full gap-16 items-end" v-if="owner">
        <input
          type="text"
          v-model="contentURI"
          class="border-b border-charcoal flex-grow bg-none outline-none font-machine"
          placeholder="content uri"
        />
        <a
          @click="publish"
          class="text-small text-charcoal-ghost hover:text-charcoal cursor-pointer font-machine"
        >
          publish
        </a>
      </div>
      <!-- Publish Result -->
      <div class="">
        <span class="font-bold" v-if="published">Transaction Hash:</span>
        <a :href="`https://polygonscan.com/tx/${tx.hash}`" v-if="published">{{
          tx.hash.substr(0, 5) +
          ' ... ' +
          tx.hash.substr(tx.hash.length - 3, tx.hash.length)
        }}</a>
        <br v-if="published" />
        <span class="font-bold">Indexed:</span>
        <a href="https://lenster.xyz/u/palou.lens">{{ checkIndex }}</a>
      </div>
      <!-- Check Indexing -->
      <div class="" v-if="owner">
        <div class="flex w-full gap-16 items-end">
          <input
            type="text"
            v-model="txHash"
            class="border-b border-charcoal flex-grow bg-none outline-none font-machine"
            placeholder="transaction hash"
          />
          <a
            @click="checkTransaction"
            class="text-small text-charcoal-ghost hover:text-charcoal cursor-pointer font-machine"
          >
            check
          </a>
        </div>
      </div>

      <!-- Snippet -->
      <article class="border-b border-charcoal-ghost" v-if="preview">
        <div
          class="flex border-t-2 border-t-charcoal border-b border-b-charcoal-ghost items-center jusitfy-between py-8 my-16"
        >
          <a
            class="flex-grow snippet-title font-underground"
            :style="{ margin: '0' }"
          >
            {{ preview.name }}
          </a>
        </div>

        <img :src="preview.image" alt="" class="my-16 cover" />
        <section class="content">
          {{ preview.description }}
        </section>
      </article>

      <article
        v-if="preview"
        class="my-16"
        v-html="content(preview.content)"
        :style="{ width: '100%' }"
      ></article>

      <!-- For Subscribers -->
      <article
        class="my-16 cover border-t-2 border-charcoal pt-8"
        v-if="!owner"
      >
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

<script lang="js">
import Vue from 'vue'
import { marked } from 'marked'
import { initLens } from '@/scripts/lens'
import login from '@/scripts/auth'
import post from '@/scripts/post'
import indexer from "@/scripts/indexer"
import { initProvider, getAddress } from '@/scripts/ethers'
import Navbar from '@/components/Navbar.vue'
import Snippet from '@/components/Snippet.vue'

export default Vue.extend({
  name: 'cafe',
  components: {
    Navbar,
    Snippet,
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
      accessToken: '',
      mirror: '',
      preview: null,
      data: '',
      contentURI: '',
      owner: false,
      published: false,
      tx: {},
      indexed: false,
      txHash: "",
      checkIndex: false,
    }
  },
  mounted: async function () {
    await initProvider()
    await initLens()
  },
  methods: {
    connect: function () {
      login().then((result) => {
        this.address = result.address
        this.accessToken = result.accessToken
        this.owner = this.address == '0x38a8f75c83273885c26cd1c0e82b08a89d1a38b9'
      })
    },
    trackIndexer: async function() {
      await this.tx.wait();
      const result = await indexer(this.tx.hash);
      console.log(result)
      this.indexed = true;
    },
    checkTransaction: async function() {
      const result = await indexer(this.txHash);
      console.log(result)
      this.checkIndex = true;
    },
    publish: function () {
      post(this.contentURI, this.accessToken).then((result) => {
        console.log(result)
        this.published = true;
        this.tx = result;
        this.trackIndexer();
      })
    },
    getPost: function () {
      fetch('https://crema-api.palou.workers.dev/post', {
        method: 'POST',
        body: JSON.stringify({ url: this.mirror }),
      }).then((response) => {
        if (response.status == 200) {
          response.json().then((result) => {
            this.preview = result
            this.data =
              'text/json;charset=utf-8,' +
              encodeURIComponent(JSON.stringify(result))
          })
        } else {
          response.text().then((result) => {
            console.warn(result)
          })
        }
      })
    },
    content: function (content) {
      return marked(content)
    },
  },
})
</script>

<style lang="css" scoped>
address li {
  @apply border-b border-charcoal;
  list-style: none;
}
</style>
