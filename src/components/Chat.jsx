import React, { useState, useContext, useRef, useEffect } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from "../context/ChatContext";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showDarkModeText, setShowDarkModeText] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const darkModeHandler = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img
            src="https://res.cloudinary.com/dijk3xi4c/image/upload/v1676465117/cam_f1a3q2.png"
            alt="Camera"
          />
          <img
            src="https://res.cloudinary.com/dijk3xi4c/image/upload/v1676465117/add_oarqxw.png"
            alt="Add"
          />
          <Navbar>
            <NavDropdown title={<img src='https://res.cloudinary.com/dijk3xi4c/image/upload/v1676465117/more_jpxt6w.png' 
                                alt='More'/>}
                                onClick={() => {
                                  setDropdownOpen(!dropdownOpen);
                                  setShowDarkModeText(true);
                                }}
                                ref={dropdownRef}
                                onToggle={() => setShowDarkModeText(false)}>
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item>Another Action</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Navbar>
        </div>
      </div>
      <Messages darkModeEnabled={darkModeEnabled} />
      <Input darkModeEnabled={darkModeEnabled} />
    </div>
  );
};

export default Chat;
