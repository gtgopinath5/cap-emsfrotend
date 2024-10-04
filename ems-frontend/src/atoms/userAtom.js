import { atom } from "recoil";

// Helper function to safely parse JSON
const safeJsonParse = (item) => {
  if (!item) {
    return null; // Return null if item is falsy
  }

  // Check if the item is likely a JWT
  if (item.startsWith('eyJ')) {
    console.warn("The stored item appears to be a JWT and not a valid JSON object.");
    return null; // Return null if it's a JWT
  }

  try {
    const parsed = JSON.parse(item);
    return parsed; // Return parsed object if successful
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error.message);
    return null; // Return null if parsing fails
  }
};

const userAtom = atom({
  key: 'userAtom',
  default: safeJsonParse(localStorage.getItem('user-details')),
});

export default userAtom;
