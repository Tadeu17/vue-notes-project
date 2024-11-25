<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <label v-if="label" class="label has-text-white">{{ label }}</label>

    <div class="field">
      <div class="control">
        <textarea :value="modelValue" ref="textareaRef" class="textarea" :placeholder="placeholder" v-autofocus
          maxlength="100" @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
          @keydown="handleKeydown" @keyup.enter.exact="$emit('textarea:keyup')" />
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
import { vAutofocus } from '@/directives/vAutofocus';

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'Type something...'
  },
  label: {
    type: String
  }
})

defineEmits(['update:modelValue', 'textarea:keyup'])

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
</script>

<style scoped></style>
