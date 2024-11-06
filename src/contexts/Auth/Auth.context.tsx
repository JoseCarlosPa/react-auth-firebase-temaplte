import { createContext, useContext } from 'react';
import useAuth from "./Auth.hook.ts";
import {tAuthContext} from "./Auth.types.ts";


const initialState:tAuthContext = {
    createUser: () => {},
    user: {},
    logout: () => {},
    signIn: () => {},
}

const UserContext = createContext<tAuthContext>(initialState);

export const AuthContextProvider = ({ children }:any) => {
    const value = useAuth();

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
