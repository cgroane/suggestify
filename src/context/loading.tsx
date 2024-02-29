import React, { createContext, useContext, useState } from "react";
export type LoadingStateValueProp = {
    status: LoadingState;
    setStatus: React.Dispatch<React.SetStateAction<LoadingState>>;
}

type ContextProp = {
    children: React.ReactNode
} 

export enum LoadingState {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    ERROR = 'ERROR'
}

const LoadingContext = createContext({} as LoadingStateValueProp);

export default function Context({ children }: ContextProp) {
    const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
    return (
        <LoadingContext.Provider value={{ status, setStatus }} >
            {children}
        </LoadingContext.Provider>
    )
};

export const useLoadingContext = ():LoadingStateValueProp => {
    return useContext(LoadingContext);
};