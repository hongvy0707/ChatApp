import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";
import { db } from '../firebase';
import time from "../Date/Time"

const Message = ({ message }) => {
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

  // Gọi hàm cập nhật thời gian tạo của tin nhắn ở đây
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
        <span>{moment(message.created_at).format('dd,h:mm:ss a')}</span>

      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
