<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDownload, faExpand } from '@fortawesome/free-solid-svg-icons'
import { useVModels } from '@vueuse/core'

const props = defineProps<{
  isFullscreenChartShown: boolean
}>()

const emit = defineEmits<{
  'update:isFullscreenChartShown': [value: boolean]
  clickDownload: []
}>()

const { isFullscreenChartShown } = useVModels(props, emit)
</script>

<template>
  <ul class="menu rounded-box menu-horizontal bg-base-200 font-medium">
    <li>
      <button
        title="展開圖表"
        type="button"
        @click="isFullscreenChartShown = true"
      >
        <FontAwesomeIcon :icon="faExpand" />
      </button>
    </li>
    <li @click="$emit('clickDownload')">
      <button
        title="下載圖表"
        type="button"
      >
        <FontAwesomeIcon :icon="faDownload" />
      </button>
    </li>
  </ul>
</template>
