<script setup lang="ts">
import { type IphoneModel } from '../types/Iphone'
import { type StorageSize } from '../types/StorageSize'
import { formatStorageSize } from '../modules/storageSize'
import { formatIphoneModel } from '../modules/iphoneModel'
import { formatPrice } from '../modules/price'

const props = defineProps<{
  model: IphoneModel
  price: number
  storage: StorageSize

  primary?: boolean
  secondary?: boolean
  accent?: boolean
}>()
</script>

<template>
  <div class="stats shadow">
    <div class="stat px-4 py-2 sm:px-6 sm:py-4">
      <div class="stat-title">
        {{ formatIphoneModel(props.model) }}
      </div>

      <div
        class="stat-value font-rubik text-2xl font-bold sm:text-4xl"
        :class="{
          'text-primary': primary,
          'text-secondary': secondary,
          'text-accent': accent,
        }"
      >
        <span class="align-top text-2xl">$</span>{{ formatPrice(props.price) }}
      </div>

      <div class="stat-desc">
        {{ formatStorageSize(props.storage) }}
      </div>
    </div>
  </div>
</template>
