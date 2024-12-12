import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAm__D_Mpaf-M8ih7n2szkLZhgmDJSOi_w",
  authDomain: "netflix-clone-afe56.firebaseapp.com",
  projectId: "netflix-clone-afe56",
  storageBucket: "netflix-clone-afe56.firebasestorage.app",
  messagingSenderId: "1049705598437",
  appId: "1:1049705598437:web:7c8533327eaaf033a3f30c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => { 
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split("-").join(" "));
        
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout};