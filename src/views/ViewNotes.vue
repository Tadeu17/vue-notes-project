<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add a new note" @textarea:keyup="addNote">
      <template #buttons>
        <button class="button is-link has-background-success" :disabled="!newNote" @click="addNote">
          Add new note
        </button>
      </template>
    </AddEditNote>

    <progress v-if="!notesStore.notesLoaded" class="progress is-large is-success" max="100" />
    <template v-else>
      <Note class="mb-4" :note="note" v-for="note in notesStore.notes" :key="note.id" />

      <div v-if="!notesStore.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        No notes created yet
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import Note from '@/components/notes/TheNote.vue';
import AddEditNote from '@/components/notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters';

type AddEditNoteType = InstanceType<typeof AddEditNote>

const notesStore = useStoreNotes()

const newNote = ref('')

const addEditNoteRef = useTemplateRef<AddEditNoteType>('addEditNoteRef')

const addNote = () => {
  if (!(newNote.value.length > 0)) return

  notesStore.addNote(newNote.value)

  newNote.value = ''
  addEditNoteRef.value?.focusTextarea()
}

useWatchCharacters(newNote)

onMounted(() => {
  notesStore.getNotes()
})
</script>

<style scoped></style>
