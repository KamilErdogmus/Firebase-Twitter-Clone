import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const ResetButton = ({ email, setEmail }) => {
  //! Manage Users in Firebase
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Password reset email sent");
        setEmail("");
      })
      .catch((err) => toast.error("Something went wrong!" + "\n" + err.code));
  };

  return (
    <button onClick={handleReset} className="text-red-500 text-center  ">
      Forgot Your Password
    </button>
  );
};

export default ResetButton;
