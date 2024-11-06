import { useState } from "react";
import { Navigate } from "react-router-dom";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";
import {toast} from "sonner";

export default function Home({ user }:any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    };

    const handleSignUp = () => {
        if (!email || !password) return;
        if (password !== repeatPassword) {
            toast.error("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`${errorCode}: ${errorMessage}`);
            });
    };

    const handleSignIn = () => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`${errorCode}: ${errorMessage}`);
            });
    };

    const handleEmailChange = (event:any) => setEmail(event.target.value);
    const handlePasswordChange = (event:any) => setPassword(event.target.value);
    const handleRepeatPasswordChange = (event:any) => setRepeatPassword(event.target.value);

    if (user) {
        return <Navigate to="/private"></Navigate>;
    }
    return (
        <section className="flex flex-col gap-4 items-center justify-center ">
            <h2 className="text-2xl">Homepage</h2>
            <form>
                {isSignUpActive && <legend>Crear una cuenta</legend>}
                {!isSignUpActive && <legend>Iniciar Sesion</legend>}

                <fieldset className="form-control gap-3">
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            onChange={handleEmailChange}
                            type="text" className="grow" placeholder="Email"/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">

                        <input
                            onChange={handlePasswordChange}
                            type="password" className="grow" placeholder="Password"/>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            onChange={handleRepeatPasswordChange}
                            type="password" className="grow" placeholder="Repetar password"/>
                    </label>

                    {isSignUpActive && (
                        <button className="btn btn-primary" type="button" onClick={handleSignUp}>
                            Sign Up
                        </button>
                    )}
                    {!isSignUpActive && (
                        <button className="btn btn-primary" type="button" onClick={handleSignIn}>
                            Sign In
                        </button>
                    )}
                </fieldset>
                {isSignUpActive && <a className="link" onClick={handleMethodChange}>Login</a>}
                {!isSignUpActive && (
                    <a onClick={handleMethodChange}>Create an account</a>
                )}
            </form>
        </section>
    );
};
