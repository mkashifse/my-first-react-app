import { collection, getDocs, addDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase.config";

export function getAllPosts() {
  return getDocs(collection(db, "posts")).then((resp) =>
    resp.docs.map((item) => item.data())
  );
}

export function getAllUsers() {
  return getDocs(collection(db, "users")).then((resp) =>
    resp.docs.map((item) => item.data())
  );
}

export function addNewPost(postData) {
  return addDoc(collection(db, "posts"), postData);
}

export async function uploadNewFile(file) {
  debugger
  const storageRef = ref(storage, "catalog/" + file.name);
  const resp = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
