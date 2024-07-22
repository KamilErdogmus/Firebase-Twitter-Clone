import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleButton = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/feed");
        toast.success("Account Logged In", { autoClose: 3000 });
      })
      .catch((err) => toast.error("Something went wrong! " + err.code));
  };

  return (
    <button
      onClick={handleLogin}
      className="flex bg-white transition text-black whitespace-nowrap justify-center items-center py-2 gap-4 px-10 hover:bg-gray-300 rounded-full"
    >
      <img src="google-logo.svg" alt="Google Logo" className="h-[20px]" />
      <span className="font-bold">Log in with Google</span>
    </button>
  );
};

export default GoogleButton;
