const API_URL = "https://backenderp-production-6374.up.railway.app"; // your backend port

// Example API call to test backend connection
export async function getMessage() {
  const response = await fetch(`${API_URL}/api`);
  const text = await response.text();
  return text;
}
export default API_URL;