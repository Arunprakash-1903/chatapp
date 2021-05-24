import * as firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC4Ew9h8fM3greaKjTSa9jMzpVX81OeneU",
    authDomain: "signal-clone-cd6c6.firebaseapp.com",
    projectId: "signal-clone-cd6c6",
    storageBucket: "signal-clone-cd6c6.appspot.com",
    messagingSenderId: "86667773552",
    appId: "1:86667773552:web:bdb582d87234edadfcd6b5"
  };
  let app;
  if(firebase.apps.length===0){
   app=firebase.initializeApp(firebaseConfig);
  }else{
      app=firebase.app();
  }
  const db=firebase.firestore();
  const auth =firebase.auth();
  export {db,auth}