import app from "../config/firebase"
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };