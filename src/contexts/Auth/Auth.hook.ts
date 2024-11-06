import {useEffect, useState} from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../../firebase.ts";
import {tAuthHook} from "./Auth.types.ts";

export default function useAuth(): tAuthHook{
    const [user, setUser] = useState<any>({});

    const createUser = (email:string, password:string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email:string, password:string) =>  {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return { createUser, user, logout, signIn };
}