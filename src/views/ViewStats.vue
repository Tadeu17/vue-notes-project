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
  </div>
</template>

<script setup lang="ts">
import { useStoreNotes } from '@/stores/storeNotes';

const notesStore = useStoreNotes()
</script>

<style scoped></style>
