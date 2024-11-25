import { defineStore } from "pinia";
import { type Note as NoteType } from "@/components/notes/type";
import { ref } from "vue";
import { db } from "@/plugins/firebase";
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from "firebase/firestore";

const notesCollection = collection(db, 'notes')
const notesCollectionQuery = query(notesCollection, orderBy('date', 'desc'))

export const useStoreNotes = defineStore('storeNotes', () => {
  const notes = ref<NoteType[]>([])
  const notesLoaded = ref(false)

  const getNotes = () => {
    notesLoaded.value = false

    onSnapshot(notesCollectionQuery, (sc) => {
      notes.value = []

      const newNotes: NoteType[] = []

      sc.docs.forEach(doc => {
        newNotes.push({
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date
        })
      });

      // setTimeout(() => {
      //   notes.value = newNotes
      //   notesLoaded.value = true
      // }, 2000)

      notes.value = newNotes
      notesLoaded.value = true
    });
  }

  const addNote = async (newNote: string) => {
    if (!(newNote.length > 0)) throw new Error('Wrong note text provided')

    await addDoc(notesCollection, {
      content: newNote,
      date: new Date().getTime().toString()
    })
  }

  const editNote = async (id: number, content: string) => {
    if (!(content.length > 0) || !id || id < 1) throw new Error(`Either wrong content provided or ID ${id} is invalid`)

    try {
      await updateDoc(doc(notesCollection, id.toString()), {
        content
      })
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }

  const deleteNote = async (id: NoteType['id']) => {
    if (!id || id.length < 1) throw new Error(`ID ${id} is invalid`)

    try {
      await deleteDoc(doc(notesCollection, id.toString()))
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : String(error))
    }
  }

  const getNoteContent = (noteId: string): string => {
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
    notesLoaded,
    getNotes,
    addNote,
    editNote,
    deleteNote,
    getNoteContent,
    totalNotesCount,
    totalCharactersCount
  }
})
