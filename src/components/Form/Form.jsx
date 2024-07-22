import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import upload from "../../utils/upload";
import { useState } from "react";
import Loader from "./../Loader/Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //* Inputtaki verilere eriş
    const text = e.target[0].value;
    const file = e.target[1].files[0];
    //* Yazı ve resim içeriği yoksa fonk. durdur uyarı ver
    if (!text && !file) {
      return toast.warning("Please Enter Content", {
        position: "bottom-right",
      });
    }
    setIsLoading(true);
    try {
      //^Dosyayı storage'ye yükle
      const url = file ? await upload(file) : null;

      //? Yeni tweet belgesini koleksiyona kaydet
      const tweetCol = collection(db, "tweets");

      await addDoc(tweetCol, {
        textContent: text,
        imageContent: url,
        likes: [],
        isEdited: false,
        createdAt: serverTimestamp(),
        user: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
    setIsLoading(false);
    //& Formu sıfırla
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b border-zinc-600 p-4 flex gap-3"
    >
      <img
        className="rounded-full h-16 w-16"
        src={user?.photoURL}
        alt={user?.displayName}
      />
      <div className="w-full">
        <input
          type="text"
          placeholder="What's going on?"
          className="bg-transparent w-full mt-1 mb-2 outline-none md:text-lg"
        />
        <div className="flex justify-between items-center mt-2">
          <label
            className="text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800"
            htmlFor="file"
          >
            <BsCardImage />
          </label>
          <input type="file" className="hidden" id="file" />
          <button
            disabled={isLoading}
            className="bg-blue-500 py-2 px-4 min-w-[85px] flex items-center justify-center rounded-full text-lg hover:opacity-70"
          >
            {isLoading ? <Loader /> : "Tweet"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
