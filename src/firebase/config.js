import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBNx-ULc9lOnj2rF3GCMzEEyoKYlpTxPXM",
  authDomain: "bottak-cursos.firebaseapp.com",
  databaseURL: "https://bottak-cursos-default-rtdb.firebaseio.com",
  projectId: "bottak-cursos",
  storageBucket: "bottak-cursos.appspot.com",
  messagingSenderId: "529367569941",
  appId: "1:529367569941:web:e9fc00b7b006876ec5601c"
};





export const app = initializeApp(firebaseConfig)
