import React, { useState, useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import Camera from './Camera';
import Modal from 'react-modal';
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false); // Thêm state để kiểm soát việc hiển thị camera
  const { data } = useContext(ChatContext);
  const openCameraModal = () => {
    setShowCameraModal(true);
  };

  const closeCameraModal = () => {
    setShowCameraModal(false);
  };

  const openCamera = () => {
    setShowCamera(true);
    closeCameraModal();
  };

  const closeCamera = () => {
    setShowCamera(false);
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img
            src="https://res.cloudinary.com/dijk3xi4c/image/upload/v1676465117/cam_f1a3q2.png"
            alt="Camera"
            onClick={openCameraModal}
          />
          <img
            src="https://res.cloudinary.com/dijk3xi4c/image/upload/v1676465117/add_oarqxw.png"
            alt="Add"
          />
          <img
            src="https://res.cloudinary.com/dijk3xi4c/image/upload/v1676465117/more_jpxt6w.png"
            alt="More"
          />
        </div>
      </div>
      {showCamera && (
        <div className="cameraOverlay">
          <Camera closeCamera={closeCamera} />
        </div>
      )}
      <Messages showCamera={showCamera} />
      <Input />
      <Modal
        isOpen={showCameraModal}
        onRequestClose={closeCameraModal}
        contentLabel="Camera Modal"
      >
        <Camera closeCamera={closeCamera} />
        <button onClick={openCamera}>Open Camera</button>
        <button onClick={closeCameraModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Chat;
