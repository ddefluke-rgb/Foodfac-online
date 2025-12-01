/*
  app-firebase.js (module)
  IMPORTANT: Replace firebaseConfig object with your project's credentials.
*/
export const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTHDOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECTID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGEBUCKET",
  messagingSenderId: "REPLACE_MESSAGING_SENDER_ID",
  appId: "REPLACE_APP_ID"
};

export let FA = null;

export async function initFirebase(firebaseApp, firestore, storageLib) {
  const { getFirestore, collection, addDoc, getDocs, setDoc, doc, updateDoc, query, orderBy, onSnapshot } = firestore;
  const { getStorage, ref: sRef, uploadString, getDownloadURL } = storageLib;

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  FA = {
    async addStoreRemote(store){ const col = collection(db,'stores'); const r = await addDoc(col, {...store}); return r.id; },
    async getStoresRemote(){ const q = query(collection(db,'stores'), orderBy('name')); const snap = await getDocs(q); return snap.docs.map(d=>({id:d.id, ...d.data()})); },
    async addMenuRemote(storeId, menu){ const col = collection(db, 'stores', storeId, 'menus'); const r = await addDoc(col, {...menu}); return r.id; },
    async getMenusRemote(storeId){ const snap = await getDocs(collection(db,'stores',storeId,'menus')); return snap.docs.map(d=>({id:d.id, ...d.data()})); },
    async createOrderRemote(storeId, items, prefix='Q'){
      const ordersCol = collection(db,'stores',storeId,'orders');
      const r = await addDoc(ordersCol, { items, total: items.reduce((a,b)=>a+Number(b.price||0),0), status:'pending', prefix, createdAt: new Date() });
      const all = await getDocs(ordersCol);
      const qnum = all.size;
      const orderNo = prefix+'-'+String(qnum).padStart(4,'0');
      await setDoc(doc(db,'stores',storeId,'orders',r.id), { orderNo, queue: qnum }, { merge: true });
      return { id: r.id, orderNo, queue: qnum };
    },
    async uploadQRPlaceholder(){ throw new Error('Please use storage SDK in HTML to upload QR and set store doc.'); },
    listenOrdersPlaceholder(){ throw new Error('Use onSnapshot in HTML to listen for orders.'); }
  };
  return FA;
}
