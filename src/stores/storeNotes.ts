import { defineStore } from "pinia";
import { type Note as NoteType } from "@/components/notes/type";

export const useStoreNotes = defineStore('storeNotes', () => {
  const notes = <NoteType[]>[{
    id: 1,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem officia enim placeat sed at ipsum sit itaque eligendi temporibus? Quia distinctio minus odit exercitationem soluta ipsa nulla accusamus architecto illum!'
  }, {
    id: 2,
    content: 'shorter note'
  }]

  return {
    notes
  }
})
