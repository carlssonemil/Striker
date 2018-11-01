import Firebase from 'firebase'

const firebaseConfig = {
  "apiKey": process.env.FIREBASE_APIKEY,
  "authDomain": process.env.FIREBASE_AUTHDOMAIN,
  "databaseURL": process.env.FIREBASE_DATABASEURL,
  "projectId": process.env.FIREBASE_PROJECTID,
  "storageBucket": process.env.FIREBASE_STORAGEBUCKET,
  "messagingSenderId": process.env.FIREBASE_MESSAGINGSENDERID
}

export const firebaseApp  = Firebase.initializeApp(firebaseConfig);
export const database     = firebaseApp.database();
export const databaseRef  = database.ref("strikes");