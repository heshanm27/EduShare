import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FireBase/Config";

export const uploadImage = async (images, foldername) => {
  const storageRef = ref(storage, `${foldername}/${images.name}`);
  const uploadTask = uploadBytesResumable(storageRef, images);
  await uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (e) => {
      throw new Error(e);
    },
    () => {
      console.log("upload");
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        return downloadURL;
      });
    }
  );
};
