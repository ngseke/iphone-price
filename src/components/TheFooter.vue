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

const formattedBuiltAt = dayjs(BUILT_AT).format('LLL')
const commitHash = COMMIT_HASH
const commitUrl = `${githubUrl}/tree/${commitHash}`
</script>

<template>
  <footer class="footer footer-center rounded bg-base-200 p-8 text-base-content">
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
      <p class="text-xs text-base-content/80">
        上次更新：{{ formattedBuiltAt }}
        (<Link class="link" :href="commitUrl">{{ commitHash }}</Link>)
      </p>
      <p class="text-xs font-medium">
        Made with <span title="IPA">🍺</span> by
        <Link class="link" href="https://ngseke.me/">ngseke</Link>
      </p>
    </aside>
  </footer>
</template>
