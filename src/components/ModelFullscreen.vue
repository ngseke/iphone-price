<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { ref, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const props = defineProps<{
  modelValue?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const vModel = useVModel(props, 'modelValue', emit)

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(() => props.modelValue, (isShown) => {
  if (isShown) {
    dialogRef.value?.showModal()
  } else {
    dialogRef.value?.close()
  }
})
</script>

<template>
  <dialog ref="dialogRef" class="modal" @close="vModel = false">
    <div class="modal-box flex h-full min-h-full min-w-full flex-col sm:h-[calc(100%-4rem)] sm:min-h-[calc(100%-4rem)] sm:min-w-[calc(100%-4rem)]">
      <div class="flex justify-end">
        <form method="dialog">
          <button class="btn btn-circle text-xl" type="submit">
            <FontAwesomeIcon :icon="faXmark" />
          </button>
        </form>
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </div>
    <form class="modal-backdrop" method="dialog">
      <button type="submit">close</button>
    </form>
  </dialog>
</template>
