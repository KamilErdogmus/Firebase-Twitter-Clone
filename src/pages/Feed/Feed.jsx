import Nav from "./Nav";
import Aside from "./Aside";
import Main from "./Main";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Feed = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user_data) => {
      setUser(user_data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="feed  text-white bg-black">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
