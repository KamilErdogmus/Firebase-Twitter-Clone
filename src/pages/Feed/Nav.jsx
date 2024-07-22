import { BiSolidDoorOpen } from "react-icons/bi";
import { navSections } from "../../constant";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col h-screen justify-between items-end px-2 py-4">
      <div className="flex flex-col">
        <div className="grid place-items-center mb-2">
          <img src="x-logo.webp" alt="" className="w-[60px]" />
        </div>
        {navSections.map((i, key) => (
          <div
            className="flex items-center gap-1 text-xl md:text-2xl p-3 cursor-pointer max-md:justify-center rounded-lg transition hover:bg-[#505050]"
            key={key}
          >
            {i.icon}
            <span className="max-md:hidden whitespace-nowrap">{i.title}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center fixed bottom-3  items-center md:mr-3 gap-2">
        {!user ? (
          <>
            <div className="h-12 w-12 rounded-full bg-gray-400 animate-pulse" />
            <p className="animate-pulse">Loading...</p>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <img
              className="w-[50px] rounded-full  bg-gray-400 "
              src={user?.photoURL}
              alt=""
            />
            <p className="text-wrap text-center max-md:hidden">
              {user?.displayName}
            </p>
          </div>
        )}

        <button
          onClick={() => {
            signOut(auth), toast.info("Logged out!");
          }}
          className="bg-zinc-800 text-white p-1 flex items-center rounded-lg md:text-[16px] text-2xl whitespace-nowrap hover:opacity-25 "
        >
          <BiSolidDoorOpen />
          <span className="max-md:hidden">Log Out</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
