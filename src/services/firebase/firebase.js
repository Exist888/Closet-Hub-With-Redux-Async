import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    writeBatch, 
    query,
    getDocs
} from "firebase/firestore";

// Initialize Firebase app with .env variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDING_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase app with the config object
const firebaseApp = initializeApp(firebaseConfig);

// Create an instance of Google auth provider
const provider = new GoogleAuthProvider();

// Force user to select account every time - even if already signed in
provider.setCustomParameters({
    prompt: "select_account"
});

// Initialize Firebase Auth and export a function to sign in with Google popup
export const auth = getAuth();
export function signInWithGooglePopup() {
    return signInWithPopup(auth, provider);
}

// Initialize Firestore database
export const db = getFirestore();

// Add multiple docs to a collection in Firestore (creates the collection if it doesn’t exist)
export async function addCollectionAndDocuments(collectionKey, objectsToAdd) {
    // Create a reference to our collection using db as location and collectionKey as its name
    const collectionRef = collection(db, collectionKey);
    // Create a batch so we can achieve multiple writes in one unit
    const batch = writeBatch(db);
    // Iterate through all data objects  
    objectsToAdd.forEach((object) => {
        // Create a reference to our doc using collectionRef as location and object.title as its doc id
        const docRef = doc(collectionRef, object.title.toLowerCase());
        // Set each doc reference and object into our batch before committing the batch as a whole
        batch.set(docRef, object);
    });
    // Execute all the batched operations
    await batch.commit();
}

export async function getCategoriesAndDocuments() {
    // Get a reference to our "categories" collection in Firestore
    const collectionRef = collection(db, "categories");
    // Build an unfiltered query to our collectionRef
    const q = query(collectionRef);
    // Fetch all documents from the collection
    const querySnapshot = await getDocs(q);
    // Get raw document snapshots from the query (as an array)
    const docSnapshots = querySnapshot.docs;

    // FOR REDUX: Return an array of plain JS objects extracted from document snapshots
    const categoryObjectsArray = docSnapshots.map((docSnapshot) => {
        return docSnapshot.data();
    });

    return categoryObjectsArray;
}

// Create a user document in Firestore from authenticated user data
// Include additionalInfo as optional param to overwrite nullified displayName (for em and pw auth)
export async function createUserDocumentFromAuth(userAuth, additionalInfo = {}) {
    if (!userAuth) return;

    // Create reference to user object in "users" collection with uid as id
    const userDocRef = doc(db, "users", userAuth.uid);

    // Retrieve the document snapshot - not the document itself
    const userSnapshot = await getDoc(userDocRef);

    // Create a user document if it doesn't already exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // Create (set) the user document with basic user info
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (error) {
            console.error("Error creating the user.");
        }
    }

    // Return the reference to the user doc whether it exists or not
    // return userDocRef;

    // FOR SAGA: return the snapshot
    return userSnapshot;
}

export async function createAuthUserWithEmailAndPassword(email, password) {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInUserWithEmailAndPassword(email, password) {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
    await signOut(auth);
}

export function onAuthStateChangedListener(callback) {
    onAuthStateChanged(auth, callback);
}

// FOR SAGA: To practice using Saga, we will replace function above with a custom Promise
// NOTE: Best practice is to use Firebase's onAuthStateChanged function to listen for auth state changes
export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    })
}