<script setup lang="ts">
import { computed } from 'vue'
import StatPrice from './StatPrice.vue'
import { type IphoneModel, type Iphone } from '../types/Iphone'
import { iphone16List } from '../databases/iphone16'
import { iphone16eList } from '../databases/iphone16e'

const list = computed(() => {
  const models: Partial<Record<IphoneModel, Iphone>> = {}

  ;[...iphone16eList, ...iphone16List].forEach((iphone) => {
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
        :primary="index === 0"
        :secondary="index !== 0"
        :storage="item.storage"
      />
    </li>
  </ul>
</template>
