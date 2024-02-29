import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router";
import { getToken } from "../utils/getToken";
import axiosInstance from "../config/axios";
import { LoadingState, useLoadingContext } from "../context/loading";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from "../firebase/createUserWithEmailAndPassword";
import { environments } from "../config/environments";

type FirebaseUserRecordData = Spotify.SpotifyProfile & {
    phone: string;
    pw: string;
    accessToken: string;
    refreshToken: string;
    playlistId?: string
}

interface FinishSetUpProps {}
const FinishSetUp = ({
  ...props
}: FinishSetUpProps ) => {
    const [data, setData] = useState({
        pw: '',
        phone: ''
    })
    const { status, setStatus } = useLoadingContext();
    const [spotifyData, setSpotifyData] = useState<Spotify.SpotifyProfile>({} as Spotify.SpotifyProfile);
    const { hash } = useLocation();
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const token = useMemo(() => {
        return getToken(hash);
    }, [hash]);

    const getSpotifyData = useCallback(async () => {
        try {
            const response = await axiosInstance.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + token.access_token,
                "Content-Type": 'application/json'
            },
        });
            if (!response.data){
                setStatus(LoadingState.ERROR);
            }
            setSpotifyData(JSON.parse(response.data));
        } catch (err) {
            setStatus(LoadingState.ERROR);
            console.log(err)
        }
    }, [token, setStatus, setSpotifyData]);

    useEffect(() => {
        getSpotifyData();
    }, [getSpotifyData])

    const signUp = useCallback( async (userData: FirebaseUserRecordData) => {
        const { phone, pw, email, display_name, id, accessToken, refreshToken, playlistId } = userData;
        try {
            const docRef = doc(db, 'users', id);
            const exists = await getDoc(docRef);
            if (!exists.exists()) {
                const { user } = await createUserWithEmailAndPassword(auth, email, pw)
                const docData = await setDoc(doc(db, 'users', id), {
                    displayName: display_name,
                    email: email,
                    phone,
                    firestore_uid: user?.uid,
                    spotifyId: id,
                    accessToken,
                    refreshToken,
                    playlistId
                });

                const newAcc = await axiosInstance.post(`${environments.serverUrl}/new-account`, { phone }).then(() => setStatus(LoadingState.IDLE))
                return { docData, newAcc };
            } else {
                console.log('exists, fetch refresh token?');
            }
        } catch (err) {
            return err;
        }
    }, [setStatus])

    const submit = useCallback(async (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!!JSON.stringify(spotifyData) && !!JSON.stringify(data)) {
            try {
                setStatus(LoadingState.LOADING);
                const playlistData = await axiosInstance.post<string, {data: string}>(`https://api.spotify.com/v1/users/${spotifyData.id}/playlists`,JSON.stringify({
                name: "suggestify",
                public: "true"
              }), {
                headers: {
                  'Authorization': 'Bearer ' + token.access_token,
                  "Content-Type": 'application/json'
                }
              }
            );
            if (!playlistData.data) {
                setStatus(LoadingState.ERROR);
                return;
            }
            const { id } = JSON.parse(playlistData.data);
                await signUp({
                    phone: data.phone,
                    pw: data.pw,
                    accessToken: token.access_token,
                    refreshToken: token.refresh_token,
                    playlistId: id,
                    ...spotifyData,
                });
            setStatus(LoadingState.IDLE);
            navigate('/done');

            } catch(err) {
                alert('There was an error getting the necessary data to create your account');
                console.error(err);
                setStatus(LoadingState.ERROR);
            }
        }
    }, [setStatus, data, spotifyData, token.access_token, token.refresh_token, signUp, navigate]);
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h4 className="text-xl md:text-3xl w-1/2 font-bold mx-auto">Finish account setup with a phone number and password</h4>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
        <div className="form-control">
                    <label className="input input-bordered flex items-center gap-2 my-8">
                        <svg fill="#000000" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	                            viewBox="0 0 32 32" xmlSpace="preserve">
                            <g>
	                        <path d="M19.494,0H7.948C6.843,0,5.951,0.896,5.951,1.999v23.446c0,1.102,0.892,1.997,1.997,1.997h11.546
		c1.103,0,1.997-0.895,1.997-1.997V1.999C21.491,0.896,20.597,0,19.494,0z M10.872,1.214h5.7c0.144,0,0.261,0.215,0.261,0.481
		s-0.117,0.482-0.261,0.482h-5.7c-0.145,0-0.26-0.216-0.26-0.482C10.612,1.429,10.727,1.214,10.872,1.214z M13.722,25.469
		c-0.703,0-1.275-0.572-1.275-1.276s0.572-1.274,1.275-1.274c0.701,0,1.273,0.57,1.273,1.274S14.423,25.469,13.722,25.469z
		 M19.995,21.1H7.448V3.373h12.547V21.1z"/>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                        </g>
                    </svg>
                        <input onChange={handleChange} className="grow" name="phone" placeholder="xxxxxxxxxx" value={data.phone}/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input input-bordered flex items-center gap-2 my-8">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input onChange={handleChange} name="pw" type="password" className="grow" value={data.pw} placeholder="password" />
                        
                        </label>
                    </div>
                    <div className="form-control mt-6">
                    <button onClick={submit} className={"btn btn-neutral"} >
                        {status === LoadingState.LOADING ? <span className="loading loading-spinner text-primary"></span> : 'Finish'}
                    </button>
                    </div>
        </form>
      </div>
    </div>
  </div>
  )
};

export default FinishSetUp;
