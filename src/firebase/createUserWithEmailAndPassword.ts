import app from "../config/firebase"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { environments } from "../config/environments";
import axiosInstance from "../config/axios";

const auth = getAuth(app);
const db = getFirestore(app);

type FirebaseUserRecordData = Spotify.SpotifyProfile & {
    phone: string;
    pw: string;
    accessToken: string;
    refreshToken: string;
    playlistId?: string
}

const signUp = async (userData: FirebaseUserRecordData) => {
    const { phone, pw, email, display_name, id, accessToken, refreshToken, playlistId } = userData;
    const docRef = doc(db, 'users', id);
    
    const exists = (await getDoc(docRef));
        if (!exists.exists()) {
            const { user } = await createUserWithEmailAndPassword(auth, email, pw)
            await setDoc(doc(db, 'users', id), {
                displayName: display_name,
                email: email,
                phone,
                firestore_uid: user?.uid,
                spotifyId: id,
                accessToken,
                refreshToken,
                playlistId
            });
            axiosInstance.post(`${environments.serverUrl}/new-account`, { phone })
    } else {
        console.log('exists, fetch refresh token?');
    }
};
export default signUp;