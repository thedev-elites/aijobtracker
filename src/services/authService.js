// This is a mock implementation for demonstration
// In a real app, these would make API calls to your backend

const STORAGE_KEY = 'resume_builder_user';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (email, password) => {
  await delay(1000); // Simulate network request
  
  // For demo purposes, accept any email/password combination
  // In a real app, this would validate against a backend
  if (email && password) {
    const userData = { 
      id: 1, 
      name: email.split('@')[0], 
      email 
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  }
  
  throw new Error('Invalid email or password');
};

export const registerUser = async (userData) => {
  await delay(1000); // Simulate network request
  
  // In a real app, this would be an API call to your backend
  const newUser = { id: Date.now(), ...userData };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
};

export const logoutUser = async () => {
  await delay(500); // Simulate network request
  localStorage.removeItem(STORAGE_KEY);
  return true;
};

export const getCurrentUser = async () => {
  const userData = localStorage.getItem(STORAGE_KEY);
  return userData ? JSON.parse(userData) : null;
}; 