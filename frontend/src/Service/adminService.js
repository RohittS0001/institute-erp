import axios from "axios";

// Function to login admin
export const loginAdmin = (email, password) => {
  return axios.post("http://localhost:4000/api/admins/login", { email, password });
};
