import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import { writable } from 'svelte/store'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG6KPIYZk9oDzHtzDu1MYBaEi_QqtHDXE",
  authDomain: "svelte-demo-1c808.firebaseapp.com",
  projectId: "svelte-demo-1c808",
  storageBucket: "svelte-demo-1c808.appspot.com",
  messagingSenderId: "86238893933",
  appId: "1:86238893933:web:8aa544ab52e4b82d88ec64",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void
  
  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser')
    const { subscribe } = writable(null)
    return {
      subscribe,
    }
  }
  
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user)
    })
    
    return () => unsubscribe()
  })
  
  return {
    subscribe,
  }
}

export const user = userStore()