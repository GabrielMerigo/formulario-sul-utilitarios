import { createContext } from "react";
import { useState } from "react";
import firebase from '../services/firebaseConnection';


export const AuthContext = createContext({});

type signProps = {
  name: string,
  email: string,
}

function AuthProvider({ children }){
  const [loadingAuth, setLoadingAuth] = useState(false);


  async function signIn({ name, email }: signProps) {
    setLoadingAuth(true)
  }

}