import { CiShare2 } from "react-icons/ci";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./../../firebase/index";

const Buttons = ({ tweet }) => {
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
  //! Like durumunu tersine çevir
  const toggleLike = async () => {
    //* Güncellenecek elemanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);
    //? referansı alınan tweet dökümanını güncelle(firestore)
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  return (
    <div className="flex justify-between items-center">
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#2d107c]">
        <LuMessageCircle />
      </div>
      <div className="p-3 rounded-full cursor-pointer transition hover:bg-[#2d107c]">
        <FaRetweet className="text-xl" />
      </div>
      <div
        onClick={toggleLike}
        className="p-3 rounded-full flex gap-2 items-center cursor-pointer transition hover:bg-[#a50606]"
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        <span>{tweet.likes.length}</span>
      </div>
    </div>
  );
};

export default Buttons;
