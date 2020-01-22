import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDpm3PYhuiNaWjntiUqlXPDOthIoGddVKw",
    authDomain: "crwn-clothing-2bd77.firebaseapp.com",
    databaseURL: "https://crwn-clothing-2bd77.firebaseio.com",
    projectId: "crwn-clothing-2bd77",
    storageBucket: "crwn-clothing-2bd77.appspot.com",
    messagingSenderId: "700533824699",
    appId: "1:700533824699:web:6211843fe96be5dfb79d9e",
    measurementId: "G-KNLNR9Y9ST" 
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; 

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 

