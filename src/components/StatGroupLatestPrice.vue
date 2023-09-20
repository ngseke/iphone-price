<script setup lang="ts">
import { computed } from 'vue'
import StatPrice from './StatPrice.vue'
import { type IphoneModel, type Iphone } from '../types/Iphone'
import { iphone15List } from '../databases/iphone15'

const list = computed(() => {
  const models: Partial<Record<IphoneModel, Iphone>> = {}

  iphone15List.forEach((iphone) => {
    if (!models[iphone.model]) {
      models[iphone.model] = iphone
    }
  })

  return Object.values(models)
})

</script>

<template>
  <ul class="flex flex-wrap gap-2 sm:gap-4">
    <li v-for="(item, index) in list" :key="index">
      <StatPrice
        :model="item.model"
        :price="item.price.twd"
        :primary="!index "
        :secondary="Boolean(index)"
        :storage="item.storage"
      />
    </li>
  </ul>
</template>
