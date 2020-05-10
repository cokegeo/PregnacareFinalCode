import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  //Removed API Key as it corresponds to my Firebase account
  apiKey: "",
    authDomain: "pregnacareappreact.firebaseapp.com",
    databaseURL: "https://pregnacareappreact.firebaseio.com",
    projectId: "pregnacareappreact",
    storageBucket: "pregnacareappreact.appspot.com",
    messagingSenderId: "382126040893",
    appId: "1:382126040893:web:7ac841a98dcc204ecdc754"
};

class Fire {
  constructor(callback){
    this.init(callback)
  }

  init(callback) {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            callback(null, user);
        } else {
            firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
        }
    });
  }

  getLists(callback) {
    //So new lists always appear first
      let ref = this.ref.orderBy("timestamp", "desc");
      

      this.unsubscribe = ref.onSnapshot(snapshot => {
        lists = [];

        snapshot.forEach(doc => {
          lists.push({id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  getInfo(callback) {
    let ref2 = this.ref2;

    this.unsubscribe = ref2.onSnapshot(snapshot => {
      info = [];

      snapshot.forEach(doc => {
        info.push({id: doc.id, ...doc.data()})
      })
      callback(info);
    })
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  addLista(lista) {
    let ref2 = this.ref2;

    ref2.add(lista);
    //ref2.doc(lista.id).update(lista);
    //ref2.doc(this.listaId).update(lista);
  }


  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  updateLista(lista) {
    let ref2 = this.ref2;

    ref2.doc(lista.id).update(lista);
  }


  get userId() {
    return firebase.auth().currentUser.uid;
  }

  //get infoId() {
  //  return firebase.auth().currentUser.uid.info.id;
  //}

  get ref() {
    return firebase
    .firestore()
    .collection('users')
    .doc(this.userId)
    .collection('lists');
  }

  get ref2() {
    return firebase
    .firestore()
    .collection('users')
    .doc(this.userId)
    .collection('info');
    //.doc(this.infoId)
    //.collection('lista');
  }

  detach() {
    this.unsubscribe();
  }

}



export default Fire;
