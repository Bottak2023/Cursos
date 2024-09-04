import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC-n2yNVqRgjs8b2gSsUU8sW1DUJdYelaE",
  authDomain: "bottak-cursosv2.firebaseapp.com",
  databaseURL: "https://bottak-cursosv2-default-rtdb.firebaseio.com",
  projectId: "bottak-cursosv2",
  storageBucket: "bottak-cursosv2.appspot.com",
  messagingSenderId: "95004383906",
  appId: "1:95004383906:web:bc5de8194849dbbdf315fb"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyBNx-ULc9lOnj2rF3GCMzEEyoKYlpTxPXM",
//   authDomain: "bottak-cursos.firebaseapp.com",
//   databaseURL: "https://bottak-cursos-default-rtdb.firebaseio.com",
//   projectId: "bottak-cursos",
//   storageBucket: "bottak-cursos.appspot.com",
//   messagingSenderId: "529367569941",
//   appId: "1:529367569941:web:e9fc00b7b006876ec5601c"
// };





export const app = initializeApp(firebaseConfig)
