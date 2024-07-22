import { onAuthStateChanged } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";

const Protected = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    //! kullanıcının oturumunu izler ve oturumda bir değişiklik olduğunda cb func tetikler
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    });
  }, []);

  //* Yükleniyorsa
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  //* Eğer kullanıcının yetkisi yoksa(oturumu açık değilse)
  if (isAuth === false) {
    return <Navigate to="/" replace />;
  }

  //? Yetkisi varsa alt route'u göster
  return <Outlet />;
};

export default Protected;
