import { defineStore } from "pinia";
import { auth } from "@/plugins/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
import { router } from "@/router";

type User = {
  id: string | null,
  email: string | null
}

export const useStoreAuth = defineStore('storeAuth', () => {
  const user = ref<User | null>(null)


  const init = () => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        user.value = {
          id: authUser.uid,
          email: authUser.email
        }
        router.push({ name: 'notes' })
      } else {
        user.value = null
        router.replace({ name: 'auth' })
      }
    });
  }

  const registerUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('registered user ', user);

      })
      .catch((error: Error) => {
        console.error(error.message);

      })
  }

  const loginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('logged in', user);

      }).catch((error: Error) => {
        console.error(error.message)
      })
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      console.log('the user signed out');

    }).catch((error: Error) => {
      console.error(error.message)
    })
  }

  return {
    user,
    init,
    registerUser,
    loginUser,
    logoutUser
  }
})
