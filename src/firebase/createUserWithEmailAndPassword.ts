import app from "../config/firebase"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { environments } from "../config/environments";
import axiosInstance from "../config/axios";

const auth = getAuth(app);
const db = getFirestore(app);


const signUp = (userData: { firstName: string; lastName: string; email: string; phone: string; spotify: any; password: string }) => {
    const { firstName, lastName, email, phone, spotify, password } = userData;
    createUserWithEmailAndPassword(auth, email, password).then((data) => {
          setDoc(doc(db, 'users', data?.user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            id: data?.user?.uid,
            spotify
        }).then(() => axiosInstance.post(`${environments.serverUrl}/new-account`, { phone }));
    });
};
export default signUp;