import { getAuth } from "firebase/auth";

const auth = getAuth();

export function getProfile() {
  const user = auth.currentUser;
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
  };
}

export function updateEmail(newEmail) {
  const user = auth.currentUser;
  if (!user) return Promise.reject(new Error("No user logged in"));
  return user.updateEmail(newEmail);
}


export function updatePassword(newPassword) {
  const user = auth.currentUser;
  if (!user) return Promise.reject(new Error("No user logged in"));
  return user.updatePassword(newPassword);
}
