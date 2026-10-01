import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD8i4wduUyMBnGI5SpwgRtIV0ylfPFXnm4",
  authDomain: "todoflow-e8350.firebaseapp.com",
  projectId: "todoflow-e8350",
  storageBucket: "todoflow-e8350.firebasestorage.app",
  messagingSenderId: "555442944136",
  appId: "1:555442944136:web:3b9a7f40d92fe219d5873d",
  measurementId: "G-M6GE8TY5BV"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)