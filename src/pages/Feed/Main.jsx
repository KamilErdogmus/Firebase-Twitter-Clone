import { useEffect, useState } from "react";
import Form from "../../components/Form/Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../../components/Loader/Loader";
import Post from "./../../components/Post/Post";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    //* Abone olunacak koleksiyonun referansını al
    const ref = collection(db, "tweets");
    //~ Abonelik ayarlarını tanımla
    const q = query(ref, orderBy("createdAt", "desc"));

    //? Koleksiyona abone ol
    const unsub = onSnapshot(q, (snapshot) => {
      //& Tweetler için geçici bir dizi oluştur
      const temp = [];
      //^ Ekrana basmak için diziyi dön state'e aktar
      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setTweets(temp);
    });

    return () => unsub();
  }, []);

  return (
    <main className="border border-zinc-600 hidden-scrollbar ">
      <header className="border-b border-zinc-600 p-4 text-2xl font-bold">
        Home
      </header>

      <Form user={user} />

      {!tweets ? (
        <div className="flex justify-center mt-20 scale-150">
          <Loader />
        </div>
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
