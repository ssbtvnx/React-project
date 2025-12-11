import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const userRef = doc(firestore, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setPreview(snap.data().photoURL || null);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    loadProfile();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

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
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = reader.result;

          const userRef = doc(firestore, "users", user.uid);
          await updateDoc(userRef, { photoURL: base64 });

          setPreview(base64);
          alert("Profile picture saved in Firestore!");
        } catch (err) {
          console.error("Failed to save photo:", err);
          alert("Upload failed");
        } finally {
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("File processing error:", err);
      alert("Upload failed");
      setUploading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {preview ? (
        <img src={preview} alt="Profile" className="profile-pic" />
      ) : (
        <p>No profile picture yet</p>
      )}

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />

      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Save Picture"}
      </button>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
