<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef" role="dialog" aria-labelledby="modal-title"
      aria-describedby="modal-body">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>

      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>

      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="closeModal">Cancel</button>
        <button class="button is-danger" @click="notesStore.deleteNote(noteId)">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStoreNotes } from '@/stores/storeNotes';
import { onClickOutside, useEventListener } from '@vueuse/core';
import { ref } from 'vue';

// --------- Props and Emits
interface Props {
  modelValue: boolean,
  noteId: string
}
defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

// --------- Store and Ref
const notesStore = useStoreNotes()
const modalCardRef = ref<HTMLElement | null>(null);

// --------- Methods
const closeModal = () => {
  emit('update:modelValue', false)
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

// --------- Lifecycle and Listeners
useEventListener('keyup', handleEscapeKey);
onClickOutside(modalCardRef, closeModal)
</script>

<style scoped></style>
