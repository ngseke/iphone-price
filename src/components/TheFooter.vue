<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from './Link.vue'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const githubUrl = 'https://github.com/ngseke/iphone-price'

const links = [
  { name: 'GitHub', url: githubUrl },
  { name: 'Issues', url: `${githubUrl}/issues` },
]

const formattedBuiltAt = dayjs(BUILT_AT).format('YYYY/MM/DD')
const commitHash = COMMIT_HASH
const commitUrl = `${githubUrl}/tree/${commitHash}`
</script>

<template>
  <footer class="footer footer-center gap-6 rounded bg-base-200 p-8 text-base-content">
    <nav class="grid grid-flow-col gap-4">
      <Link
        class="link"
        :href="githubUrl"
      >
        <FontAwesomeIcon :icon="faGithub" />
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
    <aside>
      <p class="font-mono text-xs font-medium">
        Made with <span title="IPA">🍺</span> by
        <Link class="link" href="https://ngseke.me/">ngseke</Link>.
        Last update: {{ formattedBuiltAt }}
        (<Link class="link" :href="commitUrl">{{ commitHash }}</Link>)
      </p>
    </aside>
  </footer>
</template>
