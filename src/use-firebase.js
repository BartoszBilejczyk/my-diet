import firebase from 'firebase';
import 'firebase/firestore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

if (firebase.apps.length === 0) {
  const firebaseConfig = {
    apiKey: 'AIzaSyAVi9vOV_PPi3j-6Vc04mTO6M50vIjG_jM',
    authDomain: 'my-diet-ccddc.firebaseapp.com',
    projectId: 'my-diet-ccddc',
    storageBucket: 'my-diet-ccddc.appspot.com',
    messagingSenderId: '117517693090',
    appId: '1:117517693090:web:8079d93ef5d3124dcaa7fb'
  };
  firebase.initializeApp(firebaseConfig);
}

export default function () {
  const db = firebase.firestore();

  const getCurrentUser = () => {
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
  };

  const { push } = useRouter();

  onMounted(() => {
    firebase.auth().onAuthStateChanged(_user => {
      if (!_user?.email) {
        push({ name: 'login' });
      }
    });
  });

  const getData = async () => {
    return await db
      .doc(`data/data`)
      .get()
      .then(doc => {
        return { id: doc.id, ...doc.data() };
      });
  };

  const saveData = async data => {
    await db.doc(`data/data`).set({ data });
    await db.doc(`data/backupData`).set({ data });
  };

  return {
    getCurrentUser,
    getData,
    saveData
  };
}
