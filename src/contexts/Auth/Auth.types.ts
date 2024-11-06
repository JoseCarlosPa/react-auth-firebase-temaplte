export type tAuthContext = {
    createUser: (email:string, password:string) => void;
    user: any;
    logout: () => void;
    signIn: (email:string, password:string) => void;
}

export type tAuthHook = {
    createUser: (email:string, password:string) => void;
    user: any;
    logout: () => void;
    signIn: (email:string, password:string) => void;
}