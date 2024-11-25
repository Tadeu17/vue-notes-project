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

  const editNote = (id: number, content: string) => {
    if (!(content.length > 0) || !id || id < 1) return

    const note = notes.value.find((note) => note.id === id)

    if (!note) {
      console.warn('No note found with id ', id);
      return
    }

    note.content = content
  }

  const deleteNote = (id: NoteType['id']) => {
    const indexToDelete = notes.value.findIndex((note) => {
      return note.id === id
    })

    if (indexToDelete !== -1) {
      notes.value.splice(indexToDelete, 1);
    } else {
      console.warn('Did not find the note');

    }
  }

  const getNoteContent = (noteId: number): string => {
    const note = notes.value.find((note) => note.id === noteId)!

    return note.content
  }

  const totalNotesCount = () => notes.value.length

  const totalCharactersCount = () => {
    let count: number = 0

    notes.value.forEach(note => {
      count += note.content.length
    });

    return count
  }


  return {
    notes,
    addNote,
    editNote,
    deleteNote,
    getNoteContent,
    totalNotesCount,
    totalCharactersCount
  }
})
