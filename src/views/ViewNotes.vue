<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef">
      <template #buttons>
        <button class="button is-link has-background-success" :disabled="!newNote" @click="addNote">
          Add new note
        </button>
      </template>
    </AddEditNote>

    <Note class="mb-4" :note="note" v-for="note in notesStore.notes" :key="note.id" />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import Note from '@/components/notes/TheNote.vue';
import AddEditNote from '@/components/notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';

type AddEditNoteType = InstanceType<typeof AddEditNote>

const notesStore = useStoreNotes()

const newNote = ref('')
onMounted(() => { addEditNoteRef.value?.focusTextarea() })

const addEditNoteRef = useTemplateRef<AddEditNoteType>('addEditNoteRef')

const addNote = () => {
  if (!(newNote.value.length > 0)) return

  notesStore.addNote(newNote.value)

  newNote.value = ''

  console.log(addEditNoteRef.value);

  addEditNoteRef.value?.focusTextarea()
}
</script>

<style scoped></style>
