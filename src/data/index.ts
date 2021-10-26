import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";

export type Ucapan = {
  id?: string,
  ava: number,
  nama: string,
  kehadiran: boolean,
  ucapan: string
}

const firebaseConfig = {
  apiKey: "AIzaSyBsv5rbsfkJclWvwCgz4cA942_AjhSjjTg",
  authDomain: "agung-lusi.firebaseapp.com",
  projectId: "agung-lusi",
  storageBucket: "agung-lusi.appspot.com",
  messagingSenderId: "1097407541843",
  appId: "1:1097407541843:web:c83eea74171ea3e0a2cca6"
};

initializeApp(firebaseConfig);
const db = getFirestore()

const add = async (data: Ucapan) => {
  return await addDoc(collection(db, 'ucapan'), { ...data, date: new Date()})
}
const read = async () => {
  const result: Ucapan[] = []
  const querySearch = query(collection(db, "ucapan"), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(querySearch) 
  
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    result.push((doc.data() as Ucapan))
  });
  return result
}

const data = { add, read }
export default data

