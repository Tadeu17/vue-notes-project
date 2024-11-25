<template>
  <div class="edit-note">
    <AddEditNote v-model="noteContent" ref="addEditNoteRef" bgColor="link" label="Edit note" placeholder="Edit note"
      @textarea:keyup="editNote">
      <template #buttons>
        <button class="button is-link is-light mr-3" @click="$router.back()">
          Cancel
        </button>
        <button class="button is-link has-background-link" :disabled="!noteContent" @click="editNote">
          Save edited note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup lang="ts">
import AddEditNote from '@/components/notes/AddEditNote.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { ref, onMounted, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const notesStore = useStoreNotes()
const route = useRoute()
const router = useRouter()

const noteContent = ref('')
const noteId = route.params.id as string

noteContent.value = notesStore.getNoteContent(noteId)

const editNote = () => {
  if (!(noteContent.value.length > 0)) return

  notesStore.editNote(+route.params.id, noteContent.value)

  router.push({ name: 'notes' })
}

type AddEditNoteType = InstanceType<typeof AddEditNote>
const addEditNoteRef = useTemplateRef<AddEditNoteType>('addEditNoteRef')

onMounted(() => {
  addEditNoteRef.value?.focusTextarea()
})
</script>

<style scoped></style>
