import { io } from "socket.io-client";
import { BASE_API_V1_ENDPOINT } from "./constants/sessions";
import { getUserToken } from ".";
const API = BASE_API_V1_ENDPOINT;
const LOCAL_BASE = API.replace(`/api`, "");

// Create the socket instance
export const socket = io(LOCAL_BASE, {
  autoConnect: false, // we’ll manually connect after setting auth
  reconnection: true,
  reconnectionAttempts: 10,     // how many times to retry
  reconnectionDelay: 2000,      // time between attempts
  reconnectionDelayMax: 10000,  // max delay between attempts
  auth: {
    token: getUserToken(),
  },
});
// Connect with latest token (in case user logs in again)
export const connectSocket = () => {
  socket.auth = { token: getUserToken() }; // Refresh token
  socket.connect();
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// Listen for connection events
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.warn("❌ Socket disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Connection Error:", err.message);
});
