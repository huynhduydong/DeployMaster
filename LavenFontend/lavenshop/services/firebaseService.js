import { firebase_storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFile = async (file) => {
  const fileExtension = file.name.split(".").pop();
  const timestamp = new Date().getTime();
  const fileName = `${timestamp}.${fileExtension}`;
  const fileRef = ref(firebase_storage, `product_images/${fileName}`);
  try {
    await uploadBytes(fileRef, file);
    const dowloadUrl = await getDownloadURL(fileRef);
    console.log("File uploaded successfully: ", dowloadUrl);
    return dowloadUrl;
  } catch (error) {
    console.error("Error uploading file: ", error);
    return null;
  }
};
export const uploadCategoryImage = async (file) => {
  const fileExtension = file.name.split(".").pop();
  const timestamp = new Date().getTime();
  const fileName = `${timestamp}.${fileExtension}`;
  const fileRef = ref(firebase_storage, `category_images/${fileName}`);
  try {
    await uploadBytes(fileRef, file);
    const dowloadUrl = await getDownloadURL(fileRef);
    console.log("File uploaded successfully: ", dowloadUrl);
    return dowloadUrl;
  } catch (error) {
    console.error("Error uploading file: ", error);
    return null;
  }
};
export const deleteFile = async (url) => {
  const fileRef = firebase_storage.refFromURL(url);
  try {
    await fileRef.delete();
    console.log("File deleted successfully: ", url);
    return true;
  } catch (error) {
    console.error("Error deleting file: ", error);
    return false;
  }
};