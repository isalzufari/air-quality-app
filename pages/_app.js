import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavbarComponent, FooterComponent } from "../components/index";

import React, { useState } from 'react';
import { useRouter } from "next/router";

//Firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "../utils/firebase";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState();

  const onLoginWithEmail = ({ email, password }) => {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/');
        resolve(true)
      })
      .catch((err) => {
        const errorCode = err.code;
        const errMessage = err.message;
        alert(errorCode, errMessage);
        resolve(false)
      });
    })
  };

  const onRegisterWithEmail = ({ email, password }) => {
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        router.push('/');
        resolve(true)
      })
      .catch((err) => {
        const errorCode = err.code;
        const errMessage = err.message;
        alert(errorCode, errMessage);
        resolve(false)
      });
    })
    
  };

  const onLogOut = () => {
    signOut(auth).then(() => {
      alert('Sign-out successful')
    }).catch((err) => {
      console.log(err)
    })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user)
      setUser(user)
    } else {
      setUser(user)
    }
  })

  return (
    <>
      <NavbarComponent logOut={onLogOut} user={user} />
      <Component
        {...pageProps}
        loginEmail={onLoginWithEmail}
        registerEmail={onRegisterWithEmail}
      />
      <FooterComponent />
    </>
  );
}
