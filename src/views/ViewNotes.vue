<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add a new note" @textarea:keyup="addNote">
      <template #buttons>
        <button class="button is-link has-background-success" :disabled="!newNote" @click="addNote">
          Add new note
        </button>
      </template>
    </AddEditNote>

    <progress v-if="!notesLoaded" class="progress is-large is-success" max="100" />

    <template v-else>
      <Note class="mb-4" :note="note" v-for="note in notes" :key="note.id" />

      <div v-if="!notes.length" class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        No notes created yet
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import Note from '@/components/notes/TheNote.vue';
import AddEditNote from '@/components/notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters';
import { storeToRefs } from 'pinia';

type AddEditNoteType = InstanceType<typeof AddEditNote>
const notesStore = useStoreNotes()
const { notes, notesLoaded } = storeToRefs(notesStore)

const newNote = ref('')
const addEditNoteRef = useTemplateRef<AddEditNoteType>('addEditNoteRef')

const addNote = () => {
  if (!(newNote.value.length > 0)) return

  notesStore.addNote(newNote.value)

  newNote.value = ''
  addEditNoteRef.value?.focusTextarea()
}

useWatchCharacters(newNote)
</script>

<style scoped></style>
