import { watch, type Ref } from "vue";

export function useWatchCharacters(valueToWatch: Ref<string>) {
  watch(valueToWatch, (_, newVal) => {
    if (newVal.length >= 100) {
      console.log('Im in');

      alert('only 100 chars allowed')
    }
  })
}
