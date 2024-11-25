<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea v-model="newNote" ref="newNoteTextarea" class="textarea" placeholder="Add a new note"
            @keydown="handleKeydown" @keyup.enter.exact="newNote && addNote()" />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-link has-background-success" :disabled="!newNote" @click="addNote">
            Add new note
          </button>
        </div>
      </div>
    </div>

    <Note class="mb-4" :note="note" v-for="note in notesStore.notes" :key="note.id" />
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, useTemplateRef } from 'vue'
import Note from '@/components/notes/TheNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';

const notesStore = useStoreNotes()

const newNote = ref('')
const textAreaRef = useTemplateRef('newNoteTextarea') as Ref<HTMLTextAreaElement | null>

const handleKeydown = (event: KeyboardEvent) => {
  // Prevent adding a line break and character when Enter is pressed without Shift
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault(); // Prevents the default behavior of adding a line break
  }
};

const addNote = () => {
  if (!(newNote.value.length > 0)) return

  notesStore.addNote(newNote.value)

  newNote.value = ''
  textAreaRef.value?.focus()
}
</script>

<style scoped></style>
