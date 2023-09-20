<script setup lang="ts">
import Link from './Link.vue'

const list = [
  { name: 'Apple (台灣)', url: 'https://www.apple.com/tw/' },
  { name: 'Timeline of iPhone models - 維基百科', url: 'https://zh.wikipedia.org/wiki/Template:Timeline_of_iPhone_models' },
  { name: '中華民國基本工資 - 維基百科', url: 'https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E5%9F%BA%E6%9C%AC%E5%B7%A5%E8%B3%87' },
]
</script>

<template>
  <div class="collapse-plus collapse bg-base-200">
    <input type="checkbox">
    <div class="collapse-title text-lg font-medium">
      資料來源
    </div>

    <div class="collapse-content">
      <div class="prose">
        <ol>
          <li v-for="(item, index) in list" :key="index">
            <Link :href="item.url"> {{ item.name }} </Link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
