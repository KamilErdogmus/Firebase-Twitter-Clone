import { doc, updateDoc } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import upload from "../../utils/upload";
import { useState } from "react";
import Loader from "./../Loader/Loader";

const Modal = ({ tweet, close }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //* Inputtaki verilere eriş
    const text = e.target[0].value;
    const file = e.target[1].files[0];

    setLoading(true);

    //^ Güncellenecek olan dökümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);

    try {
      //! Eğer dosya seçilmediyse sadece yazıyı güncelle
      if (!file || !file?.type.startsWith("image")) {
        await updateDoc(tweetRef, {
          textContent: text,
          isEdited: true,
        });
        toast.info("Tweet Editted");
        return close();
      }

      //? Dosya seçildiyse hem yazı hem fotoğrafı güncelle
      //&Seçilen fotoğrafı storage'a yükle
      const newUrl = await upload(file);

      //~Belgenin hem yazı hem fotoğraf değerini güncelle

      await updateDoc(tweetRef, {
        textContent: text,
        imageContent: newUrl,
        isEdited: true,
      });
      toast.info("Tweet Editted");
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }

    setLoading(false);

    close();
  };
  return (
    <div className="fixed inset-0 z-20 w-full h-full grid place-items-center bg-gray-600 bg-opacity-30">
      <div className="bg-black rounded-lg p-10 w-2/5 min-h-[45vh] max-w-[600px] max-h-[60vh] flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Edit Tweet</h1>

          <button onClick={close}>
            <IoMdClose className="text-3xl transition hover:text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 mt-10 flex flex-col justify-between"
        >
          <div className="flex flex-col">
            <label htmlFor="content">Edit content</label>
            <input
              className="border rounded-md p-1 mb-11 text-black"
              type="text"
              name="title"
              defaultValue={tweet.textContent}
              id="content"
            />

            <label
              className="text-lg transition p-2 w-fit text-center whitespace-nowrap bg-blue-500 rounded-lg hover:bg-gray-800"
              htmlFor="FC"
            >
              Add/Edit File
            </label>
            <input type="file" name="file" className="hidden" id="FC" />
          </div>
          <div className="flex justify-end gap-6 mt-4">
            <button
              type="button"
              className="bg-gray-500 py-2 px-5 rounded-full hover:bg-gray-600"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 py-2 px-5 rounded-full hover:bg-blue-600"
            >
              {loading ? <Loader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
