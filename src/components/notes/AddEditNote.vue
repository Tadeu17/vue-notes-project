<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea :value="modelValue" ref="textareaRef" class="textarea" placeholder="Add a new note"
          @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" @keydown="handleKeydown"
          @keyup.enter.exact="handleKeyUp" />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, useTemplateRef } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

const notesStore = useStoreNotes()

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])

const textAreaRef = useTemplateRef('textareaRef') as Ref<HTMLTextAreaElement | null>

const focusTextarea = () => {
  textAreaRef.value?.focus()
}

defineExpose({ focusTextarea })

const handleKeydown = (event: KeyboardEvent) => {
  // Prevent adding a line break and character when Enter is pressed without Shift
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // Prevents the default behavior of adding a line break
  }
};

const handleKeyUp = () => {
  if (props.modelValue) {
    notesStore.addNote(props.modelValue)
    focusTextarea()
  }
}
</script>

<style scoped></style>
