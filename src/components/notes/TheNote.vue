<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h3>{{ note.id }}</h3>
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2"><small>{{ characterLength }} characters</small></div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item" @click.prevent="notesStore.deleteNote(note.id)">Delete</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { type Note as NoteType } from './type';
import { type PropType, computed } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';

const notesStore = useStoreNotes()

const props = defineProps({
  note: {
    type: Object as PropType<NoteType>,
    required: true
  }
});


const characterLength = computed(() => {
  const len = props.note.content.length
  return `${len} ${len > 1 ? 'characters' : 'character'}`
})
</script>

<style scoped></style>
