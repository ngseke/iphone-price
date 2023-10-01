<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDownload, faExpand } from '@fortawesome/free-solid-svg-icons'
import { useVModels } from '@vueuse/core'

const props = defineProps<{
  isFullscreenChartShown: boolean
  downloadUrl: string | null
}>()

const emit = defineEmits<{
  'update:isFullscreenChartShown': [value: boolean]
}>()

const { isFullscreenChartShown } = useVModels(props, emit)

</script>

<template>
  <ul class="menu rounded-box menu-horizontal bg-base-200 font-medium">
    <li>
      <button type="button" @click="isFullscreenChartShown = true">
        <FontAwesomeIcon :icon="faExpand" />
      </button>
    </li>
    <li :class="{ 'disabled': !downloadUrl }">
      <a download="chart.png" :href="downloadUrl ?? 'javascript:void(0)'">
        <FontAwesomeIcon :icon="faDownload" />
      </a>
    </li>
  </ul>
</template>
