import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Устанавливаем текущий аватар при загрузке компонента
  useEffect(() => {
    if (!user) return;
    setPreview(user.photoURL || null);
  }, [user]);

  if (!user) return <p>Please log in to view your profile.</p>;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("Only images are allowed (.jpg, .png)");
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      // Загружаем в Firebase Storage
      const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
      await uploadBytes(storageRef, file);

      // Получаем URL
      const downloadURL = await getDownloadURL(storageRef);

      // Сохраняем URL в Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { photoURL: downloadURL });

      setPreview(downloadURL);
      alert("Profile picture uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {preview && <img src={preview} alt="Profile" className="profile-pic" />}
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>

      <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload Picture"}
      </button>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
