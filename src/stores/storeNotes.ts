import { defineStore } from "pinia";
import { type Note as NoteType } from "@/components/notes/type";
import { ref } from "vue";

export const useStoreNotes = defineStore('storeNotes', () => {
  const notes = ref<NoteType[]>([{
    id: 1,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem officia enim placeat sed at ipsum sit itaque eligendi temporibus? Quia distinctio minus odit exercitationem soluta ipsa nulla accusamus architecto illum!'
  }, {
    id: 2,
    content: 'shorter note'
  }])

  const addNote = (newNote: string) => {
    if (!(newNote.length > 0)) return

    notes.value.unshift({
      id: +(new Date().getTime().toString()),
      content: newNote
    })
  }

  const deleteNote = (id: NoteType['id']) => {
    const indexToDelete = notes.value.findIndex((note) => {
      return note.id === id
    })
    console.log(id, indexToDelete, notes.value[indexToDelete]);

    if (indexToDelete !== -1) {
      console.log('inside');

      notes.value.splice(indexToDelete, 1);
    }
    console.log(notes);

  }

  return {
    notes,
    addNote,
    deleteNote
  }
})
