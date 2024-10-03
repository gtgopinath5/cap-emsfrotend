import { atom } from "recoil";

// Fix the localStorage parsing to handle null or invalid data properly
const userAtom = atom({
  key: 'userAtom',
  default: JSON.parse(localStorage.getItem('user-details')) || null,  // If no user, default to null
});

export default userAtom;
