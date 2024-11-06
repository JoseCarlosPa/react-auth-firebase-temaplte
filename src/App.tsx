import {Routes, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import {Toaster} from "sonner";
import {AuthContextProvider} from "./contexts/Auth/Auth.context.tsx";
import ProtectedRoute from "./components/protectedRoute.tsx";
import Account from "./components/Account.tsx";
import Signin from "./components/SignIn.tsx";
import Signup from "./components/SignUp.tsx";

function App() {


    return (
        <div>
            <Toaster richColors  expand closeButton/>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Signin />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route
                            path='/account'
                            element={
                                <ProtectedRoute>
                                    <Account />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </div>
    );
}


export default App;
