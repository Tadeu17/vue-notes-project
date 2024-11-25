<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h3>{{ note.id }}</h3>
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ formattedDate }}</small>
          <small class="column has-text-right">{{ characterLength }} characters</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="{ name: 'edit-note', params: { id: note.id } }" class="card-footer-item">Edit</RouterLink>
      <a href="#" class="card-footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
    </footer>

    <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id" />
  </div>
</template>

<script setup lang="ts">
import { type Note as NoteType } from './type';
import { type PropType, computed, reactive } from 'vue';
import { useDateFormat } from '@vueuse/core/index.cjs';
import ModalDeleteNote from './ModalDeleteNote.vue';

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

const modals = reactive({
  deleteNote: false
})

const formattedDate = computed(() => {
  const date = new Date(parseInt(props.note.date))

  return useDateFormat(date, 'DD-MM-YYYY @ HH:mm')
})
</script>

<style scoped></style>
