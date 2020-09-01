import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA-8t_VWinkaczG-UySUwZdWRRtstV8rNw",
  authDomain: "king-colthing-db.firebaseapp.com",
  databaseURL: "https://king-colthing-db.firebaseio.com",
  projectId: "king-colthing-db",
  storageBucket: "king-colthing-db.appspot.com",
  messagingSenderId: "665161496774",
  appId: "1:665161496774:web:c3e1db1e97e0c239e0bfc7",
  measurementId: "G-W4XKYGZRHQ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
