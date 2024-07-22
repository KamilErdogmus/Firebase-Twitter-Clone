import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const upload = async (file) => {
  if (!file?.type.startsWith("image") || !file) {
    console.error("Invalid file type or no file provided.");
    return null;
  }

  try {
    const imageRef = ref(storage, `images/${v4()}_${file.name}`); // Farklı bir referans adı kullanabilirsiniz
    await uploadBytes(imageRef, file);
    console.log("File uploaded successfully.");
    const url = await getDownloadURL(imageRef);
    console.log("File URL:", url);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export default upload;
