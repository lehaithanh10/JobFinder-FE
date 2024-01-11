import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidV4 } from 'uuid';

const firebaseConfig = {
  apiKey: 'AIzaSyAwQk-sbfbHzVb64gi-QXk5p-0kaQR4YnA',
  authDomain: 'job-finder-7324d.firebaseapp.com',
  projectId: 'job-finder-7324d',
  storageBucket: 'job-finder-7324d.appspot.com',
  messagingSenderId: '482763371171',
  appId: '1:482763371171:web:6bc6b3c6431bfa78dbc516',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    return signInWithPopup(auth, provider);
  } catch (err) {
    console.log(err);
    throw new Error('Something wrong when log in with Google');
  }
};

export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `cv/file/${uuidV4()}`);
  try {
    const response = await uploadBytes(storageRef, file);

    console.log('Uploaded a blob or file!', response.metadata.fullPath);
  } catch (err) {
    console.log(err);
    throw new Error('Something wrong when upload File to Firebase');
  }
  //   return new Promise((resovle, reject) => {
  //     const task = storage.child(`${typeFile}/${file.name}`).put(file);
  //     task.on(
  //       'state_changed',
  //       function onProgess() {},
  //       function onError(err: Error) {
  //         reject(err);
  //       },
  //       function onSuccess() {
  //         task.snapshot.ref.getDownloadURL().then(function (downloadURL: string) {
  //           resovle(downloadURL);
  //         });
  //       },
  //     );
  //   });
};
