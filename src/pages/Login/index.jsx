import { useState } from "react";
import GoogleButton from "./GoogleButton";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResetButton from "./ResetButton";

const Login = () => {
  const [signUp, setsignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //! Authenticate with Firebase using Pawword-Based Accounts
    if (signUp) {
      //! Kaydolma Modundaysa: Hesap Oluştur
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Account Created");
          navigate("/feed");
        })
        .catch((err) => toast.error("Something went wrong!" + "\n" + err.code));
      //! Giriş yapma modundaysa: Hesaba Giriş Yap
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Account accesed");
          navigate("/");
        })
        .catch((err) => {
          //! Şifre giriş bilgileri yanlış ise
          if (err.code === "auth/invalid-credential") {
            setFailed(true);
          }
          toast.error("Something went wrong!" + "\n" + err.code);
        });
    }
  };

  return (
    <div className="h-screen bg-[#242424] text-white grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-2xl">
        <div className="flex justify-center">
          <img width={60} src="x-logo.webp" alt="" />
        </div>
        <h1 className="text-center">Welcome To Twitter-X</h1>
        <GoogleButton />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input
            className="text-black rounded mt-1 p-2  outline-none shadow-lg focus:shadow-gray-500 "
            type="text"
            name=""
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            className="text-black rounded mt-1 p-2  outline-none shadow-lg focus:shadow-gray-500 "
            type="password"
            name=""
            required
            onChange={(e) => setpassword(e.target.value)}
            id="password"
          />

          <button className="mt-10 bg-white text-black rounded-full font-bold p-1 transition hover:bg-gray-300">
            {signUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4">
          <span className="text-gray-500">
            {signUp ? "If you have an account," : "If you dont have an account"}
          </span>
          <span
            onClick={() => setsignUp(!signUp)}
            className="text-blue-500 cursor-pointer ms-3"
          >
            {signUp ? "Login" : "Register"}
          </span>
        </p>

        {failed && <ResetButton email={email} setEmail={setEmail} />}
      </div>
    </div>
  );
};

export default Login;
