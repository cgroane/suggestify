import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCXUsaJR7pwtq5tId-ykf-2B9-Y1jRqBRg",
  authDomain: "bangas-united.firebaseapp.com",
  databaseURL: "https://bangas-united.firebaseio.com",
  projectId: "bangas-united",
  storageBucket: "bangas-united.appspot.com",
  messagingSenderId: "58611865268",
  appId: "1:58611865268:web:f76f3f543c86bc543329e1",
  measurementId: "G-H5Z8PL4XB3"
};
const app = initializeApp(firebaseConfig);

// Get a reference to the database service


export default app;