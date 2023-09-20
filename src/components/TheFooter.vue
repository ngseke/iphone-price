<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Link from './Link.vue'

const githubUrl = 'https://github.com/ngseke/iphone-price'

const links = [
  { name: 'GitHub', url: githubUrl },
  { name: 'Issues', url: 'https://github.com/ngseke/iphone-price/issues' },
]
</script>

<template>
  <footer class="footer footer-center rounded bg-base-200 p-8 text-base-content">
    <nav class="grid grid-flow-col gap-4">
      <Link
        class="link"
        :href="githubUrl"
      >
        <FontAwesomeIcon :icon="['fab', 'github']" />
      </Link>
      <Link
        v-for="(link, index) in links"
        :key="index"
        class="link"
        :href="link.url"
      >
        {{ link.name }}
      </Link>
    </nav>
    <aside class="grid-flow-col items-center">
      <p class="text-xs">
        Made with <span title="IPA">🍺</span> by
        <Link class="link" href="https://ngseke.me/">ngseke</Link>
      </p>
    </aside>
  </footer>
</template>
