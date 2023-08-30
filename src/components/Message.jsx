import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";
import { db } from "../firebase";

const Message = ({ created_at, message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "auto" });
  }, [message]);
  const updateMessageTimestamps = async () => {
    const messagesRef = db.collection('messages');
    const messages = await messagesRef.get();

    messages.forEach((doc) => {
      const timestamp = doc.data().timestamp;
      const createdAt = new Date(timestamp.toDate()).toISOString();

      messagesRef.doc(doc.id).update({
        created_at: createdAt
      });
    });
  }
  const [showTimestamp, setShowTimestamp] = useState(false);
  useEffect(() => {
    updateMessageTimestamps();
  }, []);


  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
      {showTimestamp && (
        <div className="timestamp-box">
          <span className="timestamp">
            {moment(message.created_at).format("dd,h:mm a")}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
