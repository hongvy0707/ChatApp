import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import DarkMode from "./DarkMode";

const Input = () => {
    const [placeholderText, setPlaceholderText] = useState("Type something...");
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSendClick();
        }
      };
      const handleChange = (e) => {
        setText(e.target.value);
        if (e.target.value.trim() === "") {
          setPlaceholderText("Please enter a message");
        } else {
          setPlaceholderText("");
        }
      };
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [placeholder, setPlaceholder] = useState("Type something...");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSendClick = async () => {
    if (text.trim() === "") {
        setPlaceholderText("Please enter a message");
        return;
      }
    if (!text) {
        setError("Please enter a message");
        setIsError(true);
        return;
      }
      setIsError(false);
      setText("");
      setImg(null);
      setPlaceholderText("Type something...");
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={text}
      />
      <div className="send">
        <img src="https://res.cloudinary.com/dijk3xi4c/image/upload/v1676467587/attach_e1xbec.png" alt="AttachFile" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <img src="https://res.cloudinary.com/dijk3xi4c/image/upload/v1676467587/img_wrg01r.png" alt="Image" />
        </label>
        <button onClick={handleSendClick}>Send</button>
      </div>
      {isError && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;