import { watch, type Ref } from "vue";

export function useWatchCharacters(valueToWatch: Ref<string>, maxChars: number = 100) {
  watch(valueToWatch, (_, newVal) => {
    if (newVal.length >= maxChars) {
      alert(`only ${maxChars} chars allowed`)
    }
  })
}
