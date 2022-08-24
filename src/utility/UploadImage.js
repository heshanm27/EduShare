import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FireBase/Config";

export const uploadImage = async (images, foldername) => {
  return new Promise((resolve, reject) => {
    if (images.length !== 0) {
      const storageRef = ref(storage, `${foldername}/${images.name}`);
      const uploadTask = uploadBytesResumable(storageRef, images);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (e) => {
          reject(e);
        },
        () => {
          console.log("upload");
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    }
  });
};
