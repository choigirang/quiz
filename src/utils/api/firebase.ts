import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const { KEY, DOMAIN, PROJECT_ID, BUCKET, MESSAGINH_ID, APP_ID, MEASURE_ID } = process.env;

const firebaseConfig = {
  apiKey: KEY,
  authDomain: DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: BUCKET,
  messagingSenderId: MESSAGINH_ID,
  appId: APP_ID,
  measurementId: MEASURE_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
