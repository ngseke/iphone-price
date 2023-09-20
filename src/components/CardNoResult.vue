<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="flex h-full w-full  items-center justify-center">
    <div class="card w-96 max-w-full bg-base-100 shadow-xl ">
      <div class="card-body">
        <div class="card-title">
          沒有符合的產品
        </div>
        <p>請嘗試調整篩選條件</p>
        <div class="card-actions justify-end">
          <button
            class="btn btn-primary"
            type="button"
            @click="$emit('reset')"
          >
            <FontAwesomeIcon :icon="['fas', 'rotate-left']" />
            重置篩選條件
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
