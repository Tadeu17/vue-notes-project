<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>stat</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>number of notes</td>
          <td>{{ notesStore.totalNotesCount() }}</td>
        </tr>
        <tr>
          <td>number of characters (of all notes)</td>
          <td>{{ notesStore.totalCharactersCount() }}</td>
        </tr>
      </tbody>
    </table>

    <input v-model="inputText" class="input" type="text" placeholder="Do you like this app?" v-autofocus>
  </div>
</template>

<script setup lang="ts">
import { vAutofocus } from '@/directives/vAutofocus';
import { useStoreNotes } from '@/stores/storeNotes';
import { useWatchCharacters } from '@/use/useWatchCharacters';
import { ref } from 'vue';

const notesStore = useStoreNotes()

const inputText = ref('')

useWatchCharacters(inputText, 50)
</script>

<style scoped></style>
