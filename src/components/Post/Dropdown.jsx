import { deleteDoc, doc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { ref } from "firebase/storage";

const Dropdown = ({ tweet }) => {
  const inputRef = useRef();
  const [modal, setModal] = useState(false);

  const handleDelete = async () => {
    //* firestore
    const deleteRef = doc(db, "tweets", tweet.id);

    deleteDoc(deleteRef)
      .then(() => toast.info("Tweet deleted"))
      .catch(() => toast.error("Something went wrong!"));
    //*Dropdown'ı kapatır
    inputRef.current.checked = false;
  };
  const handleEdit = () => {
    setModal(true);
    //*Dropdown'ı kapatır

    inputRef.current.checked = false;
  };
  return (
    <>
      <label className="popup">
        <input ref={inputRef} type="checkbox" />
        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className="popup-window">
          <legend>Actions</legend>
          <ul>
            <li>
              <button onClick={handleEdit}>
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                </svg>
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line y2="18" x2="6" y1="6" x1="18"></line>
                  <line y2="18" x2="18" y1="6" x1="6"></line>
                </svg>
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
      {modal && <Modal tweet={tweet} close={() => setModal(false)} />}
    </>
  );
};

export default Dropdown;
