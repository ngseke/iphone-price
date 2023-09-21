<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useDark } from '../composables/useDark'

const isDark = useDark()
</script>

<template>
  <div
    class="sm:tooltip sm:tooltip-left"
    :data-tip="`切換至${isDark ? '淺色模式' : '深色模式'}`"
  >
    <button
      class="btn btn-circle btn-neutral text-xl"
      type="button"
      @click="isDark = !isDark"
    >
      <FontAwesomeIcon v-if="isDark" :icon="['fas', 'sun']" />
      <FontAwesomeIcon v-else :icon="['fas', 'moon']" />
    </button>
  </div>
</template>
