import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [avatarError, setAvatarError] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // Check if avatar is selected
    if (!file) {
      setAvatarError(true);
      return;
    }

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", res.user);

      if (file) {
        // Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
        console.log("Storage reference:", storageRef);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("Download URL:", downloadURL);

            try {
              // Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });

              // Create user on Firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              // Create empty user chats on Firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});

              navigate("/");
            } catch (err) {
              console.log("Error updating profile:", err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } else {
        // If no image selected, proceed without uploading the avatar
        await updateProfile(res.user, {
          displayName,
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
        });

        await setDoc(doc(db, "userChats", res.user.uid), {});

        navigate("/");
      }
    } catch (err) {
      console.log("Error creating user:", err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatApp</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Display name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <div className="fileInputContainer">
            <label>
              <span className="title">Add an Avatar :</span>
              <input
                required
                type="file"
                id="file"
                accept="image/*"
              />
            </label>
          </div>
          
          <button disabled={loading}>Sign up</button>
          {err && <span style={{ color: "red" }}>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;